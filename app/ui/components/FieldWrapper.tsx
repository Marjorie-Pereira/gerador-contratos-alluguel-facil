import { cn } from "@/lib/utils";
import { FC } from "react";

export const FieldWrapper: FC<{
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ id, label, required, children, className }) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-amber-700 uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-amber-800 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
};
