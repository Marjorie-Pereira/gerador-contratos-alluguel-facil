import { SelectFieldProps } from "@/types/inputTypes";
import { Field, FieldLabel } from "./field";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export default function SelectField({
  id,
  label,
  required,
  selectProps,
  placeholder,
  className,
}: SelectFieldProps) {
  return (
    <Field className={cn("flex flex-col ", className)}>
      <FieldLabel
        htmlFor={id}
        className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1"
      >
        {label} {required && <span className="text-amber-800 ">*</span>}
      </FieldLabel>
      <Select {...selectProps.nativeSelectProps} required={required}>
        <SelectTrigger
          className={cn(
            "w-full px-4 py-6 text-md border border-gray-300 bg-zinc-100 rounded-lg appearance-none",
            "text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all",
          )}
          id={id}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {selectProps.options.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
