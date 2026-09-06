"use client";

import DateSelect from "@/components/shared/date-select";
import FloatingInput from "@/components/shared/floating-input";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { handleUpdateProfile } from "@/services/auth/update-profile";
import dayjs from "dayjs";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface CompleteProfileFormProps {
  redirect?: string;
}

export const CompleteProfileForm = ({ redirect }: CompleteProfileFormProps) => {
  const [state, formAction, isPending] = useActionState(
    handleUpdateProfile,
    null,
  );

  // Controlled states for components that need active interaction
  const [genderId, setGenderId] = useState<string | number>(
    state?.genderId ?? 0,
  );
  const [dateOfBirth, setDateOfBirth] = useState(() =>
    state?.dateOfBirth ? dayjs(state.dateOfBirth) : null,
  );

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state && state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  const profile = state?.data;

  return (
    <form action={formAction} autoComplete="off" className="space-y-4">
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      {/* First Name */}
      <div className="flex flex-col space-y-1">
        <FloatingInput
          key={`firstName-${profile?.firstName ?? "default"}`}
          id="firstName"
          name="firstName"
          type="text"
          label="First Name"
          placeholder="Enter your first name"
          defaultValue={profile?.firstName ?? ""}
        />
        <InputFieldError field="firstName" state={state} />
      </div>

      {/* Last Name */}
      <div className="flex flex-col space-y-1">
        <FloatingInput
          key={`lastName-${profile?.lastName ?? "default"}`}
          id="lastName"
          name="lastName"
          type="text"
          label="Last Name"
          placeholder="Enter your last name"
          defaultValue={profile?.lastName ?? ""}
        />
        <InputFieldError field="lastName" state={state} />
      </div>

      {/* Gender */}
      <div className="flex flex-col space-y-1.5">
        <FloatingInput.Select
          name="genderId"
          label="Gender"
          required={false}
          placeholder="Select Gender"
          value={genderId}
          onChange={(val) => setGenderId(val ?? 0)}
          options={[
            { label: "Not Specified", value: 0 },
            { label: "Male", value: 1 },
            { label: "Female", value: 2 },
          ]}
        />
        <InputFieldError field="genderId" state={state} />
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col space-y-1">
        <DateSelect
          key={`dob-${profile?.dateOfBirth ?? "default"}`}
          label="Date of Birth"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
          maxDate={dayjs()}
          allowClear={true}
        />
        <InputFieldError field="dateOfBirth" state={state} />
      </div>

      {/* Bio */}
      <div className="flex flex-col space-y-1">
        <FloatingInput
          key={`bio-${profile?.bio ?? "default"}`}
          id="bio"
          name="bio"
          type="text"
          label="Bio"
          placeholder="Tell us about yourself"
          defaultValue={profile?.bio ?? ""}
        />
        <InputFieldError field="bio" state={state} />
      </div>

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
