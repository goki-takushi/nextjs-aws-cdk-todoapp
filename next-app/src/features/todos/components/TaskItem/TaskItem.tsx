"use client";

import { toggleTask, deleteTask } from "../../actions";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Button } from "@/components/Button/Button";
import type { Task } from "../../types";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <li>
      <Checkbox
        checked={task.completed}
        onChange={() => toggleTask(task.id)} // ← Server Action呼び出し
      />
      <span>{task.text}</span>
      <Button
        onClick={() => deleteTask(task.id)} // ← Server Action呼び出し
        variant="danger"
      >
        削除
      </Button>
    </li>
  );
}
