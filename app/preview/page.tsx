"use client";

import { rentalFormData } from "@/schemas/rentalFormSchema";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
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

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  {
    ssr: false,
  },
);

// const formDataJson: rentalFormData = JSON.parse(
//   sessionStorage?.getItem("formData") || "",
// );

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    objectFit: "contain",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    textAlign: "justify",
    marginBottom: 10,
    textIndent: 30,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: "center",
    fontSize: 10,
    color: "#777777",
    borderTopWidth: 0.5,
    borderTopColor: "#dddddd",
    paddingTop: 5,
  },
  clause: {
    textAlign: "justify",
    marginBottom: 10,
    textIndent: 20,
  },
  signatureContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    textAlign: "center",
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    marginBottom: 5,
    marginTop: 40,
  },
});
const document = (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image style={styles.headerImage} src="/logo.jpeg" />
        <Text style={styles.headerTitle}>
          CONTRATO DE LOCAÇÃO DE IMÓVEL RESIDENCIAL
        </Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>1. Identificação das Partes</Text>

      <Text style={styles.paragraph}>
        <Text style={{ fontWeight: "bold" }}>LOCADOR(A):</Text> João da Silva,
        brasileiro(a), estado civil, portador(a) da cédula de identidade RG nº
        00.000.000-0 e inscrito(a) no CPF sob o nº 000.000.000-00, residente e
        domiciliado(a) na Rua Exemplo, nº 123, Bairro Centro, Cidade - UF.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={{ fontWeight: "bold" }}>LOCATÁRIO(A):</Text> Maria de
        Souza, brasileira, estado civil, portadora da cédula de identidade RG nº
        11.111.111-1 e inscrita no CPF sob o nº 111.111.111-11, residente e
        domiciliada na Rua Modelo, nº 456, Bairro Jardim, Cidade - UF.
      </Text>

      <Text style={styles.sectionTitle}>2. Do Imóvel</Text>
      <Text style={styles.paragraph}>
        O(A) LOCADOR(A) dá em locação ao(à) LOCATÁRIO(A) o imóvel residencial
        situado na Av. Principal, nº 789, Apto 101, Bairro Bela Vista, CEP
        00000-000, Cidade - UF, composto por 2 quartos, sala, cozinha, banheiro
        e 1 vaga de garagem.
      </Text>

      <Text style={styles.sectionTitle}>3. Cláusulas e Condições Gerais</Text>

      <Text style={styles.clause}>
        <Text style={{ fontWeight: "bold" }}>
          Cláusula Primeira - Do Prazo:
        </Text>{" "}
        A presente locação terá o prazo de vigência de 12 (doze) meses, com
        início em 01 de novembro de 2026 e término em 31 de outubro de 2027,
        data em que o(a) LOCATÁRIO(A) se obriga a restituir o imóvel livre de
        pessoas e coisas, no mesmo estado em que o recebeu.
      </Text>

      <Text style={styles.clause}>
        <Text style={{ fontWeight: "bold" }}>
          Cláusula Segunda - Do Aluguel e Pagamento:
        </Text>{" "}
        O aluguel mensal será de R$ 2.000,00 (dois mil reais), que deverão ser
        pagos pelo(a) LOCATÁRIO(A) até o dia 5 (cinco) de cada mês subsequente
        ao vencido, mediante depósito ou transferência bancária para a conta
        indicada pelo(a) LOCADOR(A).
      </Text>

      <Text style={styles.clause}>
        <Text style={{ fontWeight: "bold" }}>
          Cláusula Terceira - Da Destinação:
        </Text>{" "}
        O imóvel objeto deste contrato destina-se exclusivamente para fins
        residenciais do(a) LOCATÁRIO(A) e de sua família, sendo expressamente
        vedada a sublocação, transferência ou cessão do imóvel, no todo ou em
        parte, sem o prévio consentimento por escrito do(a) LOCADOR(A).
      </Text>

      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Assinaturas:</Text>

      <View style={styles.signatureContainer}>
        <View style={styles.signatureBox}>
          <View style={styles.signatureLine} />
          <Text>João da Silva</Text>
          <Text style={{ fontSize: 10, color: "#555" }}>Locador(a)</Text>
        </View>
        <View style={styles.signatureBox}>
          <View style={styles.signatureLine} />
          <Text>Maria de Souza</Text>
          <Text style={{ fontSize: 10, color: "#555" }}>Locatário(a)</Text>
        </View>
      </View>

      <Text style={styles.footer} fixed>
        Alluguel Fácil - CNPJ: 12.345.678/0001-90
      </Text>
    </Page>
  </Document>
);

export default function PreviewPDFPage() {
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

      <BlobProvider document={document}>
        {({ url, loading }) => <PreviewPDFDynamic url={url!} />}
      </BlobProvider>
    </main>
  );
}
