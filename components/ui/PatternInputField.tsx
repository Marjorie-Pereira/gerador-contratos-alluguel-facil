import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import { InputFieldProps, PatternFieldProps } from "@/types/inputTypes";
import { PatternFormat, PatternFormatProps } from "react-number-format";

export default function PatternInputField({
  id,
  label,
  placeholder,
  required = true,
  className,
  patternProps,
  invalid = false,
}: PatternFieldProps) {
  return (
    <Field className={cn("flex flex-col ", className)}>
      <FieldLabel
        htmlFor={id}
        className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1"
      >
        {label}
        {required && <span className="text-amber-800 ">*</span>}
      </FieldLabel>
      <PatternFormat
        id={id}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full px-4 py-3 text-base! border border-gray-300 bg-zinc-100 rounded-lg",
          "placeholder-gray-400 focus:ring-2 focus:ring-amber-500! focus:border-amber-500 outline-none transition-all",
          patternProps?.className,
        )}
        {...patternProps}
      />

      {invalid && <FieldError>Validation message.</FieldError>}
    </Field>
  );
}
