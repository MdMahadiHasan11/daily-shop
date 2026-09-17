/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const profile = state?.data?.profile || initialData?.profile || {};

  const [gender, setGenderId] = useState<string | number>(
    profile?.gender ?? "NOT_SPECIFIED",
  );
  const [dateOfBirth, setDateOfBirth] = useState(() =>
    profile?.dateOfBirth ? dayjs(profile.dateOfBirth) : null,
  );

  const [addresses, setAddresses] = useState<any[]>(
    (initialData as any)?.addresses || [],
  );

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        fullName: "",
        phoneNumber: "",
        addressLine: "",
        city: "",
        area: "",
        postalCode: "",
        country: "Bangladesh",
        isDefault: false,
      },
    ]);
  };

  const handleAddressChange = (index: number, field: string, value: any) => {
    const updated = [...addresses];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setAddresses(updated);
  };

  const handleRemoveAddress = (index: number) => {
    const target = addresses[index];
    if (target.id) {
      const updated = [...addresses];
      updated[index] = {
        id: target.id,
        isDeleted: true,
      };
      setAddresses(updated);
    } else {
      setAddresses(addresses.filter((_, i) => i !== index));
    }
  };

  const onSubmitAction = (formData: FormData) => {
    const activeAddresses = addresses.filter((addr) => !addr.isDeleted);
    formData.set("addresses", JSON.stringify(activeAddresses));
    return formAction(formData);
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state && state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form
      action={onSubmitAction}
      className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
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
      <input type="hidden" name="addresses" value={JSON.stringify(addresses)} />

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
        <InputFieldError field="body.firstName" state={state} />
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
        <InputFieldError field="body.lastName" state={state} />
      </div>

      {/* Gender */}
      <div className="flex flex-col space-y-1.5">
        <FloatingInput.Select
          name="gender"
          label="Gender"
          required={false}
          placeholder="Select Gender"
          value={gender}
          onChange={(val) => setGenderId(val ?? "NOT_SPECIFIED")}
          options={[
            { label: "Not Specified", value: "NOT_SPECIFIED" },
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
          ]}
        />
        <InputFieldError field="body.gender" state={state} />
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
        <InputFieldError field="body.dateOfBirth" state={state} />
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
        <InputFieldError field="body.bio" state={state} />
      </div>

      <hr className="my-4" />

      {/* Addresses Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-gray-800">
            Manage Addresses
          </h3>
          <button
            type="button"
            onClick={handleAddAddress}
            className="px-3 py-1 bg-gray-100 text-xs rounded hover:bg-gray-200 font-medium cursor-pointer"
          >
            + Add Address
          </button>
        </div>

        {addresses.map((addr, index) => {
          if (addr.isDeleted) return null;

          return (
            <div
              key={addr.id || `new-${index}`}
              className="p-4 border rounded-md space-y-3 bg-gray-50 relative"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-600">
                  Address #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAddress(index)}
                  className="text-red-500 text-xs font-semibold hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Full Name */}
                <div className="flex flex-col space-y-1">
                  <FloatingInput
                    id={`fullName-${index}`}
                    type="text"
                    label="Full Name"
                    placeholder="Enter full name"
                    value={addr.fullName ?? ""}
                    onChange={(e) =>
                      handleAddressChange(index, "fullName", e.target.value)
                    }
                  />
                  <InputFieldError
                    field={`body.addresses.${index}.fullName`}
                    state={state}
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col space-y-1">
                  <FloatingInput
                    id={`phoneNumber-${index}`}
                    type="text"
                    label="Phone Number"
                    placeholder="Enter phone number"
                    value={addr.phoneNumber ?? ""}
                    onChange={(e) =>
                      handleAddressChange(index, "phoneNumber", e.target.value)
                    }
                  />
                  <InputFieldError
                    field={`body.addresses.${index}.phoneNumber`}
                    state={state}
                  />
                </div>

                {/* Address Line */}
                <div className="md:col-span-2 flex flex-col space-y-1">
                  <FloatingInput
                    id={`addressLine-${index}`}
                    type="text"
                    label="Address Line"
                    placeholder="Enter street address"
                    value={addr.addressLine ?? ""}
                    onChange={(e) =>
                      handleAddressChange(index, "addressLine", e.target.value)
                    }
                  />
                  <InputFieldError
                    field={`body.addresses.${index}.addressLine`}
                    state={state}
                  />
                </div>

                {/* City */}
                <div className="flex flex-col space-y-1">
                  <FloatingInput
                    id={`city-${index}`}
                    type="text"
                    label="City"
                    placeholder="Enter city"
                    value={addr.city ?? ""}
                    onChange={(e) =>
                      handleAddressChange(index, "city", e.target.value)
                    }
                  />
                  <InputFieldError
                    field={`body.addresses.${index}.city`}
                    state={state}
                  />
                </div>

                {/* Area */}
                <div className="flex flex-col space-y-1">
                  <FloatingInput
                    id={`area-${index}`}
                    type="text"
                    label="Area"
                    placeholder="Enter area"
                    value={addr.area ?? ""}
                    onChange={(e) =>
                      handleAddressChange(index, "area", e.target.value)
                    }
                  />
                  <InputFieldError
                    field={`body.addresses.${index}.area`}
                    state={state}
                  />
                </div>

                {/* Postal Code */}
                <div className="flex flex-col space-y-1">
                  <FloatingInput
                    id={`postalCode-${index}`}
                    type="text"
                    label="Postal Code"
                    placeholder="Enter postal code"
                    value={addr.postalCode ?? ""}
                    onChange={(e) =>
                      handleAddressChange(index, "postalCode", e.target.value)
                    }
                  />
                  <InputFieldError
                    field={`body.addresses.${index}.postalCode`}
                    state={state}
                  />
                </div>

                {/* Country */}
                <div className="flex flex-col space-y-1">
                  <FloatingInput
                    id={`country-${index}`}
                    type="text"
                    label="Country"
                    placeholder="Enter country"
                    value={addr.country ?? ""}
                    onChange={(e) =>
                      handleAddressChange(index, "country", e.target.value)
                    }
                  />
                  <InputFieldError
                    field={`body.addresses.${index}.country`}
                    state={state}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
