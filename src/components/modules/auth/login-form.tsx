"use client";

import FloatingInput from "@/components/shared/floating-input";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { loginUser } from "@/services/auth/login-user";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleGoogleLogin = () => {
    const backendURL = process.env.NEXT_PUBLIC_BASE_API_URL || "";
    const redirectTo = redirect || "dashboard";

    const targetUrl = backendURL.startsWith("http")
      ? `${backendURL}/auth/google?redirect=${redirectTo}`
      : `${window.location.origin}${backendURL}/auth/google?redirect=${redirectTo}`;

    window.location.href = targetUrl;
  };
  console.log({ state });
  return (
    <div className="space-y-4">
      {/* Set autoComplete="off" on the form */}
      <form action={formAction} autoComplete="off">
        {redirect && <input type="hidden" name="redirect" value={redirect} />}

        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Email Field */}
            <Field>
              <FloatingInput
                key={`email-${state?.data?.email ?? "default"}`}
                id="email"
                name="email"
                type="email"
                label="Email"
                defaultValue={state?.data?.email ?? ""}
                required
                placeholder="Enter your email"
                autoComplete="off"
              />
              <InputFieldError field="email" state={state} />
            </Field>

            {/* Password Field */}
            <Field>
              <FloatingInput
                key={`password-${state?.data?.password ?? "default"}`}
                id="password"
                name="password"
                label="Password"
                defaultValue={state?.data?.password ?? ""}
                isPassword
                required
                placeholder="Enter password"
                autoComplete="new-password"
              />
              <InputFieldError field="password" state={state} />
            </Field>
          </div>

          <FieldGroup className="">
            <Field>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-sm py-5"
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>

              <FieldDescription className="mt-3 px-6 text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>

              <FieldDescription className="px-6 text-center">
                <Link
                  href="/forget-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot password?
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
