import React from "react";

export default function PathSelector({ paths, onSelect }) {
  const buttonStyle = {
    display: "block",
    margin: "0.5rem 0",
    padding: "0.75rem 1.25rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    fontSize: "1rem",
  };

  return (
    <>
      <p>Kies een pad om te starten:</p>
      {Object.keys(paths).map((opt) => (
        <button key={opt} onClick={() => onSelect(opt)} style={buttonStyle}>
          {opt}
        </button>
      ))}
    </>
  );
}
