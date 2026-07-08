import { Separator } from "@/components/ui/separator";
import { FormInput } from "../../ui/components/FormInput";
import { ArrowRight } from "lucide-react";
import { PasswordInput } from "../../ui/components/PasswordInput";
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
            <FormInput
              id="nome-completo"
              inputProps={{ name: "user-name" }}
              label="Nome completo"
              required={true}
              placeholder="Seu nome completo"
              icon="User"
              className="mb-4"
            />
            <FormInput
              id="email"
              inputProps={{ name: "user-email", type: "email" }}
              label="e-mail"
              required={true}
              placeholder="seu@email.com.br"
              icon="Mail"
              className="mb-4"
            />
            <FormInput
              id="phone"
              inputProps={{
                name: "user-phone",
                type: "tel",
              }}
              label="Telefone / whatsapp"
              required={true}
              placeholder="(00) 00000-0000"
              icon="Phone"
              className="mb-4"
            />
            <PasswordInput
              id="senha"
              inputProps={{ name: "user-password", minLength: 8 }}
              label="senha"
              required={true}
              icon={true}
              className="mb-4"
            />
            <PasswordInput
              id="confirmar"
              label="confirmar senha"
              inputProps={{ minLength: 8 }}
              required={true}
              icon={true}
              className="mb-4"
            />

            <label htmlFor="keepLogged" className="flex items-center text-sm">
              <input
                id="keepLogged"
                type="checkbox"
                required={true}
                className="w-4 h-4 mr-2 accent-blue-950 "
              />
              <p>
                Li e aceito
                <span className="text-yellow-600 font-semibold ">
                  {" "}
                  Termos de Uso
                </span>{" "}
                e a{" "}
                <span className="text-yellow-600 font-semibold ">
                  {" "}
                  Política de Privacidade
                </span>
              </p>
            </label>

            <button
              type="submit"
              className="uppercase text-white bg-blue-950 py-4 px-6 w-full mt-6 hover:opacity-90 flex justify-center gap-6 text-center"
            >
              criar minha conta
              <ArrowRight />
            </button>
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
