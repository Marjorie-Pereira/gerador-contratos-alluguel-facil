import { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import * as LucideIcons from "lucide-react";

export type FieldType = "input" | "select";

export interface FormFieldProps {
  id?: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  selectProps?: {
    options: { value: string; label: string }[];

    nativeSelectProps?: SelectHTMLAttributes<HTMLSelectElement>;
  };
  wrapperClassName?: string;
}

export interface FormSectionProps {
  icon?: keyof typeof LucideIcons | React.ReactNode;
  title: string;
  subtitle?: string;
  fields: FormFieldProps[];
}
