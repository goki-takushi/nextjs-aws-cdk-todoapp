"use client"; // ← useStateを使うためClient Component

// Client Component化が必要な場合
// useState、useEffect等のReact Hooksを使用
// onClick、onChange等のイベントハンドラを設定
// useRouter、useSearchParams等のNext.js Client Hooksを使用
// ブラウザAPI（localStorage、window等）にアクセス

import { useState } from "react";
import { addTask } from "../../actions"; // Server Actionをインポート
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";

export function TaskForm() {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = async () => {
    if (taskText.trim()) {
      await addTask(taskText.trim()); // Server Action呼び出し
      setTaskText("");
    }
  };

  return (
    <div>
      <Input
        value={taskText}
        onChange={setTaskText}
        onKeyPress={(key) => {
          if (key === "Enter") handleSubmit();
        }}
      />
      <Button onClick={handleSubmit}>追加</Button>
    </div>
  );
}
