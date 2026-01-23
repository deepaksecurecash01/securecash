import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// 1. Register Montserrat with DIRECT BINARY LINKS (gstatic.com)
// These links return the raw .ttf file, not an HTML page.
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "transparent",
    paddingRight: 50,
    paddingLeft: 50,
    fontFamily: "Montserrat", // Works now
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "flex-end",
  },
  fieldGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 12,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#000000",
    marginRight: 8,
    marginBottom: 2,
  },
  valueLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
    fontSize: 12,
    fontFamily: "Montserrat",
    color: "#000000",
  },
  signatureImage: {
    height: 30,
    objectFit: "contain",
  },
});

export const ExecutionFormOverlay = ({ formData }) => {
  const sigSource =
    formData.Signature && !formData.Signature.startsWith("data:")
      ? `data:image/png;base64,${formData.Signature}`
      : formData.Signature;

  const dateObj = new Date(formData["Date of Acceptance"] || Date.now());
  const dateStr = dateObj.toLocaleDateString("en-AU");
  const timeStr = dateObj.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Document>
      <Page size={[595, 300]} style={styles.page}>
        {/* ROW 1 */}
        <View style={styles.row}>
          <View style={[styles.fieldGroup, { width: "48%" }]}>
            <Text style={styles.label}>Name:</Text>
            <Text style={[styles.valueLine, { flex: 1 }]}>
              {formData["Full Name"]}
            </Text>
          </View>
          <View style={[styles.fieldGroup, { width: "48%" }]}>
            <Text style={styles.label}>Position:</Text>
            <Text style={[styles.valueLine, { flex: 1 }]}>
              {formData["Organisation Role"]}
            </Text>
          </View>
        </View>

        {/* ROW 2 */}
        <View style={styles.row}>
          <View style={[styles.fieldGroup, { width: "48%" }]}>
            <Text style={styles.label}>Email:</Text>
            <Text style={[styles.valueLine, { flex: 1 }]}>
              {formData["Email"]}
            </Text>
          </View>
          <View style={[styles.fieldGroup, { width: "48%" }]}>
            <Text style={styles.label}>DOB:</Text>
            <Text style={[styles.valueLine, { flex: 1 }]}>
              {formData["Birthday"]}
            </Text>
          </View>
        </View>

        {/* ROW 3 */}
        <View style={styles.row}>
          <View style={[styles.fieldGroup, { width: "48%" }]}>
            <Text style={styles.label}>Company:</Text>
            <Text style={[styles.valueLine, { flex: 1 }]}>
              {formData["Organisation Name"]}
            </Text>
          </View>
          <View style={[styles.fieldGroup, { width: "48%" }]}>
            <Text style={styles.label}>ABN:</Text>
            <Text style={[styles.valueLine, { flex: 1 }]}>
              {formData["Organisation ABN"]}
            </Text>
          </View>
        </View>

        {/* ROW 4 */}
        <View style={styles.row}>
          <View style={[styles.fieldGroup, { width: "45%" }]}>
            <Text style={styles.label}>Signature:</Text>
            <View
              style={[
                styles.valueLine,
                { flex: 1, height: 25, justifyContent: "flex-end" },
              ]}
            >
              {sigSource ? (
                <Image src={sigSource} style={styles.signatureImage} />
              ) : (
                <Text style={{ color: "#ccc", fontSize: 10 }}>/s/ Digital</Text>
              )}
            </View>
          </View>
          <View style={[styles.fieldGroup, { width: "25%" }]}>
            <Text style={styles.label}>Date:</Text>
            <Text style={[styles.valueLine, { flex: 1, textAlign: "center" }]}>
              {dateStr}
            </Text>
          </View>
          <View style={[styles.fieldGroup, { width: "20%" }]}>
            <Text style={styles.label}>Time:</Text>
            <Text style={[styles.valueLine, { flex: 1, textAlign: "center" }]}>
              {timeStr}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
