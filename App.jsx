import React, { useState } from "react";
import PathSelector from "./components/PathSelector";
import QuestionStep from "./components/QuestionStep";
import ResultDisplay from "./components/ResultDisplay";
import DeclaratieTabel from "./components/DeclaratieTabel";
import { paths } from "./data/paths";
import { calculateResult } from "./calculateResult";

// 🔹 Declaratiecodes-array (voorbeeld)
const declaratiecodes = [
  { code: "C001", omschrijving: "Consult kort" },
  { code: "C002", omschrijving: "Consult lang" },
  { code: "C003", omschrijving: "Visite" },
  // Voeg hier de rest van je declaratiecodes toe
];

export default function App() {
  const [path, setPath] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState("");
  const [resultCode, setResultCode] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    // Emoji's strippen
    const stripped = answer.replace("✅ ", "").replace("❌ ", "");
    const newAnswers = [...answers, stripped];
    setAnswers(newAnswers);

    const current = paths[path];

    // Skipregel 1: Consult stap 5 → overslaan rest bij telefonisch/e-consult
    // (index 4 is vraag 5)
    if (path === "Consult" && step === 4) {
      if (stripped === "Telefonisch consult" || stripped === "E-consult") {
        const { res, code } = calculateResult(path, newAnswers, stripped);
        setResult(res);
        setResultCode(code);
        return;
      }
    }

    // Skipregel 2: Consult stap 6 → sla vraag 7 over bij 'Nee'
    // (index 5 is vraag 6)
    if (path === "Consult" && step === 5 && stripped === "Nee") {
      if (step + 2 >= current.length) {
        // Geen extra vragen → toon resultaat
        const { res, code } = calculateResult(path, newAnswers, stripped);
        setResult(res);
        setResultCode(code);
      } else {
        // Sla index 6 over
        setStep(step + 2);
      }
      return;
    }

    // Normale flow
    if (step === current.length - 1) {
      const { res, code } = calculateResult(path, newAnswers, stripped);
      setResult(res);
      setResultCode(code);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setPath("");
    setStep(0);
    setAnswers([]);
    setResult("");
    setSelectedAnswer(null);
    setResultCode(null);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        🯪 Declaratiehulp Huisartsenzorg
      </h1>

      {!path ? (
        <>
          <PathSelector paths={paths} onSelect={setPath} />
          <DeclaratieTabel
            resultCode={resultCode}
            declaratiecodes={declaratiecodes}
          />
        </>
      ) : !result ? (
        <>
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="mb-4 px-4 py-2 rounded border border-gray-300 bg-gray-100 disabled:opacity-50"
          >
            ⬅ Terug
          </button>
          <QuestionStep
            step={step}
            question={paths[path][step].question}
            tooltip={paths[path][step].tooltip}
            options={paths[path][step].options}
            onAnswer={handleAnswer}
            selected={selectedAnswer}
          />
        </>
      ) : (
        <>
          <ResultDisplay
            result={result}
            onCopy={copyToClipboard}
            onReset={reset}
            copied={copied}
          />
          <DeclaratieTabel
            resultCode={resultCode}
            declaratiecodes={declaratiecodes}
          />
        </>
      )}
    </div>
  );
}
