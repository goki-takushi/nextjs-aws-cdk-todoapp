"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";

// 🛡️ Zodによる不正リクエスト防止バリデーションスキーマ
const addTaskSchema = z.object({
  text: z
    .string()
    .min(1, "タスクを入力してください。")
    .max(100, "タスクは100文字以内で入力してください。"),
});

const taskIdSchema = z.number().int().positive("無効なタスクIDです。");

// 🔒 共通ヘルパー: サーバー側セッションから安全にユーザーIDを取得する
async function getSessionUserIdOrThrow(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("認証セッションが切れています。再ログインしてください。");
  }
  return session.user.id;
}

export async function getTasks() {
  try {
    const userId = await getSessionUserIdOrThrow();

    // 🛡️ Where句に取得したセッションIDを強制バインド（他人のデータは絶対に混ざらない）
    return await prisma.task.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "asc" },
    });
  } catch (error) {
    console.error("getTasks エラー:", error);
    return [];
  }
}

export async function addTask(prevState: any, formData: FormData) {
  try {
    const userId = await getSessionUserIdOrThrow();

    const text = formData.get("taskText") as string;
    if (!text || !text.trim()) {
      return { error: "タスクを入力してください。" };
    }

    // 🛡️ Zodによる入力値・型チェック
    const validatedFields = addTaskSchema.safeParse({ text: text.trim() });
    if (!validatedFields.success) {
      return { error: "不正な入力値です。100文字以内で入力してください。" };
    }

    await prisma.task.create({
      data: {
        user_id: userId,
        text: validatedFields.data.text,
      },
    });

    revalidatePath("/");
    return { error: null };
  } catch (error: any) {
    console.error("addTask 内部エラー:", error);
    return { error: error.message || "タスクの追加に失敗しました。" };
  }
}

export async function toggleTask(id: number) {
  const userId = await getSessionUserIdOrThrow();

  const validatedId = taskIdSchema.safeParse(id);
  if (!validatedId.success) {
    throw new Error("無効なタスクIDです。");
  }

  // 🛡️ 所有権の検証: idだけでなく user_id も必ず条件に含めて検証
  const task = await prisma.task.findFirst({
    where: {
      id: validatedId.data,
      user_id: userId,
    },
  });

  if (!task) {
    throw new Error("タスクが見つからないか、操作権限がありません。");
  }

  await prisma.task.update({
    where: { id: validatedId.data },
    data: { completed: !task.completed },
  });

  revalidatePath("/");
}

export async function deleteTask(id: number) {
  const userId = await getSessionUserIdOrThrow();

  const validatedId = taskIdSchema.safeParse(id);
  if (!validatedId.success) {
    throw new Error("無効なタスクIDです。");
  }

  // 🛡️ deleteManyを使い、対象IDかつ自分の所有データである場合のみ削除を実行
  const deleteResult = await prisma.task.deleteMany({
    where: {
      id: validatedId.data,
      user_id: userId,
    },
  });

  if (deleteResult.count === 0) {
    throw new Error("タスクが見つからないか、操作権限がありません。");
  }

  revalidatePath("/");
}

export async function clearCompleted() {
  const userId = await getSessionUserIdOrThrow();

  // 🛡️ 自身の完了済みタスクのみに限定して一括削除
  await prisma.task.deleteMany({
    where: {
      completed: true,
      user_id: userId,
    },
  });
  revalidatePath("/");
}

export async function getActiveTaskCount(): Promise<number> {
  try {
    const userId = await getSessionUserIdOrThrow();

    // 🛡️ 自身の未完了タスクのみをカウント
    return await prisma.task.count({
      where: {
        completed: false,
        user_id: userId,
      },
    });
  } catch (error) {
    console.error("getActiveTaskCount エラー:", error);
    return 0;
  }
}
