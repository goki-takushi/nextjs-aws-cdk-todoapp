"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

async function ensureUser(userId: string) {
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: `${userId}@example.com`,
      password: "demo-password",
    },
  });
}

export async function getTasks() {
  const tasks = await prisma.task.findMany({
    orderBy: { created_at: "asc" },
  });

  return tasks;
}

export async function addTask(userId: string, text: string) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return;
  }

  await ensureUser(userId);

  await prisma.task.create({
    data: {
      user_id: userId,
      text: trimmedText,
    },
  });

  revalidatePath("/");
}

export async function toggleTask(id: number) {
  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    return;
  }

  await prisma.task.update({
    where: { id },
    data: { completed: !task.completed },
  });

  revalidatePath("/");
}

export async function deleteTask(id: number) {
  await prisma.task.delete({ where: { id } });
  revalidatePath("/");
}

export async function clearCompleted() {
  await prisma.task.deleteMany({
    where: { completed: true },
  });
  revalidatePath("/");
}

export async function getActiveTaskCount(): Promise<number> {
  return prisma.task.count({
    where: { completed: false },
  });
}
