export const FILTERS = [
  { key: "all", label: "すべて" },
  { key: "active", label: "未完了" },
  { key: "completed", label: "完了済み" },
] as const;

export type FilterType = (typeof FILTERS)[number]["key"];

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  created_at: Date;
}

export interface TaskFormProps {
  onAddTask: (text: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface TaskCounterProps {
  activeCount: number;
  onClearCompleted: () => void;
}

export interface TodoAppProps {
  searchParams?: Promise<{ filter?: string } | undefined>;
}
