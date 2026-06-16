"use server"; // ← この宣言ですべての関数がServer Actionになる

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

// タスク一覧取得
export async function getTasks() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "asc" }, // 作成日時の昇順
  });
  return tasks;
}

// タスク追加
export async function addTask(text: string) {
  await prisma.task.create({
    data: { text },
  });
  revalidatePath("/"); // ホームページのキャッシュを再検証
}

// タスクの完了/未完了を切り替え
export async function toggleTask(id: number) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (task) {
    await prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });
    revalidatePath("/");
  }
}

// タスク削除
export async function deleteTask(id: number) {
  await prisma.task.delete({ where: { id } });
  revalidatePath("/");
}

// 完了済みタスクを一括削除
export async function clearCompleted() {
  await prisma.task.deleteMany({
    where: { completed: true },
  });
  revalidatePath("/");
}

// 未完了タスク数を取得
export async function getActiveTaskCount(): Promise<number> {
  const count = await prisma.task.count({
    where: { completed: false },
  });
  return count;
}
