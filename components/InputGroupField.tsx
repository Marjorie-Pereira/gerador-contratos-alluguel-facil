import { Field, FieldError, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";
import { InputGroupFieldProps } from "@/types/inputTypes";
import { cn } from "@/lib/utils";

export default function InputGroupField({
  icon,
  id,
  className,
  label,
  placeholder,
  inputProps,
  invalid,
  required = true,
  errors,
}: InputGroupFieldProps) {
  return (
    <Field className={cn("flex flex-col ", className)} data-invalid={invalid}>
      <FieldLabel
        htmlFor={id}
        className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1"
      >
        {label}
        {required && <span className="text-amber-800 ">*</span>}
      </FieldLabel>
      <InputGroup
        className={cn(
          "w-full px-2 py-6 text-base! border border-gray-300 bg-zinc-100 rounded-lg placeholder-gray-400 focus:ring-2 outline-none transition-all aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",

          inputProps?.className,
        )}
      >
        <InputGroupInput
          placeholder={placeholder}
          {...inputProps}
          id={id}
          aria-invalid={invalid}
        />
        <InputGroupAddon align="inline-start">{icon}</InputGroupAddon>
      </InputGroup>

      {invalid && <FieldError errors={errors} />}
    </Field>
  );
}
