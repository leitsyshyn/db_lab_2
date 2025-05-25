"use client";
import { UserSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";
import { fetchUsers } from "@/lib/api/tables";
import {
  createUser,
  updateUser,
  deleteUser,
} from "@/app/tables/model/users/actions";

export default function Page() {
  return (
    <TablePage
      title="Users Table"
      item="User"
      schema={UserSchema}
      queryKey={["users"]}
      fetchFn={fetchUsers}
      createFn={createUser}
      updateFn={updateUser}
      deleteFn={deleteUser}
    />
  );
}
