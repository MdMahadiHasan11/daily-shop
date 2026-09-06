"use client";

import DateSelect from "@/components/shared/date-select";
import FloatingInput from "@/components/shared/floating-input";
import InputFieldError from "@/components/shared/InputFieldError";
import { handleUpdateProfile } from "@/services/auth/update-profile";
import { IUserInfo } from "@/types";
import dayjs from "dayjs";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfileUpdateForm({
  initialData,
}: {
  initialData: IUserInfo | undefined;
}) {
  const [state, formAction, isPending] = useActionState(
    handleUpdateProfile,
    null,
  );

  const profile = state?.data || initialData?.profile || {};

  // Controlled states for components that need active interaction
  const [genderId, setGenderId] = useState<string | number>(
    profile?.genderId ?? 0,
  );
  const [dateOfBirth, setDateOfBirth] = useState(() =>
    profile?.dateOfBirth ? dayjs(profile.dateOfBirth) : null,
  );

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state && state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="space-y-4 max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>

      {state?.message && (
        <p
          className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
      <input type="hidden" name="profile" value={"profile"} />

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

      {/* Action Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white rounded py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
