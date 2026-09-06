"use client";

import FloatingInput from "@/components/shared/floating-input";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { handleUpdateProfile } from "@/services/auth/update-profile";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface CompleteProfileFormProps {
  identifier?: string;
  redirect?: string;
}

export const CompleteProfileForm = ({
  identifier,
  redirect,
}: CompleteProfileFormProps) => {
  const [state, formAction, isPending] = useActionState(
    handleUpdateProfile,
    null,
  );

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state && state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  const currentData = state?.data;

  return (
    <form action={formAction} autoComplete="off" className="space-y-4">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <input type="hidden" name="identifier" value={identifier || ""} />

      <Field>
        <FloatingInput
          id="firstName"
          name="firstName"
          type="text"
          label="First Name"
          placeholder="Enter your first name"
          defaultValue={currentData?.firstName ?? ""}
        />
        <InputFieldError field="firstName" state={state} />
      </Field>

      <Field>
        <FloatingInput
          id="lastName"
          name="lastName"
          type="text"
          label="Last Name"
          placeholder="Enter your last name"
          defaultValue={currentData?.lastName ?? ""}
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
            defaultValue={currentData?.genderId ?? "0"}
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
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          label="Date of Birth"
          defaultValue={
            currentData?.dateOfBirth
              ? currentData.dateOfBirth.split("T")[0]
              : ""
          }
        />
        <InputFieldError field="dateOfBirth" state={state} />
      </Field>

      <Field>
        <FloatingInput
          id="bio"
          name="bio"
          type="text"
          label="Bio"
          placeholder="Tell us about yourself"
          defaultValue={currentData?.bio ?? ""}
        />
        <InputFieldError field="bio" state={state} />
      </Field>

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          name="skip"
          value="true"
          variant="outline"
          disabled={isPending}
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
          {isPending ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </form>
  );
};

export default CompleteProfileForm;
