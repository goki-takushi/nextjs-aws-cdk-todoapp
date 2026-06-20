"use client";

import { Button } from "@/components/Button/Button";
import { TaskCounterProps } from "../../types";
import styles from "./TaskCounter.module.css";

export function TaskCounter({
  activeCount,
  onClearCompleted,
}: TaskCounterProps) {
  return (
    <div className={styles.taskCounter}>
      <span className={styles.count}>{activeCount} 個のタスク</span>
      <Button
        onClick={onClearCompleted}
        variant="secondary"
        className={styles.clearButton}
      >
        完了したタスクを削除
      </Button>
    </div>
  );
}
