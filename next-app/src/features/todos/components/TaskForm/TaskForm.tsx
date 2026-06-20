"use client";

// Client Component化が必要な場合
// useState、useEffect等のReact Hooksを使用
// onClick、onChange等のイベントハンドラを設定
// useRouter、useSearchParams等のNext.js Client Hooksを使用
// ブラウザAPI（localStorage、window等）にアクセス

import { useActionState } from "react";
import { addTask } from "../../actions";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import styles from "./TaskForm.module.css";

export function TaskForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const text = formData.get("taskText") as string;
      if (!text || !text.trim()) {
        return null;
      }

      // TODO: 認証機能がある場合はそこから取得
      const userId = "example-user-id";
      await addTask(userId, text.trim());
      return null;
    },
    null,
  );

  return (
    <form action={formAction} className={styles.taskForm}>
      <div className={styles.inputWrapper}>
        <Input
          name="taskText"
          disabled={isPending}
          placeholder="新しいタスクを入力"
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "追加中..." : "追加"}
      </Button>
    </form>
  );
}
