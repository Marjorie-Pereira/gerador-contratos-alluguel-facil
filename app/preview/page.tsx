"use client";
import { ArrowLeft, Download } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const PreviewPDFDynamic = dynamic(
  () => import("@/components/PreviewPDFDocument"),
  { ssr: false },
);

export default function PreviewPDFPage() {
  const pdfUrl = "/exemplo.pdf";

  return (
    <main className="p-8 bg-blue-950 text-white relative">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Visualizar Documento
      </h1>
      <button className="absolute top-3 right-8 bg-yellow-600 p-4 flex items-center gap-2 hover:opacity-80 hover:cursor-pointer">
        <Download /> Download PDF
      </button>
      <button className="absolute top-3 left-8 bg-yellow-600 p-4 flex items-center gap-2 hover:opacity-80 hover:cursor-pointer">
        <ArrowLeft /> <Link href={"/"}>Voltar</Link>
      </button>

      <PreviewPDFDynamic url={pdfUrl} />
    </main>
  );
}
