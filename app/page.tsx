import Image from "next/image";
import { User, Building } from "lucide-react";

export default function Home() {
  return (
    <div>
      <header className="bg-sky-950 pt-2 pb-8 text-white border-b-4 border-yellow-600">
        <div className="relative">
          <Image
            src={"/logoo.svg"}
            width={640}
            height={640}
            alt={"Logo Alluguel Fácil"}
            className="w-15 h-auto m-auto"
          />
          <User size={28} className="absolute top-0 right-5" />
        </div>
        <div className="mt-5 px-48">
          <h1 className="font-bold text-3xl mb-2">
            Contrato de Locação de Imóvel
          </h1>
          <p className="text-sm">
            Preencha todos os campos obrigatórios para gerar o contrato
          </p>
        </div>
      </header>
      <main className="pt-10 px-48 h-screen bg-stone-100">
        <form action="/" method="post">
          <section className="bg-white shadow-md p-5">
            <header className="border-b-2  border-sky-950 flex gap-4 items-center pb-2">
              <div className="bg-sky-950 w-8 h-8 flex justify-center items-center">
                <Building className="text-white w-4" />
              </div>
              <div>
                <p className="text-yellow-600 text-xs font-normal">SEÇÃO 01</p>
                <h2 className="text-sky-950 font-bold">Dados do Imóvel</h2>
              </div>
            </header>
          </section>
        </form>
      </main>
    </div>
  );
}
