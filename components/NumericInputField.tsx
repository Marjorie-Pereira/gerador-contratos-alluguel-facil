import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { NumericFieldProps } from "@/types/inputTypes";
import { NumericFormat } from "react-number-format";

export default function NumericInputField({
  id,
  label,
  required = true,
  className,
  numericProps,
  invalid,
  errors,
}: NumericFieldProps) {
  return (
    <Field className={cn("flex flex-col ", className)} data-invalid={invalid}>
      <FieldLabel
        htmlFor={id}
        className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1"
      >
        {label}
        {required && <span className="text-amber-800 ">*</span>}
      </FieldLabel>
      <NumericFormat
        id={id}
        aria-invalid={invalid}
        className={cn(
          "w-full px-4 py-3 text-base! border border-gray-300 bg-zinc-100 rounded-lg",
          "placeholder-gray-400 focus:ring-2 outline-none transition-all aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          numericProps?.className,
        )}
        {...numericProps}
      />

      {invalid && <FieldError errors={errors} />}
    </Field>
  );
}
