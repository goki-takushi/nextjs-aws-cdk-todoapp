"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/Button/Button";
import styles from "./LogoutButton.module.css";

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className={styles.logoutForm}>
      <Button type="submit" variant="secondary" onClick={handleLogout}>
        ログアウト
      </Button>
    </div>
  );
}
