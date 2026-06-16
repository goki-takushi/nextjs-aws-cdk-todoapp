"use client";

// URL-Based State Managementのメリット
// 共有可能: URLをコピーするだけで同じ状態を共有できる
// ブラウザ履歴: 戻る/進むボタンで状態が復元される
// サーバー側フィルタリング: 初期ロード時から正しいフィルタが適用される
// 状態管理ライブラリ不要: ReduxやZustand等が不要

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button/Button";
import type { FilterType } from "../../types";
import styles from "./FilterButtons.module.css";

export function FilterButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = (searchParams.get("filter") || "all") as FilterType;

  const handleFilterChange = (filter: FilterType) => {
    if (filter === "all") {
      router.push("/"); // 'all'の場合はクエリパラメータなし
    } else {
      router.push(`/?filter=${filter}`); // 'active'または'completed'
    }
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "すべて" },
    { key: "active", label: "未完了" },
    { key: "completed", label: "完了済み" },
  ];

  return (
    <div className={styles.filterButtons}>
      {filters.map(({ key, label }) => (
        <Button
          key={key}
          onClick={() => handleFilterChange(key)}
          variant={currentFilter === key ? "primary" : "secondary"}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
