import { InputProps } from "../../types";
import styles from "./Input.module.css";

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "",
  onKeyPress,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyPress) {
      onKeyPress(e.key);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      placeholder={placeholder}
      className={[styles.input, className].filter(Boolean).join(" ")}
    />
  );
};
