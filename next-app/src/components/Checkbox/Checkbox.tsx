import type { CheckboxProps } from "../../types";
import styles from "./Checkbox.module.css";

export function Checkbox({ checked, onChange, className = "" }: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className={[styles.checkbox, className].filter(Boolean).join(" ")}
    />
  );
}
