import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Field, FieldLabel } from "./field";

type ToggleOption = {
  value: string;
  label: string;
};

type ToggleGroupFieldProps = {
  label: string;
  labelFor: string;
  required?: boolean;
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function ToggleGroupField({
  label,
  labelFor,
  required,
  options,
  value,
  onChange,
  className,
}: ToggleGroupFieldProps) {
  return (
    <Field className={cn("flex flex-col gap-2 w-full", className)}>
      <FieldLabel
        className="text-sm font-medium text-amber-700 uppercase tracking-wide"
        htmlFor={labelFor}
      >
        {label}
        {required && <span className="text-amber-800 ml-0.5">*</span>}
      </FieldLabel>
      <ToggleGroup
        variant="outline"
        type="single"
        spacing={0}
        size={`lg`}
        className="flex w-full rounded-lg overflow-hidden "
        onValueChange={onChange}
      >
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              aria-label={`toggle ${option.label}`}
              className={cn(
                "flex-1 flex items-center justify-center text-base font-bold transition-all duration-200 outline-none py-6",
                isSelected
                  ? "bg-blue-950! text-white hover:text-white"
                  : "bg-zinc-100 text-gray-500 hover:bg-zinc-200/70",
              )}
              onClick={(e) => {
                if (isSelected) {
                  e.preventDefault();
                }
              }}
            >
              {option.label}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </Field>
  );
}
