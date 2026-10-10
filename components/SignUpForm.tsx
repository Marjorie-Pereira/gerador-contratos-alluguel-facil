"use client";

import { ArrowRight, Lock, Mail, User } from "lucide-react";
import InputGroupField from "./InputGroupField";
import { Separator } from "./ui/separator";
import PasswordInputField from "./PasswordInputField";
import { Field, FieldLabel } from "./ui/field";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormData, signUpFormSchema } from "@/schemas/signUpFormSchema";

export default function SignUpForm() {
  const { handleSubmit, control } = useForm<signUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<signUpFormData> = (data) => {
    console.log("submitting");
    console.log(data);
  };
  return (
    <>
      <div className="m-auto bg-white max-w-1/3 shadow-md p-10 border-b border-zinc-300">
        <p className="text-sm uppercase text-yellow-600 font-semibold">
          novo usuário
        </p>
        <h1 className="text-blue-950 text-2xl font-semibold">Crie sua conta</h1>
        <p className="text-blue-950">Preencha os dados para criar seu acesso</p>
        <Separator className="my-6" />
        <form action="/" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState }) => (
              <InputGroupField
                id={field.name}
                inputProps={{ ...field }}
                label="Nome completo"
                placeholder="Seu nome completo"
                icon={<User />}
                className="mb-4"
                invalid={fieldState.invalid}
                errors={[fieldState.error]}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <InputGroupField
                id={field.name}
                inputProps={{ ...field }}
                label="e-mail"
                placeholder="seu@email.com.br"
                icon={<Mail />}
                className="mb-4"
                invalid={fieldState.invalid}
                errors={[fieldState.error]}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <PasswordInputField
                id={field.name}
                inputProps={{
                  ...field,
                  onChange: (e) => {
                    const newValue = e.target.value.replace(/\s/g, "");
                    field.onChange(newValue);
                  },
                }}
                label="senha"
                icon={<Lock />}
                className="mb-4"
                placeholder="Deve ter no mínimo 8 caracteres"
                invalid={fieldState.invalid}
                errors={[fieldState.error]}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <PasswordInputField
                id={field.name}
                inputProps={{
                  ...field,
                  onChange: (e) => {
                    const newValue = e.target.value.replace(/\s/g, "");
                    field.onChange(newValue);
                  },
                }}
                label="confirmar senha"
                icon={<Lock />}
                className="mb-4"
                placeholder="Repita a senha"
                invalid={fieldState.invalid}
                errors={[fieldState.error]}
              />
            )}
          />

          <Field orientation="horizontal">
            <Checkbox
              id="termsAndConditions"
              className="data-[state=checked]:bg-blue-950 data-[state=checked]:border-blue-950 aria-invalid:text-destructive"
              required={true}
            />
            <FieldLabel htmlFor="termsAndConditions">
              Li e aceito os
              <span className="text-yellow-600 font-semibold ">
                Termos de Uso
              </span>
              e a
              <span className="text-yellow-600 font-semibold ">
                Política de Privacidade
              </span>
            </FieldLabel>
          </Field>

          <Button
            type="submit"
            className="uppercase text-white bg-blue-950 py-4 px-6 w-full mt-6 hover:opacity-90 flex justify-center gap-6 text-center"
          >
            criar minha conta
            <ArrowRight />
          </Button>
        </form>
      </div>
      <div className="bg-stone-100 w-1/3 m-auto mb-10 shadow-md py-4 ">
        <p className="text-sm text-blue-950 text-center py-4">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-yellow-600 font-semibold">
            ENTRAR
          </Link>
        </p>
      </div>
    </>
  );
}
