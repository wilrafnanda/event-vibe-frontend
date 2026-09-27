'use client';

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
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Clear server and field-specific errors upon user edit
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
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
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
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Backend validation errors array or object
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
          (response.status === 401
            ? "Invalid email or password. Check your credentials or create an account first."
            : "Login failed. Please check your details and try again.");

        setServerError(errorMessage);
        return;
      }

      const token = data?.token || data?.accessToken;
      if (token) {
        localStorage.setItem("authToken", token);
      }

      const successMsg = data?.message || "Login successful. Redirecting...";
      setSuccessMessage(successMsg);

      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        router.push("/search");
      }, 1500);
    } catch (error) {
      console.error("login error:", error);
      setServerError(
        "Unable to connect to the server. Please check your connection or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md my-auto py-2 sm:py-4">
      <AuthHeader title="Welcome back" subtitle="Sign in to find your next vibe." />

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
        />

       <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Signing in..."
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
