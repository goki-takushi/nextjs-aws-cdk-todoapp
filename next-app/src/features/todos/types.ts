// TODO機能固有の型定義

// タスクの型定義
export interface Task {
  id: number; // 一意のID（タイムスタンプ）
  text: string; // タスクの内容
  completed: boolean; // 完了状態
  createdAt: Date; // 作成日時
}

// フィルタタイプ（すべて/未完了/完了済み）
export type FilterType = "all" | "active" | "completed";

// 各コンポーネントのProps型定義
export interface TaskFormProps {
  onAddTask: (text: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export interface TaskCounterProps {
  activeCount: number;
  onClearCompleted: () => void;
}
