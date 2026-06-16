import { Button } from "@/components/Button/Button";
import styles from "./TaskCounter.module.css";

type TaskCounterProps = {
  activeCount: number;
};

export function TaskCounter({ activeCount }: TaskCounterProps) {
  const onClearCompleted = () => {
    console.log("完了したタスクを削除");
  };

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
