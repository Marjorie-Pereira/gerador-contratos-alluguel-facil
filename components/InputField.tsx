"use client";

import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { InputFieldProps } from "@/types/inputTypes";
import { useId } from "react";

export default function InputField({
  id,
  label,
  placeholder,
  required = true,
  className,
  inputProps,
  invalid = false,
}: InputFieldProps) {
  const uniqueId = id || useId();
  return (
    <Field className={cn("flex flex-col ", className)}>
      <FieldLabel
        htmlFor={uniqueId}
        className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1"
      >
        {label}
        {required && <span className="text-amber-800 ">*</span>}
      </FieldLabel>
      <Input
        id={uniqueId}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full px-4 py-6 text-base! border border-gray-300 bg-zinc-100 rounded-lg",
          "placeholder-gray-400 focus:ring-2 focus:ring-amber-500! focus:border-amber-500 outline-none transition-all",
          inputProps?.className,
        )}
        {...inputProps}
      />

      {invalid && <FieldError>Validation message.</FieldError>}
    </Field>
  );
}
