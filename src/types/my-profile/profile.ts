export interface IUserInfo {
  id: string;
  role?: string;
  phoneNumber: string;
  phoneNumberVerified?: boolean;
  email: string | null;
  emailVerified?: boolean;
  emailVerifiedAt?: string | null;
  image: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
  location?: Location | null; // Added Location type here
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  gender?: string; // e.g., "NOT_SPECIFIED"
  genderId?: number;
  hasReturnRequests: boolean;
  reloadLocation?: boolean;
  loyaltyVerified: boolean;
  dateOfBirth: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  userId: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}
