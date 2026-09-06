"use client";

import FloatingInput from "@/components/shared/floating-input";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { handleAuthStep } from "@/services/auth/login-user";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

export const LoginForm = ({ redirect }: { redirect?: string }) => {
  const t = useTranslations("Auth");

  const [state, formAction, isPending] = useActionState(handleAuthStep, null);
  const currentStep = state?.step || "INITIATE";

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isResending, startResendTransition] = useTransition();

  const prevStepRef = useRef(currentStep);

  useEffect(() => {
    if (currentStep === "VERIFY" && prevStepRef.current !== "VERIFY") {
      setTimeLeft(30);
      setCanResend(false);
    }
    prevStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep === "VERIFY" && !canResend) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep, canResend]);

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^\d+$/.test(pasteData)) {
      const digits = pasteData.slice(0, 6).split("");
      const newValues = ["", "", "", "", "", ""];

      digits.forEach((digit, idx) => {
        if (idx < 6) newValues[idx] = digit;
      });

      setOtpValues(newValues);
      const nextFocusIdx = Math.min(digits.length, 5);
      inputRefs.current[nextFocusIdx]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // i make
    if (!canResend) return;

    const identifier = state?.data?.identifier;
    if (!identifier) return;

    const formData = new FormData();
    formData.append("identifier", identifier);
    formData.append("step", "RESEND");
    if (redirect) formData.append("redirect", redirect);

    startResendTransition(async () => {
      await formAction(formData);
      setTimeLeft(30);
      setCanResend(false);
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    });
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state && state.success && state.message) {
      toast.success(state.message);
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
  console.log(state);
  return (
    <div className="space-y-4">
      <form action={formAction} autoComplete="off">
        {redirect && <input type="hidden" name="redirect" value={redirect} />}
        <input type="hidden" name="step" value={currentStep} />

        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {currentStep === "INITIATE" && (
              <Field>
                <FloatingInput
                  key={`identifier-${state?.data?.identifier ?? "default"}`}
                  id="identifier"
                  name="identifier"
                  type="text"
                  label={t("phoneOrEmail")}
                  defaultValue={state?.data?.identifier ?? ""}
                  required
                  placeholder={t("placeholderIdentifier")}
                  autoComplete="off"
                />
                <InputFieldError field="identifier" state={state} />
              </Field>
            )}

            {currentStep === "VERIFY" && (
              <>
                <input
                  type="hidden"
                  name="identifier"
                  value={state?.data?.identifier || ""}
                />
                <div className="text-sm text-gray-500 mb-1 text-center">
                  {t("otpSentTo")}{" "}
                  <span className="font-semibold text-gray-800">
                    {state?.data?.identifier}
                  </span>
                </div>

                <Field>
                  <div className="flex justify-center gap-2 sm:gap-3 my-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otpValues[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-11 h-12 sm:w-12 sm:h-13 text-center text-xl font-bold rounded-[3px] border border-gray-300 bg-white text-gray-900 focus:border-blue-500 outline-none transition-all shadow-sm"
                      />
                    ))}
                  </div>

                  <input type="hidden" name="otp" value={otpValues.join("")} />

                  <div className="flex items-center justify-between text-sm mt-2 px-1">
                    <span className="text-gray-500">
                      {canResend ? (
                        t("didNotReceiveCode")
                      ) : (
                        <>
                          {t("resendCodeIn")}{" "}
                          <span className="font-semibold text-blue-600">
                            {timeLeft}s
                          </span>
                        </>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={!canResend || isResending}
                      className={`font-semibold transition-colors ${
                        canResend && !isResending
                          ? "text-blue-600 hover:underline cursor-pointer"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {isResending ? t("sending") : t("resendOtp")}
                    </button>
                  </div>

                  <InputFieldError field="otp" state={state} />
                </Field>
              </>
            )}

            {currentStep === "COMPLETE_PROFILE" && (
              <div className="space-y-4">
                <input
                  type="hidden"
                  name="identifier"
                  value={state?.data?.identifier || ""}
                />

                <Field>
                  <FloatingInput
                    key={`firstName-${state?.data?.firstName ?? "default"}`}
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="First Name"
                    placeholder="Enter your first name"
                    defaultValue={state?.data?.firstName ?? ""}
                  />
                  <InputFieldError field="firstName" state={state} />
                </Field>

                <Field>
                  <FloatingInput
                    key={`lastName-${state?.data?.lastName ?? "default"}`}
                    id="lastName"
                    name="lastName"
                    type="text"
                    label="Last Name"
                    placeholder="Enter your last name"
                    defaultValue={state?.data?.lastName ?? ""}
                  />
                  <InputFieldError field="lastName" state={state} />
                </Field>

                <Field>
                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="genderId"
                      className="text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <select
                      key={`gender-${state?.data?.genderId ?? "0"}`}
                      defaultValue={state?.data?.genderId ?? undefined}
                      id="genderId"
                      name="genderId"
                      className="border border-gray-300 rounded-[3px] p-2.5 text-sm bg-white outline-none focus:border-blue-500"
                    >
                      <option value="0">Not Specified</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                  <InputFieldError field="genderId" state={state} />
                </Field>

                <Field>
                  <FloatingInput
                    key={`dob-${state?.data?.dateOfBirth ?? "default"}`}
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    label="Date of Birth"
                    defaultValue={
                      state?.data?.dateOfBirth
                        ? state.data.dateOfBirth.split("T")[0]
                        : ""
                    }
                  />
                  <InputFieldError field="dateOfBirth" state={state} />
                </Field>

                <Field>
                  <FloatingInput
                    key={`bio-${state?.data?.bio ?? "default"}`}
                    id="bio"
                    name="bio"
                    type="text"
                    label="Bio"
                    placeholder="Tell us about yourself"
                    defaultValue={state?.data?.bio ?? ""}
                  />
                  <InputFieldError field="bio" state={state} />
                </Field>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    name="skip"
                    value="true"
                    variant="outline"
                    className="w-1/2 rounded-sm py-5 cursor-pointer"
                  >
                    Skip
                  </Button>
                  <Button
                    type="submit"
                    name="skip"
                    value="false"
                    disabled={isPending}
                    className="w-1/2 rounded-sm py-5 cursor-pointer"
                  >
                    Save & Continue
                  </Button>
                </div>
              </div>
            )}
          </div>

          {currentStep !== "COMPLETE_PROFILE" && (
            <FieldGroup className="mt-4">
              <Field>
                <Button
                  type="submit"
                  disabled={isPending || isResending}
                  className="w-full rounded-sm py-5 cursor-pointer"
                >
                  {isPending
                    ? t("processing")
                    : currentStep === "INITIATE"
                      ? t("getOtp")
                      : t("verifyAndLogin")}
                </Button>

                {currentStep === "VERIFY" && (
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="w-full text-center text-sm text-blue-600 hover:underline mt-2 cursor-pointer"
                  >
                    {t("changePhoneOrEmail")}
                  </button>
                )}

                <FieldDescription className="mt-3 px-6 text-center">
                  {t("dontHaveAccount")}{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:underline"
                  >
                    {t("signUp")}
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          )}
        </FieldGroup>
      </form>

      {currentStep !== "COMPLETE_PROFILE" && (
        <>
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-200" />
            <span className="text-sm text-gray-400">{t("or")}</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-2 cursor-pointer"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              width={24}
              height={24}
              alt="Google"
              className="h-5 w-5"
            />
            {t("continueWithGoogle")}
          </Button>
        </>
      )}
    </div>
  );
};

export default LoginForm;
