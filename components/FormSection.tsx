"use client";
import React, { FC, useId, useState } from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { FormFieldProps, FormSectionProps } from "@/types/formTypes";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import ToggleGroupField from "@/components/ToggleGroupField";
import PatternInputField from "@/components/PatternInputField";
import { NumericFormat } from "react-number-format";
import NumericInputField from "@/components/NumericInputField";
import { useForm, SubmitHandler } from "react-hook-form";

const ImovelDataSection: FC<FormSectionProps> = ({
  icon,
  title,
  subtitle,
  fields,
}) => {
  const generatedIdBase = useId();
  const [docType, setDocType] = useState("cpf");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFieldProps>();
  const onSubmit: SubmitHandler<FormFieldProps> = (data) => console.log(data);

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
        <form action="" onSubmit={handleSubmit(onSubmit)}>
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
                  // inputProps={{...field.inputProps, ...register('typet6')}}
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
            } else if (field.type === "pattern") {
              return (
                <PatternInputField
                  key={uniqueId}
                  id={uniqueId}
                  label={field.label}
                  required={field.required}
                  patternProps={field.patternProps ?? { format: "" }}
                  placeholder={field.placeholder}
                  className={wrapperClasses}
                />
              );
            } else if (field.type === "numeric") {
              return (
                <NumericInputField
                  key={uniqueId}
                  id={uniqueId}
                  label={field.label}
                  required={field.required}
                  className={wrapperClasses}
                  numericProps={field.numericProps!}
                />
              );
            } else if (field.type === "toggle" && field.toggleOptions) {
              return (
                <div key={uniqueId} className="flex gap-6 md:col-span-3">
                  <div className="w-1/2 ">
                    <ToggleGroupField
                      label={field.label}
                      labelFor={`${field.toggleProps?.name}Document`}
                      required={field.required}
                      options={field.toggleOptions}
                      value={docType}
                      onChange={(newValue) => setDocType(newValue)}
                    />
                  </div>

                  {/* Exemplo de renderização condicional baseada no seletor */}
                  {docType === "cpf" ? (
                    <PatternInputField
                      id={`${field.toggleProps?.name}Document`}
                      label="CPF"
                      required={field.required}
                      patternProps={{
                        name: `${field.toggleProps?.name}Cpf`,
                        format: "###.###.###-##",
                      }}
                      placeholder="000.000.000-00"
                      className="flex-1"
                    />
                  ) : (
                    <PatternInputField
                      id={`${field.toggleProps?.name}Document`}
                      label="RG"
                      required={field.required}
                      patternProps={{
                        name: `${field.toggleProps?.name}Rg`,
                        format: "##########",
                      }}
                      placeholder="Apenas numeros"
                      className="flex-1"
                    />
                  )}
                </div>
              );
            }
            return null;
          })}
        </form>
      </div>
    </div>
  );
};

export default ImovelDataSection;
