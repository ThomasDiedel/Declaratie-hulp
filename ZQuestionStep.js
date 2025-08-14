import React from "react";

export default function QuestionStep({
  question,
  options,
  tooltip,
  selectedAnswer,
  onAnswerClick,
  onBack,
  canGoBack,
}) {
  const buttonStyle = {
    display: "block",
    margin: "0.5rem 0",
    padding: "0.75rem 1.25rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div>
      <button
        onClick={onBack}
        disabled={!canGoBack}
        style={{
          ...buttonStyle,
          marginBottom: "1rem",
          background: canGoBack ? "#f0f0f0" : "#ccc",
        }}
      >
        ⬅ Terug
      </button>

      <p>
        <strong>{question}</strong>
        <br />
        <span style={{ fontSize: "0.85em", color: "#555" }}>{tooltip}</span>
      </p>

      {options.map((opt, index) => (
        <button
          key={index}
          onClick={() => onAnswerClick(opt)}
          style={{
            ...buttonStyle,
            backgroundColor: selectedAnswer === opt ? "#d0ebff" : "#f9f9f9",
            borderColor: selectedAnswer === opt ? "#339af0" : "#ccc",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
