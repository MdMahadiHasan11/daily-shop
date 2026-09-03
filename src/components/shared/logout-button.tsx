import { logoutAction } from "@/services/auth/logout-user";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </form>
  );
}
