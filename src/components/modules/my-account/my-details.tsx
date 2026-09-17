import { getUserInfo } from "@/services/auth/get-user-info";
import ProfileUpdateForm from "./ProfileUpdateForm";

export default async function MyDetails() {
  const userDetailsResponse = await getUserInfo({
    include: "location",
  });

  return (
    <div>
      <ProfileUpdateForm initialData={userDetailsResponse.data} />
    </div>
  );
}
