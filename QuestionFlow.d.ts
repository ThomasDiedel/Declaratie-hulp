declare module "./QuestionFlow" {
  interface QuestionFlowProps {
    path: string;
    step: number;
    paths: Record<string, any>;
    selectedAnswer: string;
    onAnswer: (answer: string) => void;
    onBack: () => void;
    disableBack: boolean;
  }

  const QuestionFlow: React.FC<QuestionFlowProps>;
  export default QuestionFlow;
}
