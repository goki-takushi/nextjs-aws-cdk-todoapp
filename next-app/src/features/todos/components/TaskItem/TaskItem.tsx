"use client";

import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Button } from "@/components/Button/Button";
import type { TaskItemProps } from "../../types";
import styles from "./TaskItem.module.css";

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={styles.taskItem}>
      <label className={styles.taskLabel}>
        <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className={styles.taskText}>{task.text}</span>
      </label>
      <Button onClick={() => onDelete(task.id)} variant="danger">
        削除
      </Button>
    </li>
  );
}
