"use client";
import React, { FC } from "react";
import * as LucideIcons from "lucide-react";
import { FormSectionProps } from "@/types/formTypes";

const FormSection: FC<FormSectionProps> = ({
  icon,
  title,
  subtitle,
  className,
  children,
}) => {
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
    <section className="bg-neutral-50 p-6 md:p-8 rounded-xl shadow-sm border border-neutral-100 max-w-7xl mx-auto my-8">
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

      <div className={className}>{children}</div>
    </section>
  );
};

export default FormSection;
