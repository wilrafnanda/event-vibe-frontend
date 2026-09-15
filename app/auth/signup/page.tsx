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
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  agreeTerms?: string;
}

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
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

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

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

    if (!formData.agreeTerms) {
      errors.agreeTerms = "You must accept the Terms and Privacy Policy to continue";
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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
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
          "Registration failed. Please check your details and try again.";

        setServerError(errorMessage);
        return;
      }

      const successMsg = data?.message || "Account created successfully! Redirecting...";
      setSuccessMessage(successMsg);

      setFormData({
        name: "",
        email: "",
        password: "",
        agreeTerms: false,
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);
      setServerError(
        "Unable to connect to the server. Please check your connection or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md my-auto py-2 sm:py-4">
      <AuthHeader
        title="Create account"
        subtitle="Join the vibe. It only takes a minute."
      />

      <Alert type="error" message={serverError} onClose={() => setServerError(null)} />
      <Alert type="success" message={successMessage} />

      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        <InputField
          label="Full Name"
          name="name"
          type="text"
          placeholder="raphael william"
          icon="fa-solid fa-user"
          value={formData.name}
          onChange={handleChange}
          error={fieldErrors.name}
          disabled={isLoading}
        />

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

        <div className="py-1">
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-0.5 accent-primary cursor-pointer disabled:cursor-not-allowed"
            />
            <label
              htmlFor="agreeTerms"
              className="text-[11px] sm:text-xs text-muted leading-relaxed cursor-pointer select-none"
            >
              I agree to the{" "}
              <Link
                href="#"
                className="text-ink font-semibold hover:text-primary transition-colors underline underline-offset-2"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-ink font-semibold hover:text-primary transition-colors underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {fieldErrors.agreeTerms && (
            <p className="text-[11px] text-red-500 mt-1 pl-1 font-medium">
              {fieldErrors.agreeTerms}
            </p>
          )}
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Creating Account..."
          className="mt-1"
        >
          Create Account
        </Button>
      </form>

      <AuthFooter
        promptText="Already have an account?"
        linkText="Login"
        linkHref="/auth/login"
      />
    </div>
  );
}
