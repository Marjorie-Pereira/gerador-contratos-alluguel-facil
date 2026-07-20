"use client";

import { Field, FieldError, FieldLabel } from "./field";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./input-group";
import { InputGroupFieldProps } from "@/types/inputTypes";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInputField({
  icon,
  id,
  className,
  label,
  placeholder,
  required = true,
  inputProps,
  invalid = false,
}: InputGroupFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <Field className={cn("flex flex-col ", className)}>
      <FieldLabel
        htmlFor={id}
        className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1"
      >
        {label}
        {required && <span className="text-amber-800 ">*</span>}
      </FieldLabel>
      <InputGroup
        className={cn(
          "w-full px-2 py-6 text-base! border border-gray-300 bg-zinc-100 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-amber-500! focus:border-amber-500! outline-none transition-all",

          inputProps?.className,
        )}
      >
        <InputGroupInput
          id={id}
          placeholder={placeholder}
          required={required}
          type={show ? "text" : "password"}
          {...inputProps}
        />
        {icon && <InputGroupAddon align="inline-start">{icon}</InputGroupAddon>}

        <InputGroupAddon
          align={"inline-end"}
          onClick={() => setShow(!show)}
          className="cursor-pointer "
        >
          {show ? (
            <EyeOff className="w-5! h-5!" />
          ) : (
            <Eye className="w-5! h-5!" />
          )}
        </InputGroupAddon>
      </InputGroup>

      {invalid && <FieldError>Validation message.</FieldError>}
    </Field>
  );
}
