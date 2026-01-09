"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInduction } from "@/context/InductionContext";
import { useFocusManager } from "@/hooks/useFocusManager";
import UniversalFormField from "@/components/common/forms-new/forms/core/UniversalFormField";
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";

// ✅ Login schema defined inline
const LoginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
});

export default function InductionLoginPage()
{
  const router = useRouter();
  const { isAuthenticated, login } = useInduction();

  // ✅ NEW: Show loading state FIRST, then check auth
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    control,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const focus = useFocusManager(control);

  // ✅ Check auth on mount
  useEffect(() =>
  {
    if (isAuthenticated) {
      router.push("/induction/lessons");
    } else {
      // Not authenticated, show login form
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, router]);

  const handleFieldFocus = useCallback(
    (fieldName) =>
    {
      focus.setFocusField(fieldName);
    },
    [focus]
  );

  const handleFieldBlur = useCallback(() =>
  {
    focus.clearFocus();
  }, [focus]);

  const handleValidationError = useCallback(
    (validationErrors) =>
    {
      focus.focusFirstError(validationErrors);
    },
    [focus]
  );

  const onSubmit = async (data) =>
  {
    setIsSubmitting(true);
    setLoginError(null);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const success = login(data.username, data.password);

    if (success) {
      router.push("/induction/lessons");
    } else {
      setLoginError("Invalid credentials. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = rhfHandleSubmit(onSubmit, (validationErrors) =>
  {
    handleValidationError(validationErrors);
  });

  // ✅ Show loading spinner while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-[80vh] bg-[#f2f2f2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ Show login form only if not authenticated
  return (
    <div className="min-h-[80vh] bg-[#f2f2f2] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-2xl">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/images/SecureCash.webp"
            alt="SecureCash Logo"
            width={285}
            height={91}
            sizes="285px"
            className="w-[285px] h-auto "
            style={{ width: "285px", height: "auto" }}
            priority={true}
          />
          <hr
            className="w-[100px] mt-3 mb-6 h-[4px] rounded-[5px] border-0 mx-auto bg-primary"
            aria-hidden="true"
          />
        </div>

        <div className="text-center mb-6">
          <p className="text-[20px] text-gray-600 font-semibold">
            Banking Courier Induction
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative" noValidate>
          {/* Username Field */}
          <div className="relative">
            <UniversalFormField
              name="username"
              control={control}
              type="text"
              theme="light"
              placeholder="Enter username"
              Icon={FaUser}
              label={"Username"}
              currentFocusField={focus.currentFocusField}
              onFieldFocus={handleFieldFocus}
              onFieldBlur={handleFieldBlur}
              autoComplete="username"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <UniversalFormField
              name="password"
              control={control}
              type="password"
              theme="light"
              placeholder="Enter password"
              Icon={FaLock}
              label={"Password"}
              currentFocusField={focus.currentFocusField}
              onFieldFocus={handleFieldFocus}
              onFieldBlur={handleFieldBlur}
              autoComplete="current-password"
            />
          </div>



          <div className=" mx-auto relative">
            {loginError && (
              <div className="absolute bg-red-50 border border-red-200 text-red-600 px-4 py-1 rounded text-sm w-full -top-1.5">
                {loginError}
              </div>
            )}{" "}
            <div className="button-section relative pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#c6a54b] text-white rounded hover:bg-[#b09140] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            This is a secure training portal. Access credentials are provided by
            SecureCash management.
          </p>
        </div>
      </div>
    </div>
  );
}