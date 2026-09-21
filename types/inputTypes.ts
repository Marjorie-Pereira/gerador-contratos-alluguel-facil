import { InputHTMLAttributes, JSX } from "react";
import {
  InputAttributes,
  NumericFormatProps,
  PatternFormatProps,
} from "react-number-format";

type FieldProps = {
  label: string;
  placeholder?: string;
  id?: string;
  required?: boolean;
  className?: string;
  invalid?: boolean;
  tip?: string;
};

type InputFieldProps = FieldProps & {
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

type InputGroupFieldProps = InputFieldProps & {
  icon?: React.ReactNode;
};

type PatternFieldProps = FieldProps & {
  patternProps: PatternFormatProps;
};

type NumericFieldProps = FieldProps & {
  numericProps: NumericFormatProps;
};

type SelectFieldProps = FieldProps & {
  selectProps: {
    options: { value: string; label: string }[];
    nativeSelectProps?: { name: string; defaultValue?: string };
  };
};

export type {
  InputFieldProps,
  InputGroupFieldProps,
  SelectFieldProps,
  PatternFieldProps,
  NumericFieldProps,
};
