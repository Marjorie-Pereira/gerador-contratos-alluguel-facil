import { FC, InputHTMLAttributes } from "react";
import { FieldWrapper } from "./FieldWrapper";
import { cn } from "@/lib/utils";

export const FormInput: FC<{
  id: string;
  label: string;
  required?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}> = ({ id, label, required, inputProps, placeholder, className }) => {
  return (
    <FieldWrapper
      id={id}
      label={label}
      required={required}
      className={className}
    >
      <input
        id={id}
        required={required}
        placeholder={placeholder}
        {...inputProps}
        className={cn(
          "w-full p-4 text-base border border-gray-300 bg-zinc-100 rounded-lg",
          "placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all",
          inputProps?.className,
        )}
      />
    </FieldWrapper>
  );
};
