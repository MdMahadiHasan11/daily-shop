/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerPatientValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.string().email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, {
        message: "Password is required and must be at least 6 characters long",
      })
      .max(100, {
        message: "Password must be at most 100 characters long",
      }),
    confirmPassword: z.string().min(6, {
      message:
        "Confirm Password is required and must be at least 6 characters long",
    }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const phoneRegex = /^(?:\+?880|0)?1[3-9]\d{8}$/;

export const loginInitiateZodSchema = z.object({
  identifier: z
    .string({
      message: "Email or phone number is required",
    })
    .refine(
      (val) => {
        const isEmail = z.string().email().safeParse(val).success;
        const isPhone = phoneRegex.test(val);
        return isEmail || isPhone;
      },
      {
        message: "Please enter a valid email address or phone number",
      },
    ),
});

export const verifyOtpZodSchema = z.object({
  otp: z
    .string({
      message: "OTP is required",
    })
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const setPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const GenderEnum = z.enum(["MALE", "FEMALE", "NOT_SPECIFIED"]);

// Address item schema supporting regular fields or id + isDeleted marker
const addressItemSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().optional().or(z.literal("")),
  phoneNumber: z.string().optional().or(z.literal("")),
  addressLine: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  area: z.string().optional().or(z.literal("")),
  postalCode: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  isDefault: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const updateProfileZodSchema = z.object({
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  phoneNumber: z.string().optional().or(z.literal("")),
  profile: z
    .object({
      firstName: z
        .string()
        .trim()
        .min(1, "First name is required")
        .optional()
        .or(z.literal("")),
      lastName: z.string().trim().optional().or(z.literal("")).nullable(),
      gender: GenderEnum.optional(),
      dateOfBirth: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine((val) => !val || !isNaN(Date.parse(val)), {
          message: "Invalid date format for date of birth",
        }),
      bio: z
        .string()
        .max(255, "Bio cannot exceed 255 characters")
        .optional()
        .or(z.literal(""))
        .nullable(),
    })
    .optional(),
  addresses: z.array(addressItemSchema).optional(),
});
