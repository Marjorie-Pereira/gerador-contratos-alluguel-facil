import { lato } from "@/app/ui/fonts";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-full flex flex-col ${lato.className} antialiased`}>
      <header className="bg-blue-950 border-b-3 border-yellow-600 p-6">
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
      {children}
    </div>
  );
}
