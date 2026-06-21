import { TodoApp } from "@/features/todos/TodoApp/TodoApp";
import type { TodoAppProps } from "@/features/todos/types";
import styles from "./page.module.css";

export default function Home({ searchParams }: TodoAppProps) {
  return (
    <div className={styles.home}>
      <TodoApp searchParams={searchParams} />
    </div>
  );
}
