import Image from "next/image";
import { User } from "lucide-react";

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
            className="w-18 h-auto m-auto"
          />
          <User size={28} className="absolute top-0 right-5" />
        </div>
        <div className="mt-5 px-48">
          <h1 className="font-bold text-3xl mb-2">Contrato de Locação de Imóvel</h1>
          <p className="text-sm">Preencha todos os campos obrigatórios para gerar o contrato</p>
        </div>
      </header>
    </div>
  );
}
