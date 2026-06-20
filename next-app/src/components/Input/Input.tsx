import type { InputProps } from "../../types";
import styles from "./Input.module.css";

export function Input({
  name,
  value,
  onChange,
  placeholder = "",
  onKeyPress,
  className = "",
  disabled = false,
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyPress) {
      onKeyPress(e.key);
    }
  };

  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      placeholder={placeholder}
      className={[styles.input, className].filter(Boolean).join(" ")}
      disabled={disabled}
    />
  );
}
