import { resultCodes } from "./data/resultCodes";

// Helper: maakt strings vergelijkbaar
function normalize(text) {
  return text.replace("✅ ", "").replace("❌ ", "").trim().toLowerCase();
}

export function calculateResult(path, answers, stripped) {
  let res = "";
  let code = null;

  if (path === "Consult") {
    if (answers.slice(0, 3).includes("Nee")) {
      return {
        res: "❌ Niet declarabel: voldoe niet aan vereisten.",
        code: null,
      };
    }

    const duration = normalize(answers[3]); // < 5 minuten / 5–20 minuten / ...
    const consultType = normalize(answers[4]); // fysiek consult / telefonisch consult / e-consult
    const miAnswer = answers[5] ? normalize(answers[5]) : null;

    // Telefonisch of E-consult → direct consult code
    if (
      consultType.includes("telefonisch") ||
      consultType.includes("e-consult")
    ) {
      const selected = resultCodes.Consult?.[answers[3]]?.[answers[4]];
      if (selected?.code) {
        res = `✅ Declareer code ${selected.code} (${selected.text})`;
        code = selected.code;
      } else {
        res = "❌ Onbekende combinatie voor consult.";
      }
      return { res, code };
    }

    // Fysiek consult + M&I "ja"
    if (consultType.includes("fysiek") && miAnswer === "ja") {
      const miVerrichting = answers[6] ? normalize(answers[6]) : null;

      // Zoek M&I verrichting op basis van genormaliseerde naam
      const matchKey = Object.keys(resultCodes["M&I-verrichting"]).find(
        (key) => normalize(key) === miVerrichting
      );

      const selected = matchKey
        ? resultCodes["M&I-verrichting"][matchKey]
        : null;
      if (selected?.code) {
        res = `✅ Declareer code ${selected.code} (${selected.text})`;
        code = selected.code;
      } else {
        res = "❌ Onbekende M&I-verrichting.";
      }
      return { res, code };
    }

    // Fysiek consult + M&I "nee" → normale consultcode
    if (consultType.includes("fysiek") && miAnswer === "nee") {
      const selected = resultCodes.Consult?.[answers[3]]?.[answers[4]];
      if (selected?.code) {
        res = `✅ Declareer code ${selected.code} (${selected.text})`;
        code = selected.code;
      } else {
        res = "❌ Onbekende combinatie voor consult.";
      }
      return { res, code };
    }
  } else if (path === "Visite") {
    if (answers[0] === "Nee") {
      res = "❌ Niet declarabel: geen thuiscontact.";
    } else {
      const selected =
        answers[1] === "< 20 minuten"
          ? resultCodes.Visite.regulier
          : resultCodes.Visite.lang;
      if (selected?.code) {
        res = `✅ Declareer code ${selected.code} (${selected.text})`;
        code = selected.code;
      } else {
        res = "❌ Onbekende keuze voor visite.";
      }
    }
    return { res, code };
  } else if (path === "M&I-verrichting") {
    if (answers[0] === "Nee") {
      res = "❌ Niet declarabel: geen verrichting.";
    } else {
      const miName = normalize(stripped);
      const matchKey = Object.keys(resultCodes["M&I-verrichting"]).find(
        (key) => normalize(key) === miName
      );
      const selected = matchKey
        ? resultCodes["M&I-verrichting"][matchKey]
        : null;

      if (selected?.code) {
        res = `✅ Declareer code ${selected.code} (${selected.text})`;
        code = selected.code;
      } else {
        res = "❌ Onbekende of niet-ondersteunde M&I-verrichting.";
      }
    }
    return { res, code };
  }

  return { res, code };
}
