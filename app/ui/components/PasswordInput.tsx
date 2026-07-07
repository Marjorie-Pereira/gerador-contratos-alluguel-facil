"use client";
import { FC, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldWrapper } from "./FieldWrapper";
import { cn } from "@/lib/utils";

export const PasswordInput: FC<{
  id: string;
  label: string;
  required?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  icon: boolean;
}> = ({
  id,
  label,
  required,
  inputProps,
  placeholder,
  className,
  icon = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const iconNode = showPassword ? <EyeOff /> : <Eye />;

  return (
    <FieldWrapper
      id={id}
      label={label}
      required={required}
      className={className}
    >
      <div className="flex gap-4 items-center relative">
        <input
          id={id}
          required={required}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          {...inputProps}
          className={cn(
            "w-full p-4 text-base border border-gray-300 bg-zinc-100 rounded-lg",
            "placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all",
            inputProps?.className,
          )}
        />

        {icon && (
          <span
            className="absolute right-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {iconNode}
          </span>
        )}
      </div>
    </FieldWrapper>
  );
};
