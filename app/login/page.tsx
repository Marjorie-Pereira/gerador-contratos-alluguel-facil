import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FormInput } from "../ui/components/FormInput";
import { ArrowRight } from "lucide-react";
import { PasswordInput } from "../ui/components/PasswordInput";

export default function Login() {
  return (
    <div className="bg-zinc-100 min-h-screen">
      <header className="bg-blue-950 border-b-3 border-yellow-600 p-6 mb-10">
        <div className="flex items-center gap-3">
          <Image
            src={"/logoo.svg"}
            width={640}
            height={640}
            alt={"Logo Alluguel Fácil"}
            className="w-15"
          />
          <div className="uppercase text-white">
            <p>Alluguel Fácil</p>
            <p>Gestão de contratos</p>
          </div>
        </div>
      </header>
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
          <form
            action="
          "
          >
            <FormInput
              id="email"
              inputProps={{ name: "user-email" }}
              label="e-mail"
              required={true}
              placeholder="seu@email.com.br"
              icon="Mail"
              className="mb-4"
            />
            <PasswordInput
              id="senha"
              inputProps={{ name: "user-password" }}
              label="senha"
              required={true}
              icon={true}
              className="mb-4"
            />

            <label htmlFor="keepLogged" className="flex items-center">
              <input
                id="keepLogged"
                type="checkbox"
                className="w-4 h-4 mr-2 accent-blue-950 "
              />
              Mantenha-me conectado por 30 dias
            </label>

            <button
              type="submit"
              className="uppercase text-white bg-blue-950 py-4 px-6 w-full mt-6 hover:opacity-90 flex justify-center gap-6 text-center"
            >
              <p>entrar no sistema</p> <ArrowRight />
            </button>
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
            <a href="#" className="text-yellow-600 font-semibold">
              Cadastre-se
            </a>
          </p>
        </div>
      </main>
      <p className="text-center text-sm text-zinc-500 py-4">
        Alluguel Fácil - CNPJ: 12.345.678/0001-90 - Todos os direitos reservados
      </p>
    </div>
  );
}
