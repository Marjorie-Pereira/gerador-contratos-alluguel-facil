import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import InputGroupField from "@/components/ui/InputGroupField";
import PasswordInputField from "@/components/ui/PasswordInputField";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="bg-zinc-100 min-h-screen pt-10">
      <main>
        <div className="m-auto bg-white max-w-1/3 shadow-md p-10 border-b border-zinc-300">
          <p className="text-sm uppercase text-yellow-600 font-semibold">
            acesso ao sistema
          </p>
          <h1 className="text-blue-950 text-2xl font-semibold">
            Bem-vindo de volta
          </h1>
          <p className="text-blue-950">
            Acesse o painel de gestão de contratos
          </p>
          <Separator className="my-6" />
          <form action="/" method="get">
           
            <InputGroupField
              icon={<Mail />}
              id="email"
              inputProps={{ name: "user-email", type:"email" }}
              label="e-mail"
              required={true}
              placeholder="seu@email.com.br"
              className="mb-4"
              
            />
            <PasswordInputField
              icon={<Lock />}
              id="password"
              inputProps={{ name: "user-password", minLength:8 }}
              label="senha"
              placeholder="Senha forte com 8 caracteres"
              className="mb-4"
            />

            <Field orientation="horizontal">
              <Checkbox id="keepLogged" name="terms-checkbox-basic" className="data-[state=checked]:bg-blue-950 data-[state=checked]:border-blue-950 " />
              <FieldLabel htmlFor="keepLogged">
                Mantenha-me conectado por 30 dias
              </FieldLabel>
            </Field>

            <Button type="submit" className="w-full mt-4">
              entrar no sistema
              <ArrowRight />
            </Button>
          </form>
        </div>
        <div className="bg-stone-100 w-1/3 m-auto mb-10 shadow-md ">
          <p className="text-sm text-blue-950 text-center py-4">
            Esqueceu sua senha?{" "}
            <a href="#" className="text-yellow-600 font-semibold">
              Clique aqui
            </a>
          </p>

          <p className="text-sm text-blue-950 text-center py-4">
            Não possui uma conta?{" "}
            <Link href="/register" className="text-yellow-600 font-semibold">
              Cadastre-se
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
