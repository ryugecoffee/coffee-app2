import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 28,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  heading: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: 700,
  },
  subheading: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 16,
  },
  card: {
    border: "1 solid #e5e7eb",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  metaGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  metaItem: {
    width: "48%",
    marginBottom: 6,
  },
  metaLabel: {
    fontSize: 8,
    color: "#9ca3af",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: 11,
    color: "#111827",
  },
  sectionTitle: {
    fontSize: 11,
    marginBottom: 8,
    fontWeight: 700,
    color: "#111827",
  },
  memo: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.5,
  },
  tagsWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    fontSize: 9,
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
    color: "#111827",
    marginRight: 6,
    marginBottom: 6,
  },
  wheelImage: {
    width: "100%",
    maxWidth: 470,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 10,
  },
});

function formatLabel(label) {
  return String(label || "")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function FlavorWheelPDFDocument({ note, wheelImage }) {
  const selectedLabels = (note?.items || [])
    .filter((item) => item.level === "leaf" || item.level === "mid")
    .map((item) => item.name);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Coffee Flavor Note</Text>
        <Text style={styles.subheading}>
          Another Day, Another Coffee By Ryuge Coffee
        </Text>

        <View style={styles.card}>
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Origin / Bean</Text>
              <Text style={styles.metaValue}>{note?.beanName || "-"}</Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Variety</Text>
              <Text style={styles.metaValue}>{note?.varietyName || "-"}</Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Roast day</Text>
              <Text style={styles.metaValue}>{note?.roastDay || "-"}</Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Created</Text>
              <Text style={styles.metaValue}>{note?.createdAt || "-"}</Text>
            </View>
          </View>

          {wheelImage ? <Image src={wheelImage} style={styles.wheelImage} /> : null}

          <Text style={styles.sectionTitle}>Selected wheel notes</Text>
          <View style={styles.tagsWrap}>
            {selectedLabels.length > 0 ? (
              selectedLabels.map((label, index) => (
                <Text key={`${label}-${index}`} style={styles.tag}>
                  {formatLabel(label)}
                </Text>
              ))
            ) : (
              <Text style={styles.memo}>No selected flavor labels.</Text>
            )}
          </View>
        </View>

        {note?.memo ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Memo</Text>
            <Text style={styles.memo}>{note.memo}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}