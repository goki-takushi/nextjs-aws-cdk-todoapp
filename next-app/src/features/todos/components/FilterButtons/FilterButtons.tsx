"use client";

// URL-Based State Managementのメリット
// 共有可能: URLをコピーするだけで同じ状態を共有できる
// ブラウザ履歴: 戻る/進むボタンで状態が復元される
// サーバー側フィルタリング: 初期ロード時から正しいフィルタが適用される

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button/Button";
import { FILTERS, type FilterType } from "../../types";
import styles from "./FilterButtons.module.css";

export function FilterButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = (searchParams.get("filter") || "all") as FilterType;

  const handleFilterChange = (filter: FilterType) => {
    if (filter === "all") {
      router.push("/");
    } else {
      router.push(`/?filter=${filter}`);
    }
  };

  return (
    <div className={styles.filterButtons}>
      {FILTERS.map(({ key, label }) => (
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
