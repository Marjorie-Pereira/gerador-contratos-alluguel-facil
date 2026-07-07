import Image from "next/image";

export default function Login() {
  return (
    <div className="bg-zinc-100 min-h-screen">
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
    </div>
  );
}
