import { FC, SelectHTMLAttributes } from "react";
import { FieldWrapper } from "./FieldWrapper";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

export const FormSelect: FC<{
  id: string;
  label: string;
  required?: boolean;
  selectProps: {
    options: { value: string; label: string }[];
    nativeSelectProps?: SelectHTMLAttributes<HTMLSelectElement>;
  };
  placeholder?: string;
  className?: string;
}> = ({ id, label, required, selectProps, placeholder, className }) => {
  return (
    <FieldWrapper
      id={id}
      label={label}
      required={required}
      className={className}
    >
      <div className="relative">
        <select
          id={id}
          required={required}
          {...selectProps.nativeSelectProps}
          className={cn(
            "w-full p-4 pr-12 text-base border border-gray-300 bg-zinc-100 rounded-lg appearance-none",
            "text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all",
            selectProps.nativeSelectProps?.className,
          )}
        >
          {placeholder && (
            <option
              value=""
              defaultValue={selectProps.nativeSelectProps?.defaultValue}
              disabled
            >
              {placeholder}
            </option>
          )}
          {selectProps.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <LucideIcons.ChevronDown className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </FieldWrapper>
  );
};
