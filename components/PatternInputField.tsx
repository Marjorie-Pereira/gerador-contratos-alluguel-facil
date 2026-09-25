import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { PatternFieldProps } from "@/types/inputTypes";
import { PatternFormat } from "react-number-format";

export default function PatternInputField({
  id,
  label,
  placeholder,
  required = true,
  className,
  patternProps,
  invalid,
  errors,
}: PatternFieldProps) {
  return (
    <Field className={cn("flex flex-col ", className)} data-invalid={invalid}>
      <FieldLabel
        htmlFor={id}
        className="text-sm font-medium uppercase tracking-wide m-0 gap-1"
      >
        {label}
        {required && <span className="text-amber-800 ">*</span>}
      </FieldLabel>
      <PatternFormat
        aria-invalid={invalid}
        id={id}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 text-base! border border-gray-300 bg-zinc-100 rounded-lg",
          "placeholder-gray-400 focus:ring-2 outline-none transition-all aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          patternProps?.className,
        )}
        {...patternProps}
      />

      {invalid && <FieldError errors={errors} />}
    </Field>
  );
}
