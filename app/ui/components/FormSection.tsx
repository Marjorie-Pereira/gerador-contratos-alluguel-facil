"use client";
import React, { FC, useId, useState } from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { FormSectionProps } from "@/types/formTypes";
import DocumentToggle from "./DocumentToggle";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";

const ImovelDataSection: FC<FormSectionProps> = ({
  icon,
  title,
  subtitle,
  fields,
}) => {
  const generatedIdBase = useId();
  const [docType, setDocType] = useState("cpf");

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

      <hr className="border-t-2 border-blue-950 mb-8" />

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
              <InputField
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
              <SelectField
                key={uniqueId}
                id={uniqueId}
                label={field.label}
                required={field.required}
                selectProps={field.selectProps}
                placeholder={field.placeholder}
                className={wrapperClasses}
              />
            );
          } else if (field.type === "toggle" && field.toggleOptions) {
            return (
              <div key={uniqueId} className="flex gap-6 md:col-span-3">
                <div className="w-1/2 ">
                  <DocumentToggle
                    label={field.label}
                    required={field.required}
                    options={field.toggleOptions}
                    value={docType}
                    onChange={(newValue) => setDocType(newValue)}
                  />
                </div>

                {/* Exemplo de renderização condicional baseada no seletor */}
                {docType === "cpf" ? (
                  <InputField
                    id={`${field.toggleProps?.name}Cpf`}
                    label="CPF"
                    required={field.required}
                    inputProps={{ name: `${field.toggleProps?.name}Cpf` }}
                    placeholder="000.000.000-00"
                    className="flex-1"
                  />
                ) : (
                  <InputField
                    id={`${field.toggleProps?.name}RG`}
                    label="RG"
                    required={field.required}
                    inputProps={{ name: `${field.toggleProps?.name}RG` }}
                    placeholder="Apenas numeros"
                    className="flex-1"
                  />
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ImovelDataSection;
