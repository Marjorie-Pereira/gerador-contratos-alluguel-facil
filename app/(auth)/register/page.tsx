import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import InputField from "@/components/ui/InputField";
import InputGroupField from "@/components/ui/InputGroupField";
import PasswordInputField from "@/components/ui/PasswordInputField";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";

export default function Register() {
  return (
    <div className="bg-zinc-100 min-h-screen pt-10">
      <main>
        <div className="m-auto bg-white max-w-1/3 shadow-md p-10 border-b border-zinc-300">
          <p className="text-sm uppercase text-yellow-600 font-semibold">
            novo usuário
          </p>
          <h1 className="text-blue-950 text-2xl font-semibold">
            Crie sua conta
          </h1>
          <p className="text-blue-950">
            Preencha os dados para criar seu acesso
          </p>
          <Separator className="my-6" />
          <form action="/" method="get">
            <InputGroupField
              id="nome-completo"
              inputProps={{ name: "user-name" }}
              label="Nome completo"
              required={true}
              placeholder="Seu nome completo"
              icon={<User />}
              className="mb-4"
            />

            <InputGroupField
              id="email"
              inputProps={{ name: "user-email", type: "email" }}
              label="e-mail"
              required={true}
              placeholder="seu@email.com.br"
              icon={<Mail />}
              className="mb-4"
            />

            <InputGroupField
              id="phone"
              inputProps={{
                name: "user-phone",
                type: "tel",
              }}
              label="Telefone / whatsapp"
              required={true}
              placeholder="(00) 00000-0000"
              icon={<Phone />}
              className="mb-4"
            />

            <PasswordInputField
              id="senha"
              inputProps={{ name: "user-password", minLength: 8 }}
              label="senha"
              required={true}
              icon={<Lock />}
              className="mb-4"
              placeholder="Deve ter no mínimo 8 caracteres"
            />

            <PasswordInputField
              id="confirmar"
              inputProps={{ name: "user-password", minLength: 8 }}
              label="confirmar senha"
              required={true}
              icon={<Lock />}
              className="mb-4"
              placeholder="Repita a senha"
            />

            <Field orientation="horizontal">
              <Checkbox
                id="acceptTerms"
                className="data-[state=checked]:bg-blue-950 data-[state=checked]:border-blue-950 "
              />
              <FieldLabel htmlFor="acceptTerms">
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
      </main>
      <p className="text-center text-sm text-zinc-500 py-4">
        Alluguel Fácil - CNPJ: 12.345.678/0001-90 - Todos os direitos reservados
      </p>
    </div>
  );
}
