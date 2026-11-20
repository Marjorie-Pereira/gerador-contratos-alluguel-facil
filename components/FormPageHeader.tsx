import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { logout } from "@/app/actions/auth";

export default function FormPageHeader({
  userData,
}: {
  userData:
    | {
        email: string | undefined;
        first_name: string | null;
        last_name: string | null;
      }
    | undefined;
}) {
  return (
    <header className="flex bg-sky-950  text-white border-b-4 border-yellow-600">
      <div className="w-48 p-10">
        <Image
          src={"/logoo.svg"}
          width={640}
          height={640}
          alt={"Logo Alluguel Fácil"}
          className="w-auto"
        />
      </div>
      <div className="mt-5 flex-1 pt-10 pb-8">
        <h1 className="font-bold text-3xl mb-2">
          Contrato de Locação de Imóvel
        </h1>
        <p className="text-lg">
          Preencha todos os campos obrigatórios para gerar o contrato
        </p>
      </div>
      {userData && (
        <Drawer direction="right">
          <DrawerTrigger className="cursor-pointer">
            <User size={28} className="mr-10" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {userData?.first_name ?? "Not"} {userData?.last_name ?? "Found"}
              </DrawerTitle>
              <DrawerDescription>{userData?.email ?? " "}</DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
              <Button onClick={logout}>Sair</Button>
              <DrawerClose>Fechar</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </header>
  );
}
