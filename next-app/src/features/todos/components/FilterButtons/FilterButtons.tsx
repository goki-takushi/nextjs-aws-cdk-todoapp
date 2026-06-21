"use client";

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
