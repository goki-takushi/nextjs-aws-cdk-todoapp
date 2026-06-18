import type { ButtonProps } from "../../types";
import styles from "./Button.module.css";

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) {
  const buttonClass = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
