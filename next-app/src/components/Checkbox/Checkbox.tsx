import { CheckboxProps } from "../../types";
import styles from "./Checkbox.module.css";

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  className = "",
}) => {
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
};
