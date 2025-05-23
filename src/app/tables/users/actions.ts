"use server";

import prisma from "@/lib/prisma";
import { UserCreateSchema, UserUpdateSchema } from "@/lib/schemas";
import { UserCreate, UserUpdate } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createUser(data: UserCreate) {
  const userData = UserCreateSchema.parse(data);

  await prisma.user.create({ data: userData });

  revalidatePath("/users");
}

export async function updateUser(id: string, data: UserUpdate) {
  const userData = UserUpdateSchema.parse(data);

  await prisma.user.update({
    where: { id },
    data: userData,
  });

  revalidatePath("/users");
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });

  revalidatePath("/users");
}
