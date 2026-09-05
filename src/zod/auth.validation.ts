/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerPatientValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, {
        error: "Password is required and must be at least 6 characters long",
      })
      .max(100, {
        error: "Password must be at most 100 characters long",
      }),
    confirmPassword: z.string().min(6, {
      error:
        "Confirm Password is required and must be at least 6 characters long",
    }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
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
  email: z.email("Please enter a valid email address"),
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
export const updateProfileZodSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, "First name must be at least 3 characters")
      .optional()
      .or(z.literal("")),
    lastName: z
      .string()
      .trim()
      .min(3, "Last name must be at least 3 characters")
      .optional()
      .or(z.literal("")),
    genderId: z.coerce.number().default(0).optional(),
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
      .or(z.literal("")),
    image: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      const hasFirstName = Boolean(
        data.firstName && data.firstName.trim().length >= 3,
      );
      const hasLastName = Boolean(
        data.lastName && data.lastName.trim().length >= 3,
      );
      const hasDob = Boolean(
        data.dateOfBirth && data.dateOfBirth.trim().length > 0,
      );
      const hasBio = Boolean(data.bio && data.bio.trim().length > 0);
      const hasImage = Boolean(data.image && data.image.trim().length > 0);
      const hasValidGender = data.genderId === 1 || data.genderId === 2;
      return (
        hasFirstName ||
        hasLastName ||
        hasDob ||
        hasBio ||
        hasImage ||
        hasValidGender
      );
    },
    {
      message: "At least one valid profile detail must be provided .",
      path: ["firstName"],
    },
  );
