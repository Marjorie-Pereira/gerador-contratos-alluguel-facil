import * as LucideIcons from "lucide-react";
import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  placeholder?: string;
  id: string;
  required?: boolean;
  className?: string;
  invalid?: boolean;
};

type InputFieldProps = FieldProps & {
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

type InputGroupFieldProps = InputFieldProps & {
  icon: keyof typeof LucideIcons | React.ReactNode;
};

type SelectFieldProps = FieldProps & {
  selectProps: {
    options: { value: string; label: string }[];
    nativeSelectProps?: { name: string; defaultValue?: string };
  };
};

export type { InputFieldProps, InputGroupFieldProps, SelectFieldProps };
