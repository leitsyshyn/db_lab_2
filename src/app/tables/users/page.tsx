"use client";
import { UserSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";
import { fetchUsers } from "@/lib/api/tables";
import { createUser, updateUser, deleteUser } from "@/app/tables/users/actions";

export default function Page() {
  return (
    <TablePage
      title="User"
      schema={UserSchema}
      queryKey={["users"]}
      fetchFn={fetchUsers}
      createFn={createUser}
      updateFn={updateUser}
      deleteFn={deleteUser}
    />
  );
}
