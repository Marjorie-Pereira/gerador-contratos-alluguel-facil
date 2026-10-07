"use client";

import { rentalFormData } from "@/schemas/rentalFormSchema";
import { Document, Page, Text, usePDF } from "@react-pdf/renderer";
import { ArrowLeft, Download } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const PreviewPDFDynamic = dynamic(
  () => import("@/components/PreviewPDFDocument"),
  { ssr: false },
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const formDataJson: rentalFormData = JSON.parse(
  sessionStorage.getItem("formData") || "",
);

const document = (
  <Document>
    <Page size="A4">
      {Object.entries(formDataJson).map((item, index) => (
        <Text key={index}>{item.toString()}</Text>
      ))}
    </Page>
  </Document>
);

export default function PreviewPDFPage() {
  const [instance, updateInstance] = usePDF({ document: document });
  return (
    <main className="p-8 bg-blue-950 text-white relative">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Visualizar Documento
      </h1>
      <button className="absolute top-3 right-8 bg-yellow-600 p-4 flex items-center gap-2 hover:opacity-80 hover:cursor-pointer">
        <Download />{" "}
        <PDFDownloadLink document={document} fileName="contrato.pdf">
          {({ loading }) => (loading ? "Preparing document..." : "Download")}
        </PDFDownloadLink>
      </button>
      <button className="absolute top-3 left-8 bg-yellow-600 p-4 flex items-center gap-2 hover:opacity-80 hover:cursor-pointer">
        <ArrowLeft /> <Link href={"/"}>Voltar</Link>
      </button>

      {instance.url && <PreviewPDFDynamic url={instance.url} />}
    </main>
  );
}
