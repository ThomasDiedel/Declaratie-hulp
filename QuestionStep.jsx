import React from "react";

const questionStyle = {
  fontWeight: "600",
  fontSize: "1.25rem",
  marginBottom: "0.5rem",
};

const tooltipStyle = {
  fontSize: "0.9rem",
  color: "#666",
  marginBottom: "1rem",
};

const optionStyle = (isSelected) => ({
  padding: "0.75rem 1rem",
  marginBottom: "0.5rem",
  borderRadius: "6px",
  border: isSelected ? "2px solid #3b82f6" : "1px solid #ccc",
  backgroundColor: isSelected ? "#3b82f6" : "#fff",
  color: isSelected ? "#fff" : "#333",
  cursor: "pointer",
  userSelect: "none",
  width: "100%",
  textAlign: "left",
  transition: "background-color 0.3s ease, border-color 0.3s ease",
});

export default function QuestionStep({
  step,
  question,
  tooltip,
  options,
  onAnswer,
  selected,
}) {
  return (
    <div>
      <h2 style={questionStyle}>
        Vraag {step + 1}: {question}
      </h2>
      {tooltip && <p style={tooltipStyle}>{tooltip}</p>}

      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onAnswer(opt)}
          style={optionStyle(selected === opt)}
          type="button"
          aria-pressed={selected === opt}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
