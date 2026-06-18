"use client";

import { toggleTask, deleteTask } from "../../actions";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Button } from "@/components/Button/Button";
import type { Task } from "../../types";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <li className={styles.taskItem}>
      <label className={styles.taskLabel}>
        <Checkbox
          checked={task.completed}
          onChange={() => toggleTask(task.id)} // ← Server Action呼び出し
        />
        <span className={styles.taskText}>{task.text}</span>
      </label>
      <Button
        onClick={() => deleteTask(task.id)} // ← Server Action呼び出し
        variant="danger"
      >
        削除
      </Button>
    </li>
  );
}
