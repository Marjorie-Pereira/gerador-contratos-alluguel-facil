import * as LucideIcons from "lucide-react";
import { InputHTMLAttributes } from "react";

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

export type { InputFieldProps, InputGroupFieldProps };
