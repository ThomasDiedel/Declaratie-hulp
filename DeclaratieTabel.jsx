import React, { useState } from "react";
import { resultCodes } from "../data/resultCodes";
import { materiaalkosten } from "../data/materiaalkosten"; // Nieuw bestand

export default function DeclaratieTabel({ resultCode }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Helperfunctie om geneste structuren plat te maken
  const flattenCodes = (category, codes) => {
    const rows = [];
    Object.entries(codes).forEach(([key, value]) => {
      if (value && typeof value === "object" && !value.code) {
        // Geneste structuur
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue && subValue.code) {
            rows.push({
              category,
              name: `${key} - ${subKey}`,
              code: subValue.code,
              text: subValue.text,
            });
          }
        });
      } else if (value && value.code) {
        // Gewone code
        rows.push({
          category,
          name: key,
          code: value.code,
          text: value.text,
        });
      }
    });
    return rows;
  };

  // Platte lijst van alle codes uit resultCodes
  const rowsFromResultCodes = Object.entries(resultCodes).flatMap(
    ([category, codes]) => flattenCodes(category, codes)
  );

  // Materiaalkosten toevoegen als losse entries
  const rowsFromMaterial = materiaalkosten.map((item) => ({
    category: item.categorie,
    name: item.omschrijving,
    code: item.code,
    text: item.omschrijving,
  }));

  // Alles samenvoegen
  const allRows = [...rowsFromResultCodes, ...rowsFromMaterial];

  // Filteren op zoekterm
  const filteredRows = allRows.filter(
    (row) =>
      row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>📋 Declaratiecodes overzicht</h2>

      {/* Zoekveld */}
      <input
        type="text"
        placeholder="Zoek op categorie, verrichting of code..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* Tabel */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "0.5rem",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Categorie</th>
            <th style={thStyle}>Verrichting</th>
            <th style={thStyle}>Code</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, idx) => (
            <tr
              key={idx}
              style={{
                backgroundColor:
                  resultCode && row.code === resultCode ? "#e6ffe6" : "white",
              }}
            >
              <td style={tdStyle}>{row.category}</td>
              <td style={tdStyle}>{row.text}</td>
              <td style={tdStyle}>{row.code}</td>
            </tr>
          ))}

          {filteredRows.length === 0 && (
            <tr>
              <td
                colSpan="3"
                style={{ textAlign: "center", padding: "1rem", color: "#777" }}
              >
                Geen resultaten gevonden
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Tabelstijl
const thStyle = {
  borderBottom: "2px solid #ccc",
  textAlign: "left",
  padding: "0.5rem",
};

const tdStyle = {
  padding: "0.5rem",
  borderBottom: "1px solid #eee",
};
