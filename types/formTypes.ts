import { InputHTMLAttributes } from "react";
import * as LucideIcons from "lucide-react";
import { ToggleOption } from "@/app/ui/components/DocumentToggle";

export type FieldType = "input" | "select" | "toggle";

export interface FormFieldProps {
  id?: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  selectProps?: {
    options: { value: string; label: string }[];
    nativeSelectProps?: { name: string; defaultValue?: string };
  };
  toggleOptions?: ToggleOption[];
  toggleProps?: InputHTMLAttributes<HTMLInputElement>;
  wrapperClassName?: string;
}

export interface FormSectionProps {
  icon?: keyof typeof LucideIcons | React.ReactNode;
  title: string;
  subtitle?: string;
  fields: FormFieldProps[];
}
