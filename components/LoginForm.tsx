"use client";

import { ArrowRight, Lock, Mail } from "lucide-react";
import InputGroupField from "./InputGroupField";
import { Separator } from "./ui/separator";
import PasswordInputField from "./PasswordInputField";
import { Field, FieldLabel } from "./ui/field";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormData, loginFormSchema } from "@/schemas/signUpFormSchema";

export default function LoginForm() {
  const { handleSubmit, control } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      keepLogged: false,
    },
  });
  const onSubmit: SubmitHandler<loginFormData> = (data) => {
    console.log("submitting");
    console.log(data);
  };
  return (
    <>
      <div className="m-auto bg-white max-w-1/3 shadow-md px-10 py-10 border-b border-zinc-300">
        <p className="text-sm uppercase text-yellow-600 font-semibold">
          acesso ao sistema
        </p>
        <h1 className="text-blue-950 text-2xl font-semibold">
          Bem-vindo de volta
        </h1>
        <p className="text-blue-950">Acesse o painel de gestão de contratos</p>
        <Separator className="my-6" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <InputGroupField
                icon={<Mail />}
                id={field.name}
                inputProps={{ ...field }}
                label="e-mail"
                placeholder="seu@email.com.br"
                className="mb-4"
                invalid={fieldState.invalid}
                errors={[fieldState.error]}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <PasswordInputField
                icon={<Lock />}
                id={field.name}
                inputProps={{
                  ...field,
                  onChange: (e) => {
                    const newValue = e.target.value.replace(/\s/g, "");
                    field.onChange(newValue);
                  },
                }}
                label="senha"
                placeholder="Senha forte com 8 caracteres"
                className="mb-4"
                invalid={fieldState.invalid}
                errors={[fieldState.error]}
              />
            )}
          />

          <Controller
            name="keepLogged"
            control={control}
            render={({ field: { name, ref, onChange, value } }) => (
              <Field
                orientation="horizontal"
                className="my-6"
                onChange={() => {
                  onChange(!value);
                }}
              >
                <Checkbox
                  id={name}
                  value={Number(value)}
                  ref={ref}
                  className="data-[state=checked]:bg-blue-950 data-[state=checked]:border-blue-950 "
                />
                <FieldLabel htmlFor={name}>
                  Mantenha-me conectado por 30 dias
                </FieldLabel>
              </Field>
            )}
          />

          <Button type="submit" className="w-full">
            entrar no sistema
            <ArrowRight />
          </Button>

          <a
            href="#"
            className="text-md text-blue-950 text-center block underline mt-5"
          >
            Esqueci a senha
          </a>
        </form>
      </div>
      <div className="bg-stone-100 w-1/3  mx-auto mb-10 shadow-md ">
        <p className="text-sm text-blue-950 text-center py-4">
          Não possui uma conta?{" "}
          <Link href="/register" className="text-yellow-600 font-semibold">
            Cadastre-se
          </Link>
        </p>
      </div>
    </>
  );
}
