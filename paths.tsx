export const paths = {
  Consult: [
    {
      question: "Heeft de patiënt een medisch-inhoudelijke hulpvraag gesteld?",
      tooltip: "Inhoudelijke hulpvraag? Geen verzoek om dossier opvragen.",
      options: ["✅ Ja", "❌ Nee"],
    },
    {
      question: "Heb je op deze hulpvraag een professioneel antwoord gegeven?",
      tooltip: "Professioneel inhoudelijk, niet alleen verwijzen.",
      options: ["✅ Ja", "❌ Nee"],
    },
    {
      question: "Heb je het antwoord in of vanuit de praktijk gegeven?",
      tooltip: "Slechts declarabel in of vanuit praktijk.",
      options: ["✅ Ja", "❌ Nee"],
    },
    {
      question: "Hoe lang duurde het contactmoment met de patiënt?",
      tooltip: "Duur bepaalt consulttarief.",
      options: ["< 5 minuten", "5–20 minuten", "20 minuten of langer"],
    },
    {
      question: "Wat voor type consult was het?",
      tooltip: "Fysiek consult op praktijk, telefonisch of e-consult.",
      options: ["Fysiek consult", "Telefonisch consult", "E-consult"],
    },
    {
      question: "Heb je tijdens dit consult een M&I-verrichting uitgevoerd?",
      tooltip:
        "Bijvoorbeeld CRP-test, wondverzorging, injectie. Alleen relevant bij fysiek consult.",
      options: ["✅ Ja", "❌ Nee"],
    },
    {
      question: "Welke M&I-verrichting heb je uitgevoerd?",
      tooltip: "Kies de juiste verrichting uit de lijst.",
      options: [
        "Ambulante compressie therapie",
        "Therapeutische injectie Cyriax",
        "IUD inbrengen",
        "MRSA screening",
        "Hartritmestoornis Holterfoon",
        "Tympanometrie",
      ],
    },
  ],
  Visite: [
    {
      question: "Was het patiëntcontact thuis bij de patiënt?",
      tooltip: "Thuiscontact = patiëntlocatie, geen telefonisch overleg.",
      options: ["✅ Ja", "❌ Nee"],
    },
    {
      question: "Hoe lang duurde het contactmoment tijdens de visite?",
      tooltip: "Duur bepaalt of lang tarief geldt.",
      options: ["< 20 minuten", "≥ 20 minuten"],
    },
    {
      question: "Betreft het intensieve zorg of ELV?",
      tooltip: "Intensieve zorg zoals palliatief of ELV = aparte tarieven.",
      options: ["Geen van beide", "Intensieve zorg", "ELV"],
    },
  ],
  "M&I-verrichting": [
    {
      question: "Is er sprake van een medische verrichting?",
      tooltip: "Bijv. CRP-test, wondverzorging, injectie.",
      options: ["✅ Ja", "❌ Nee"],
    },
    {
      question: "Welke M&I-verrichting heb je uitgevoerd?",
      tooltip: "Kies de juiste verrichting uit de lijst.",
      options: [
        "Ambulante compressie therapie",
        "Therapeutische injectie Cyriax",
        "IUD inbrengen",
        "MRSA screening",
        "Hartritmestoornis Holterfoon",
        "Tympanometrie",
      ],
    },
  ],
};
