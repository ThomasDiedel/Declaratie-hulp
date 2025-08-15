import React from "react";

const resultContainerStyle = {
  backgroundColor: "#f9fafb",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "1.5rem",
  marginBottom: "1.5rem",
  whiteSpace: "pre-wrap",
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: "1rem",
  color: "#222",
};

const resetButtonStyle = {
  padding: "1rem 1.5rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#f0f4ff",
  cursor: "pointer",
  fontWeight: "600",
};

export default function ResultDisplay({ result, onReset }) {
  return (
    <div>
      <div style={resultContainerStyle}>{result}</div>
      <button
        onClick={onReset}
        style={resetButtonStyle}
        aria-label="Start opnieuw"
      >
        🔄 Opnieuw starten
      </button>
    </div>
  );
}
