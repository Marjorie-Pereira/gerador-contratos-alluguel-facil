import Image from "next/image";
import { User, Building } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import BRAZIL_STATES from "@/lib/constants/states";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select";

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
          <section className="bg-white shadow-md p-5 text-stone-600">
            <header className="border-b-2  border-sky-950 flex gap-4 items-center pb-2 mb-5">
              <div className="bg-sky-950 w-10 h-10 flex justify-center items-center">
                <Building className="text-white " />
              </div>
              <div>
                <p className="text-yellow-600 text-sm font-normal">SEÇÃO 01</p>
                <h2 className="text-sky-950 font-bold text-xl">
                  Dados do Imóvel
                </h2>
              </div>
            </header>
            <div>
              <Field className="mb-4">
                <FieldLabel
                  htmlFor="logradouro-num"
                  className="text-stone-600 text-md font-bold"
                >
                  Endereço (Logradouro e número){" "}
                  <span className="text-yellow-600">*</span>
                </FieldLabel>
                <Input
                  id="logradouro-num"
                  type="text"
                  placeholder="Ex.: Rua das Camélias, 233"
                  className="py-5 border-stone-200"
                />
              </Field>

              <div className="flex gap-4 mb-4">
                <Field className="flex-none w-0 basis-1/3">
                  <FieldLabel
                    htmlFor="bairro"
                    className="text-stone-600 text-md font-bold"
                  >
                    Bairro <span className="text-yellow-600">*</span>
                  </FieldLabel>
                  <Input
                    id="bairro"
                    type="text"
                    placeholder="Ex.: Capão Novo"
                    className="py-5 border-stone-200"
                  />
                </Field>

                <div className="flex grow gap-4 items-center">
                  <Field>
                    <FieldLabel
                      htmlFor="cidade"
                      className="text-stone-600 text-md font-bold"
                    >
                      Cidade <span className="text-yellow-600">*</span>
                    </FieldLabel>
                    <Input
                      id="cidade"
                      type="text"
                      placeholder="Cidade"
                      className="py-5 border-stone-200"
                      defaultValue={"Capão da Canoa"}
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="estado"
                      className="text-stone-600 text-md font-bold"
                    >
                      Estado <span className="text-yellow-600">*</span>
                    </FieldLabel>
                    <Select defaultValue="RS">
                      <SelectTrigger className="w-45 py-5 border-stone-200">
                        {" "}
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>

                      <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white">
                        <SelectGroup>
                          {BRAZIL_STATES.map((state, idx) => (
                            <SelectItem
                              value={state.value}
                              key={idx}
                              className="hover:bg-stone-100"
                            >
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </div>
              {/* bottom fields */}
              <div className="flex gap-4 mb-4">
                <div className="w-0 flex-none basis-1/3">
                  <Field>
                    <FieldLabel
                      htmlFor="cep"
                      className="text-stone-600 text-md font-bold"
                    >
                      CEP <span className="text-yellow-600">*</span>
                    </FieldLabel>
                    <Input
                      id="cep"
                      type="number"
                      placeholder="00000-000"
                      className="py-5 border-stone-200"
                      pattern="/^\d{5}-?\d{3}$/"
                    />
                  </Field>
                </div>
                {/* select for property type */}
                <div className="w-0 grow">
                  <Field>
                    <FieldLabel
                      htmlFor="tipo"
                      className="text-stone-600 text-md font-bold"
                    >
                      Tipo de imóvel <span className="text-yellow-600">*</span>
                    </FieldLabel>
                    <Select>
                      <SelectTrigger className="w-45 py-5 border-stone-200">
                        {" "}
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>

                      <SelectContent className="z-50 max-h-60 overflow-y-auto bg-white">
                        <SelectGroup>
                          <SelectItem
                            value="casa"
                            className="hover:bg-stone-100"
                          >
                            Casa
                          </SelectItem>
                          <SelectItem
                            value="apartamento"
                            className="hover:bg-stone-100"
                          >
                            Apartamento
                          </SelectItem>
                          <SelectItem
                            value="sobrado"
                            className="hover:bg-stone-100"
                          >
                            Sobrado
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </div>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
