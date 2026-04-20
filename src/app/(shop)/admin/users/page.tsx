export const revalidate = 0;
import { getPaginatedUsers } from "@/actions";
import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;

  const { ok, users = [], totalPages } = await getPaginatedUsers({ page: pageNumber });

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />
      <div className="mb-10">
        <UsersTable users={users} />
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}
