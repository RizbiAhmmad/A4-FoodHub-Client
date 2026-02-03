import { getAllUsersAction } from "@/actions/userauth.action";
import UsersTable from "@/components/modules/admin/users/UsersTable";

export default async function UsersPage() {
  const { data: users } = await getAllUsersAction();

  return (
    <div className="p-6">
      <UsersTable users={users || []} />
    </div>
  );
}
