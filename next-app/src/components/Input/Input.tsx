import type { InputProps } from "../../types";
import styles from "./Input.module.css";

export function Input({
  name,
  type,
  value,
  onChange,
  placeholder = "",
  onKeyPress,
  className = "",
  disabled = false,
  required = false,
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
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      placeholder={placeholder}
      className={[styles.input, className].filter(Boolean).join(" ")}
      disabled={disabled}
      required={required}
    />
  );
}
