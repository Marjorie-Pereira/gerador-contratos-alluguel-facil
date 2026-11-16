import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
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
    marginTop: 10,
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
