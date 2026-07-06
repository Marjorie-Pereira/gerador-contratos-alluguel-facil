import React, {
  FC,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useId,
} from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldWrapper } from "@/app/ui/components/FieldWrapper";
import { FormSectionProps } from "@/types/formTypes";
import { FormSelect } from "./FormSelect";

const FormInput: FC<{
  id: string;
  label: string;
  required?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}> = ({ id, label, required, inputProps, placeholder, className }) => {
  return (
    <FieldWrapper
      id={id}
      label={label}
      required={required}
      className={className}
    >
      <input
        id={id}
        required={required}
        placeholder={placeholder}
        {...inputProps}
        className={cn(
          "w-full p-4 text-base border border-gray-300 bg-zinc-100 rounded-lg",
          "placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all",
          inputProps?.className,
        )}
      />
    </FieldWrapper>
  );
};

const ImovelDataSection: FC<FormSectionProps> = ({
  icon,
  title,
  subtitle,
  fields,
}) => {
  const generatedIdBase = useId();

  // Renderiza o ícone com base no prop
  const renderIcon = () => {
    if (
      typeof icon === "string" &&
      LucideIcons[icon as keyof typeof LucideIcons]
    ) {
      const LucideIcon = LucideIcons[icon as keyof typeof LucideIcons] as FC<{
        className?: string;
      }>;
      return (
        <div className="shrink-0 w-12 h-12 bg-blue-950 flex items-center justify-center rounded-sm">
          <LucideIcon className="h-6 w-6 text-white" />
        </div>
      );
    } else if (React.isValidElement(icon)) {
      return (
        <div className="shrink-0 w-12 h-12 bg-blue-950 flex items-center justify-center rounded-sm">
          {icon}
        </div>
      );
    }
    return (
      <div className="shrink-0 w-12 h-12 bg-blue-950 flex items-center justify-center rounded-sm">
        <LucideIcons.Home className="h-6 w-6 text-white" />
      </div>
    );
  };

  return (
    <div className="bg-neutral-50 p-6 md:p-8 rounded-xl shadow-sm border border-neutral-100 max-w-7xl mx-auto my-8">
      <div className="flex items-center gap-6 mb-6">
        {renderIcon()}
        <div className="flex flex-col">
          {subtitle && (
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-1">
              {subtitle}
            </span>
          )}
          <h2 className="text-3xl font-bold text-blue-950">{title}</h2>
        </div>
      </div>

      <hr className="border-t border-blue-950 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        {fields.map((field, index) => {
          const uniqueId = field.id || `${generatedIdBase}-${index}`;

          const wrapperClasses = cn(
            field.wrapperClassName,

            !field.wrapperClassName?.includes("col-span") &&
              field.label.length > 15
              ? "md:col-span-3"
              : "",
          );

          if (field.type === "input") {
            return (
              <FormInput
                key={uniqueId}
                id={uniqueId}
                label={field.label}
                required={field.required}
                inputProps={field.inputProps}
                placeholder={field.placeholder}
                className={wrapperClasses}
              />
            );
          } else if (field.type === "select" && field.selectProps) {
            return (
              <FormSelect
                key={uniqueId}
                id={uniqueId}
                label={field.label}
                required={field.required}
                selectProps={field.selectProps}
                placeholder={field.placeholder}
                className={wrapperClasses}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ImovelDataSection;
