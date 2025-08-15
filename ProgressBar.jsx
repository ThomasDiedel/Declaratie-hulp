import React from "react";

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div style={{ margin: "1rem 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.9rem",
        }}
      >
        <span>
          Stap {currentStep} van {totalSteps}
        </span>
      </div>
      <div
        style={{
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          height: "10px",
          marginTop: "0.25rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: "#007BFF",
            height: "100%",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
