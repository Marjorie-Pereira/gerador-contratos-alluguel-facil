"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

interface PreviewPDFProps {
  url: string;
}

export default function PreviewPDF({ url }: PreviewPDFProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="border border-gray-300 rounded shadow-lg bg-white p-2 m-4">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p>Carregando documento...</p>}
          error={<p>Erro ao carregar o PDF.</p>}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={600}
          />
        </Document>
      </div>

      {numPages && (
        <div className="flex gap-4 items-center">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((prev) => prev - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500"
          >
            Anterior
          </button>
          <p className="text-blue-950">
            Página {pageNumber} de {numPages}
          </p>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
