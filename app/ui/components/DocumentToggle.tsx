import React, { FC } from "react";
import clsx from "clsx";

// Interface para as opções do seletor
export interface ToggleOption {
  value: string;
  label: string;
}

// Interface das props do componente
export interface DocumentToggleProps {
  label: string; // Título do campo (ex: 'TIPO DE DOCUMENTO')
  required?: boolean; // Se exibe o asterisco de obrigatório
  options: ToggleOption[]; // Lista de opções para renderizar
  value: string; // Valor atualmente selecionado
  onChange: (value: string) => void; // Função disparada ao trocar a seleção
  className?: string; // Classes extras para o wrapper externo
}

const DocumentToggle: FC<DocumentToggleProps> = ({
  label,
  required = false,
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={clsx("flex flex-col gap-2 w-full", className)}>
      {/* Label idêntica ao padrão anterior */}
      <label className="text-sm font-medium text-amber-700 uppercase tracking-wide">
        {label}
        {required && <span className="text-amber-800 ml-0.5">*</span>}
      </label>

      {/* Container do Toggle */}
      <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm h-14.5">
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={clsx(
                "flex-1 flex items-center justify-center text-base font-bold transition-all duration-200 outline-none",
                isSelected
                  ? "bg-blue-950 text-white" // Estilo Selecionado (Azul Escuro)
                  : "bg-zinc-100 text-gray-500 hover:bg-zinc-200/70", // Estilo Não Selecionado (Cinza Claro)
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentToggle;
