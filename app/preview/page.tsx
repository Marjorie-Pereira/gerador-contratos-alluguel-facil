"use client";

import { formatDateToBrazilian, toCurrencyString } from "@/lib/utils";
import { rentalContractData } from "@/types/formInputs";
import extenso from "extenso";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { ArrowLeft, Download } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { mockData } from "@/lib/constants/mockContractData";

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
  list: {
    textAlign: "justify",
    marginBottom: 10,
    marginLeft: 30,
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

function fillAndCreateDocument(data: rentalContractData) {
  if (!Object.entries(data).length) return;
  const { imovel, contrato, locador, locatario } = data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <Image style={styles.headerImage} src="/logo.jpeg" />
          <Text style={styles.headerTitle}>
            CONTRATO DE LOCAÇÃO DE IMÓVEL RESIDENCIAL
          </Text>
          <Text style={styles.headerTitle}>POR TEMPO DETERMINADO</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>1. Identificação das Partes</Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: "bold" }}>LOCADOR(A):</Text>{" "}
          {locador?.nome.toUpperCase()}, {locador?.nacionalidade},{" "}
          {locador?.estadoCivil},{" "}
          {locador?.documento.tipo === "RG"
            ? `portador(a) da cédula de identidade RG nº ${locador?.documento.valor}`
            : `inscrito(a) no CPF sob o nº ${locador?.documento.valor}`}
          , residente e domiciliado(a) na {locador?.endereco.logradouro},{" "}
          {locador?.endereco.bairro}, {locador?.endereco.cidade} -{" "}
          {locador?.endereco.estado}.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: "bold" }}>LOCATÁRIO(A): </Text>
          {locatario?.nome.toUpperCase()}, {locatario?.nacionalidade},{" "}
          {locatario?.estadoCivil},{" "}
          {locatario?.documento.tipo === "RG"
            ? `portador(a) da cédula de identidade RG nº ${locatario?.documento.valor}`
            : `inscrito(a) no CPF sob o nº ${locatario?.documento.valor}`}
          , residente e domiciliado(a) na {locatario?.endereco.logradouro},{" "}
          {locatario?.endereco.bairro}, {locatario?.endereco.cidade} -{" "}
          {locatario?.endereco.estado}.
        </Text>
        <Text style={styles.sectionTitle}>2. Do Imóvel</Text>
        <Text style={styles.paragraph}>
          O(A) LOCADOR(A) dá em locação ao(à) LOCATÁRIO(A) o imóvel:{" "}
          {imovel?.tipoImovel}, situado à {imovel?.endereco.logradouro},{" "}
          {imovel?.endereco.bairro}, {imovel?.endereco.cidade} -{" "}
          {imovel?.endereco.estado}.
        </Text>
        <Text style={styles.sectionTitle}>3. Cláusulas e Condições Gerais</Text>

        <Text style={styles.clause}>
          <Text style={{ fontWeight: "bold" }}>
            Cláusula Primeira - Valor Mensal da Locação:{" "}
          </Text>
          {toCurrencyString(contrato?.valorAluguel)} (
          {extenso(contrato.valorAluguel, { mode: "currency" })}). O aluguel
          mensal é o indicado neste contrato, devendo seupagamento ser feito no
          {contrato?.vencimentoAluguel}º. (
          {extenso(contrato?.vencimentoAluguel, { number: { ordinal: true } })})
          dia de cada mês ou o primeiro dia útil subsequente ao vencimento,
          mediante depósito bancário ao ADMINISTRADOR deste contrato.
        </Text>

        <Text style={styles.clause}>
          <Text style={{ fontWeight: "bold" }}>
            Cláusula Segunda - Prazo de Locação:
          </Text>
          A presente locação terá início no dia{" "}
          {formatDateToBrazilian(contrato?.inicioContrato)} e terminará
          impreterivelmente no dia{" "}
          {formatDateToBrazilian(contrato?.fimContrato)}. Podendo ser renovada,
          com acordo prévio das partes citadas neste contrato.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Parágrafo A:{" "}
          </Text>
          Será cobrado caução referente a {contrato?.caucao} (
          {extenso(contrato.caucao)}) meses de aluguel no valor de{" "}
          {toCurrencyString(contrato?.valorCaucao)} (
          {extenso(contrato.valorCaucao, { mode: "currency" })}). Sendo o
          primeiro mês de aluguel adiantado e o segundo para fins de vistoria
          final. Os mesmos serão devolvidos integralmente apos vistoria, caso
          não tenham débitos ou danos, corrigidos pela poupança.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Parágrafo B:{" "}
          </Text>
          O atraso no pagamento do aluguel terá uma multa de 10% que será
          aplicada sobre o valor do aluguel, prevista em lei federal n.
          8.245/1991 (Lei do Inquilinato). Caso ocorra atraso de mais de 15 dias
          ocasionará em rescisão do presente contrato, tendo o inquilino até 30
          (trinta) dias para deixar o imóvel.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Parágrafo C:{" "}
          </Text>
          Findo o prazo ajustado, se o LOCATÁRIO continuar na posse do imóvel
          por mais de 30 (trinta) dias, será acionado judicialmente ação de
          despejo.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Parágrafo D:{" "}
          </Text>
          Havendo inadimplência por parte do LOCATÁRIO incidirão, desde o
          vencimento até a data do efetivo pagamento, correção monetária pelo
          IGPM/FGV – Índice Geral de Preços de Mercado, ou pelo índice oficial
          que eventualmente o substitua, juros de mora de 1% (um por cento ) ao
          mês e fração, computados sobre o valor monetariamente atualizado, sem
          prejuízo do direito da Parte lesada rescindir o Contrato.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Parágrafo E:{" "}
          </Text>
          Em caso de cobrança judicial, devem ser acrescidas custas processuais
          e honorários advocatícios.
        </Text>

        {/* 3 */}

        <Text style={styles.clause}>
          <Text style={{ fontWeight: "bold" }}>
            Cláusula Terceira - Atributos e Demais Encargos:
          </Text>{" "}
          Obriga-se o LOCATÁRIO ao pagamento, por sua exclusiva responsabilidade
          as contas de consumo, tais como: ENERGIA, ÁGUA e INTERNET.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Parágrafo A:{" "}
          </Text>
          Quanto à ENERGIA e a ÁGUA, deverá ser providenciado alteração de
          titularidade junto à concessionária em até 15 (quinze) dias após a
          habitação do imóvel prevista na CLÁUSULA SEGUNDA
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Parágrafo B - Encargos e Responsabilidades:{" "}
          </Text>
          O LOCATÁRIO será responsável pela manutenção regular do imóvel,
          garantindo sua conservação e funcionamento adequados, exceto por danos
          causados por desgaste natural ou força maior
        </Text>
        {/* 3 */}
        {/* 4 */}
        <Text style={styles.clause}>
          <Text style={{ fontWeight: "bold" }}>
            Cláusula Quarta - Obrigações Gerais:
          </Text>{" "}
          O LOCATÁRIO declara ter procedido a vistoria no imóvel locado
          recebendo em perfeito estado e obrigando-se:
        </Text>
        <Text style={styles.list}>
          a{")"} Manter o objeto da locação no mais perfeito estado de
          conservação e limpeza, para assim restituir ao LOCADOR, quando finda
          ou rescindida a locação, correndo por sua conta exclusiva as despesas
          necessárias para esse fim, notadamente, ao que se refere a conservação
          de pinturas, portas, fechaduras, trincos, puxadores, vidraças,
          lustres, instalações elétricas, torneiras, aparelhos sanitários e
          quaisquer outra inclusive obrigando-se a pintar as paredes internas
          novamente em sua desocupação, com tintas e cores iguais as existentes,
          de acordo com laudo de vistoria, assinado e anexado neste contrato
          fazendo parte integrante do mesmo.
        </Text>
        <Text style={styles.list}>
          b{")"} Não fazer instalação, adaptação, obra ou benfeitoria, sem
          prévia autorização por escrito do locador.
        </Text>
        <Text style={styles.list}>
          c{")"} Não transferir este contrato, sob quaisquer pretextos e de
          igual forma alterar a destinação da locação, não constituindo o
          decurso de tempo, por si só, na demora do locador reprimir a infração,
          assentimento à mesma.
        </Text>
        <Text style={styles.list}>
          d{")"} Encaminhar ao LOCADOR todas as notificações, avisos ou
          intimações dos poderes públicos que forem entregues sobre o imóvel,
          sob pena de responder pelas multas, correção monetária e penalidades
          decorrentes do atraso no pagamento ou satisfação no cumprimento de
          determinações por aqueles poderes.
        </Text>
        <Text style={styles.list}>
          e{")"} No caso de qualquer obra, reforma ou adaptação, devidamente
          autorizada pelo LOCADOR, sendo indicado pelo mesmo o prestador de
          serviço de sua confiança, por ocasião da entrega efetiva das chaves do
          imóvel locado, retornar seu estado primitivo ou caso o proprietário
          concorde que permaneça como está, não poderá o LOCATÁRIO exigir
          qualquer indenização.
        </Text>
        <Text style={styles.list}>
          f{")"} Facultar ao LOCADOR ou seu representante legal examinar ou
          vistoriar o imóvel sempre que for solicitado, bem como do imóvel ser
          colocado à venda, permitir que os interessados o visitem, com o devido
          agendamento.
        </Text>
        <Text style={styles.list}>
          g{")"}Na entrega do imóvel, verificando-se infração pelo LOCATÁRIO de
          quaisquer cláusula que compõem este contrato, e que o imóvel necessite
          de algum conserto ou reparo de estragos deixados pelo LOCATÁRIO, o
          mesmo ficará pagando aluguel até o último dia da finalização dos
          consertos e estragos, inclusive as que verificarem de mão de obra e de
          material.
        </Text>
        <Text style={styles.list}>
          h{")"} Findo o prazo deste contrato, por ocasião da entrega das chaves
          será efetuada uma vistoria no imóvel, a fim de verificar se o mesmo se
          encontra nas condições que foi recebido pelo LOCATÁRIO.
        </Text>
        {/* 4 */}
        {/* 5 */}
        <Text style={styles.clause}>
          <Text style={{ fontWeight: "bold" }}>
            Cláusula Quinta - Rescisão Contratual:
          </Text>{" "}
          A infração das obrigações bem como a falta de pagamento do aluguel na
          data determinada consignadas na cláusula oitava, bem como desistência
          do contrato por parte do LOCATÁRIO, sem prejuízo de qualquer outra
          prevista em lei, por parte do LOCATÁRIO é considerada de natureza
          grave para ambos os lados, acarretando a rescisão contratual, com o
          consequente despejo e obrigatoriedade de imediata satisfação dos
          consectários contratuais.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Parágrafo A:{" "}
          </Text>
          A Rescisão do contrato por qualquer uma das partes, será infringida
          multa de 03 (três)meses do valor do aluguel no ATO de desocupação do
          referido imóvel. Bem como a vistoria e devolução do depósito caução no
          prazo de até 30 (TRINTA) dias, contados a partir da entrega das chaves
          à administradora por parte do LOCADOR, na sua integralidade ou já
          debitados danos ou pendências caso sejam observados.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Parágrafo B:{" "}
          </Text>
          Ao término do prazo, o LOCATÁRIO removerá seus bens e entregará
          pacificamente a propriedade ao LOCADOR em condições tão boas como
          quando foi entregue ao LOCATÁRIO, exceto o desgaste natural. O
          LOCATÁRIO está obrigado a devolver o imóvel em perfeitas condições de
          limpeza, conservação e pintura, findo o Contrato.
        </Text>
        {/* 5 */}
        {/* 6 */}
        <Text style={styles.clause}>
          <Text style={{ fontWeight: "bold" }}>
            Cláusula Sexta - Renovação:
          </Text>{" "}
          Obriga-se o LOCATÁRIO a renovar contrato, caso vier a permanecer no
          imóvel. O novo aluguel após o vencimento será determinado em acordo
          entre às partes caso concordem mutuamente com os possíveis reajustes.
          Conforme o IPCA. Terá um aviso com 30 dias de antecedência caso não
          seja feita a renovação do aluguel.
        </Text>
        {/* 6 */}
        {/* 7 */}
        <Text style={styles.clause}>
          <Text style={{ fontWeight: "bold" }}>
            Cláusula Sétima - Indenização e Direito de Retenção:
          </Text>{" "}
          Toda e qualquer benfeitoria autorizada pelo LOCADOR, ficará
          automaticamente incorporada ao imóvel, sem prejuízo do disposto na
          letra “e”, da cláusula quarta deste instrumento, e não podendo o
          LOCATÁRIO pretender qualquer indenização ou ressarcimento, bem como
          arguir, direito de retenção pelas mesmas.
        </Text>
        {/* 8 */}
        <Text style={styles.clause}>
          <Text style={{ fontWeight: "bold" }}>
            Cláusula Oitava - Vantagens Legais e Supervenientes:
          </Text>{" "}
          A locação estará sempre sujeita ao regime do Código Civil Brasileiro e
          da Lei n° 8.245 de 18/10/1991 ficando assegurado ao LOCADOR todos os
          direitos e vantagens conferidas pela legislação que vier a ser
          promulgada durante a locação.
        </Text>
        {/* 9 */}
        <Text style={styles.clause}>
          <Text style={{ fontWeight: "bold" }}>
            Cláusula Nona - Cláusula Penal:
          </Text>{" "}
          O LOCADOR e LOCATÁRIO obriga-se a respeitar o presente contrato em
          todas as suas cláusulas e condições, incorrendo a parteque infringir
          qualquer disposição contratual na rescisão do contrato. As partes
          contratantes elegem o Foro da situação do imóvel, quaisquer que sejam
          seus domicílios.
        </Text>

        <Text style={styles.paragraph}>
          E, por estarem justos e contratados, assinam o presente contrato em
          duas vias de igual teor na presença de duas testemunhas.
        </Text>
        <Text style={styles.paragraph}>
          Capão da Canoa, {formatDateToBrazilian(contrato?.dataContrato)}.
        </Text>
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Assinaturas:
        </Text>
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text>{locador?.nome.toUpperCase()}</Text>
            <Text style={{ fontSize: 10, color: "#555" }}>Locador(a)</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text>{locatario?.nome.toUpperCase()}</Text>
            <Text style={{ fontSize: 10, color: "#555" }}>Locatário(a)</Text>
          </View>
        </View>
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Testemunhas:
        </Text>
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text>Nome</Text>
            <Text style={{ fontSize: 10, color: "#555" }}>CPF:</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text>Nome</Text>
            <Text style={{ fontSize: 10, color: "#555" }}>CPF:</Text>
          </View>
        </View>
        <Text style={styles.footer} fixed>
          Alluguel Fácil - CNPJ: 12.345.678/0001-90
        </Text>
      </Page>
    </Document>
  );
}

export default function PreviewPDFPage() {
  const router = useRouter();
  const data = sessionStorage?.getItem("contractData");
  const dataObj = data ? JSON.parse(data) : mockData;
  const document = fillAndCreateDocument(dataObj);
  useEffect(() => {
    return () => {
      sessionStorage.clear();
    };
  }, []);
  return (
    <main className="p-8 bg-blue-950 text-white relative">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Visualizar Documento
      </h1>
      {document && (
        <PDFDownloadLink
          className="absolute top-3 right-8 bg-yellow-600 p-4 flex items-center gap-2 hover:opacity-80 hover:cursor-pointer"
          document={document}
          fileName="contrato.pdf"
        >
          {({ loading }) =>
            loading ? (
              "Preparing document..."
            ) : (
              <>
                {" "}
                <Download />
                Download
              </>
            )
          }
        </PDFDownloadLink>
      )}

      <button
        onClick={() => router.back()}
        className="absolute top-3 left-8 bg-yellow-600 p-4 flex items-center gap-2 hover:opacity-80 hover:cursor-pointer"
      >
        {" "}
        <ArrowLeft />
        Voltar
      </button>

      {document && (
        <BlobProvider document={document}>
          {({ url, loading }) => <PreviewPDFDynamic url={url!} />}
        </BlobProvider>
      )}
    </main>
  );
}
