import { auth } from "@/auth";
import { ProfileUserInfo, Title } from "@/components";
import type { ProfileUserFields } from "@/interfaces";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = session.user as ProfileUserFields;

  return (
    <div>
      <Title title="Perfil" />
      <ProfileUserInfo user={user} />
    </div>
  );
}
