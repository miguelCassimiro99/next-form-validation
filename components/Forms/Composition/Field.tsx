import classNames from "classnames";
import { HTMLAttributes } from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  isCheckbox?: boolean;
}

export default function Field({ isCheckbox, className, ...props }: FieldProps) {
  const styles = classNames(
    {
      "flex flex-col gap-1": !isCheckbox,
      "flex flex-row gap-1": isCheckbox,
    },
    className
  );

  return <div className={styles} {...props} />;
}
