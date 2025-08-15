import React from "react";
import QuestionStep from "./QuestionStep";

export default function QuestionFlow({
  path,
  step,
  paths,
  selectedAnswer,
  onAnswer,
  onBack,
  disableBack,
}) {
  const questionData = paths[path][step];

  return (
    <>
      <button
        onClick={onBack}
        disabled={disableBack}
        style={{
          margin: "0.5rem 0",
          padding: "0.75rem 1.25rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
        }}
      >
        ⬅ Terug
      </button>

      <QuestionStep
        step={step}
        question={questionData.question}
        tooltip={questionData.tooltip}
        options={questionData.options}
        onAnswer={onAnswer}
        selected={selectedAnswer}
      />
    </>
  );
}
