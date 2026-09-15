'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Clear previous errors when user modifies input
    if (serverError) setServerError(null);
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateClientSide = (): boolean => {
    const errors: FieldErrors = {};

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setServerError(null);
    setFieldErrors({});
    setSuccessMessage(null);

    if (!validateClientSide()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data?.errors) {
          if (Array.isArray(data.errors)) {
            const mappedErrors: FieldErrors = {};
            data.errors.forEach((err: { path?: string; param?: string; msg?: string; message?: string }) => {
              const fieldName = (err.path || err.param) as keyof FieldErrors;
              if (fieldName) {
                mappedErrors[fieldName] = err.msg || err.message || "Invalid value";
              }
            });
            setFieldErrors(mappedErrors);
          } else if (typeof data.errors === "object") {
            setFieldErrors(data.errors);
          }
        }

        const errorMessage =
          data?.message ||
          data?.error ||
          "Invalid email or password. Please try again.";

        setServerError(errorMessage);
        return;
      }

      if (data?.token) localStorage.setItem("authToken", data.token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

      const successMsg = data?.message || "Login successful! Welcome back.";
      setSuccessMessage(successMsg);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setServerError(
        "Unable to connect to the server. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md my-auto py-2 sm:py-4">
      <AuthHeader
        title="Login to Your Account"
        subtitle="Welcome back! Please enter your details."
      />

      <Alert type="error" message={serverError} onClose={() => setServerError(null)} />
      <Alert type="success" message={successMessage} />

      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@example.com"
          icon="fa-solid fa-envelope"
          value={formData.email}
          onChange={handleChange}
          error={fieldErrors.email}
          disabled={isLoading}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          icon="fa-solid fa-lock"
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
          disabled={isLoading}
          rightAction={
            <Link
              href="#"
              className="text-[11px] text-muted hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          }
        />

        <div className="flex items-center gap-2.5 py-1">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            disabled={isLoading}
            className="accent-primary cursor-pointer disabled:cursor-not-allowed"
          />
          <label
            htmlFor="rememberMe"
            className="text-[11px] sm:text-xs text-muted cursor-pointer select-none"
          >
            Remember me on this device
          </label>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Signing In..."
          className="mt-1"
        >
          Sign In
        </Button>
      </form>

      <AuthFooter
        promptText="Don't have an account?"
        linkText="Sign up"
        linkHref="/auth/signup"
      />
    </div>
  );
}
