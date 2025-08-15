export function stripEmoji(answer: string): string {
  return answer.replace(/^✅\s*/, "").replace(/^❌\s*/, "");
}

interface NextStepResult {
  nextStep?: number | null;
  result?: string;
  code?: string;
}

// Skiplogica en resultaatberekening
export function getNextStepAndResult(params: {
  path: string;
  step: number;
  strippedAnswer: string;
  answers: string[];
  paths: any;
  calculateResult: (
    path: string,
    answers: string[],
    lastAnswer: string
  ) => { res: string; code: string };
}): NextStepResult {
  const { path, step, strippedAnswer, answers, paths, calculateResult } =
    params;
  const current = paths[path];

  // Skipregel 1: Consult stap 5 → overslaan rest bij telefonisch/e-consult
  if (path === "Consult" && step === 4) {
    if (["Telefonisch consult", "E-consult"].includes(strippedAnswer)) {
      const { res, code } = calculateResult(
        path,
        [...answers, strippedAnswer],
        strippedAnswer
      );
      return { result: res, code, nextStep: null };
    }
  }

  // Skipregel 2: Consult stap 6 → sla vraag 7 over bij 'Nee'
  if (path === "Consult" && step === 5 && strippedAnswer === "Nee") {
    if (step + 2 >= current.length) {
      const { res, code } = calculateResult(
        path,
        [...answers, strippedAnswer],
        strippedAnswer
      );
      return { result: res, code, nextStep: null };
    } else {
      return { nextStep: step + 2 };
    }
  }

  // Normale flow
  if (step === current.length - 1) {
    const { res, code } = calculateResult(
      path,
      [...answers, strippedAnswer],
      strippedAnswer
    );
    return { result: res, code, nextStep: null };
  } else {
    return { nextStep: step + 1 };
  }
}
