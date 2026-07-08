"use client";
import React, { FC, InputHTMLAttributes } from "react";
import { FieldWrapper } from "./FieldWrapper";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

export const FormInput: FC<{
  id: string;
  label: string;
  required?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  icon?: keyof typeof LucideIcons | React.ReactNode;
 
}> = ({ id, label, required, inputProps, placeholder, className, icon }) => {
  const renderIcon = () => {
    if (
      typeof icon === "string" &&
      LucideIcons[icon as keyof typeof LucideIcons]
    ) {
      const LucideIcon = LucideIcons[icon as keyof typeof LucideIcons] as FC<{
        className?: string;
        onClick?: () => void;
      }>;
      return (
        <LucideIcon
          className="h-6 w-6 cursor-pointer absolute right-4 text-slate-400"
         
        />
      );
    } else if (React.isValidElement(icon)) {
      return <span className="absolute right-4">{icon}</span>;
    }
  };

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
          {...inputProps}
          className={cn(
            "w-full p-4 text-base border border-gray-300 bg-zinc-100 rounded-lg",
            "placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all",
            inputProps?.className,
          )}
        />
        {icon && renderIcon()}
      </div>
    </FieldWrapper>
  );
};
