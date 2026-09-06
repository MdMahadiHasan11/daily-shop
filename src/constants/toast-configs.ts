export interface ToastConfig {
  paramKey: string;
  expectedValue?: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

export const authToastConfigs: ToastConfig[] = [
  {
    paramKey: "loggedIn",
    message: "You have been logged in successfully.",
    type: "success",
  },
  {
    paramKey: "loggedOut",
    message: "You have been logged out successfully.",
    type: "success",
  },
  {
    paramKey: "updated",
    message: "Profile updated successfully.",
    type: "success",
  },
];
