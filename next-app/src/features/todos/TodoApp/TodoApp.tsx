// 'use client'なし = Server Component

// Server Componentの利点
// データベースに直接アクセス可能
// シークレット情報をクライアントに送信しない
// 初期ロードが高速（HTMLとして事前レンダリング）
// SEOに有利

import { getTasks, getActiveTaskCount } from "../actions";
import { TaskForm } from "../components/TaskForm/TaskForm";
import { FilterButtons } from "../components/FilterButtons/FilterButtons";
import { TaskItem } from "../components/TaskItem/TaskItem";
import { TaskCounter } from "../components/TaskCounter/TaskCounter";
import type { FilterType } from "../types";
import styles from "./TodoApp.module.css";

interface TodoAppProps {
  searchParams?: { filter?: string };
}

export async function TodoApp({ searchParams }: TodoAppProps) {
  const filter = (searchParams?.filter || "all") as FilterType;

  // サーバー側でデータフェッチ
  const allTasks = await getTasks();
  const filteredTasks = allTasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }
    if (filter === "completed") {
      return task.completed;
    }
    return true;
  });

  const activeCount = await getActiveTaskCount();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-Doリスト</h1>
      <TaskForm />
      <FilterButtons />
      <ul className={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <li className={styles.emptyMessage}>タスクがありません</li>
        ) : (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </ul>
      <TaskCounter activeCount={activeCount} />
    </div>
  );
}
