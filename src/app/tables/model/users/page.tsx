"use client";
import { UserSchema } from "@/lib/schemas";
import SchemaTable from "@/components/SchemaTable";
import { fetchUsers } from "@/lib/api/tables";
import {
  createUser,
  updateUser,
  deleteUser,
} from "@/app/tables/model/users/actions";

export default function Page() {
  return (
    <SchemaTable
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
