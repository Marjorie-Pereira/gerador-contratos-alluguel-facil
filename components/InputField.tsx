"use client";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { InputFieldProps } from "@/types/inputTypes";
import { useEffect } from "react";

export default function InputField({
  id,
  label,
  placeholder,
  required = true,
  className,
  inputProps,
  invalid,
  errors,
}: InputFieldProps) {
  useEffect(() => {
    console.log(invalid);
    console.log(errors);
  });
  return (
    <Field className={cn("flex flex-col ", className)} data-invalid={invalid}>
      <FieldLabel
        htmlFor={id}
        className="text-sm font-medium uppercase tracking-wide m-0 gap-1"
      >
        {label}
        {required && <span className="text-amber-800 ">*</span>}
      </FieldLabel>
      <Input
        id={id}
        aria-invalid={invalid}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-6 text-base! border border-gray-300 bg-zinc-100 rounded-lg",
          "placeholder-gray-400 focus:ring-2 outline-none transition-all",
          inputProps?.className,
        )}
        {...inputProps}
      />

      {invalid && <FieldError errors={errors} />}
    </Field>
  );
}
