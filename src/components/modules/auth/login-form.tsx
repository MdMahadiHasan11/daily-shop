"use client";

import FloatingInput from "@/components/shared/floating-input";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { handleAuthStep } from "@/services/auth/login-user"; // আপনার ফাইলের পাথ অনুযায়ী দিন
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(handleAuthStep, null);

  const currentStep = state?.step || "INITIATE";

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state && state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  console.log(state, "ssssssssssssssssssss");

  const handleGoogleLogin = () => {
    const backendURL = process.env.NEXT_PUBLIC_BASE_API_URL || "";
    const redirectTo = redirect || "dashboard";
    const targetUrl = backendURL.startsWith("http")
      ? `${backendURL}/auth/google?redirect=${redirectTo}`
      : `${window.location.origin}${backendURL}/auth/google?redirect=${redirectTo}`;
    window.location.href = targetUrl;
  };

  return (
    <div className="space-y-4">
      <form action={formAction} autoComplete="off">
        {redirect && <input type="hidden" name="redirect" value={redirect} />}
        <input type="hidden" name="step" value={currentStep} />

        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* STEP 1: Phone or Email Input */}
            {currentStep === "INITIATE" && (
              <Field>
                <FloatingInput
                  key={`identifier-${state?.data?.identifier ?? "default"}`}
                  id="identifier"
                  name="identifier"
                  type="text"
                  label="Phone Number or Email"
                  defaultValue={state?.data?.identifier ?? ""}
                  required
                  placeholder="Enter phone or email"
                  autoComplete="off"
                />
                <InputFieldError field="identifier" state={state} />
              </Field>
            )}

            {/* STEP 2: OTP Input */}
            {currentStep === "VERIFY" && (
              <>
                <input
                  type="hidden"
                  name="identifier"
                  value={state?.data?.identifier || ""}
                />
                <div className="text-sm text-gray-500 mb-2">
                  OTP sent to:{" "}
                  <span className="font-semibold">
                    {state?.data?.identifier}
                  </span>
                </div>
                <Field>
                  <FloatingInput
                    id="otp"
                    name="otp"
                    type="text"
                    label="Enter 6-digit OTP"
                    defaultValue={state?.data?.otp ?? ""}
                    required
                    maxLength={6}
                    placeholder="Enter OTP"
                  />
                  <InputFieldError field="otp" state={state} />
                </Field>
              </>
            )}
          </div>

          <FieldGroup className="mt-4">
            <Field>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-sm py-5"
              >
                {isPending
                  ? "Processing..."
                  : currentStep === "INITIATE"
                    ? "Get OTP"
                    : "Verify & Login"}
              </Button>

              {currentStep === "VERIFY" && (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="w-full text-center text-sm text-blue-600 hover:underline mt-2"
                >
                  Change Phone/Email
                </button>
              )}

              <FieldDescription className="mt-3 px-6 text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <span className="text-sm text-gray-400">OR</span>
        <hr className="flex-1" />
      </div>

      {/* Google Login Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-2"
      >
        <Image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          width={24}
          height={24}
          alt="Google"
          className="h-5 w-5"
        />
        Continue with Google
      </Button>
    </div>
  );
};

export default LoginForm;
