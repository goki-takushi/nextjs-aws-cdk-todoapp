import {
  clearCompleted,
  deleteTask,
  getTasks,
  getActiveTaskCount,
  toggleTask,
} from "../actions";
import { TaskForm } from "../components/TaskForm/TaskForm";
import { FilterButtons } from "../components/FilterButtons/FilterButtons";
import { TaskItem } from "../components/TaskItem/TaskItem";
import { TaskCounter } from "../components/TaskCounter/TaskCounter";
import { LogoutButton } from "@/features/auth/components/LogoutButton/LogoutButton"; // 💡インポート
import type { FilterType, TodoAppProps } from "../types";
import styles from "./TodoApp.module.css";

export async function TodoApp({ searchParams }: TodoAppProps) {
  const resolvedSearchParams = await searchParams;
  const filter = (resolvedSearchParams?.filter || "all") as FilterType;

  const allTasks = await getTasks();
  const filteredTasks = allTasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    } else if (filter === "completed") {
      return task.completed;
    }
    return true;
  });

  const activeCount = await getActiveTaskCount();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>To-Doリスト</h1>
        <LogoutButton />
      </div>

      <TaskForm />
      <FilterButtons />
      <ul className={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <li className={styles.emptyMessage}>タスクがありません</li>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </ul>
      <TaskCounter
        activeCount={activeCount}
        onClearCompleted={clearCompleted}
      />
    </div>
  );
}
