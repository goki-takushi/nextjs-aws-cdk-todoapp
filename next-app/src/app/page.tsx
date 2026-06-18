import { TodoApp } from "@/features/todos/TodoApp/TodoApp";
import styles from "./page.module.css";

export default function Home({
  searchParams,
}: {
  searchParams?: Promise<{ filter?: string } | undefined>;
}) {
  return (
    <main className={styles.main}>
      <TodoApp searchParams={searchParams} />
    </main>
  );
}
