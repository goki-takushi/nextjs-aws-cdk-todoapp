"use client";

import { useActionState } from "react";
import { loginAction } from "../../actions";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    loginAction,
    undefined,
  );

  return (
    <form action={formAction} className={styles.loginForm}>
      <h2 className={styles.formTitle}>ログイン</h2>
      <Input
        name="email"
        type="email"
        placeholder="メールアドレス"
        disabled={isPending}
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="パスワード"
        disabled={isPending}
        required
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "ログイン中..." : "ログイン"}
      </Button>
    </form>
  );
}
