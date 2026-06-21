"use client";

import { useActionState } from "react";
import { addTask } from "../../actions";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import styles from "./TaskForm.module.css";

export function TaskForm() {
  const [state, formAction, isPending] = useActionState(addTask, {
    error: null,
  });

  return (
    <form action={formAction} className={styles.taskForm}>
      <div className={styles.inputWrapper}>
        <Input
          name="taskText"
          disabled={isPending}
          placeholder="新しいタスクを入力"
        />
        {state?.error && <p className={styles.errorMessage}>{state.error}</p>}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "追加中..." : "追加"}
      </Button>
    </form>
  );
}
