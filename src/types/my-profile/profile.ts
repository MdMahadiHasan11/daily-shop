/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserInfo {
  id: string;
  role: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  email: any;
  emailVerified: boolean;
  emailVerifiedAt: any;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  genderId: number;
  hasReturnRequests: boolean;
  reloadLocation: boolean;
  loyaltyVerified: boolean;
  dateOfBirth: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}
