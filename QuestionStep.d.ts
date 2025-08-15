declare module "./QuestionStep" {
  interface QuestionStepProps {
    step: number;
    path: string;
    paths: Record<string, any>;
    selectedAnswer: string;
    onAnswer: (answer: string) => void;
    onBack: () => void;
    disableBack: boolean;
  }

  const QuestionStep: React.FC<QuestionStepProps>;
  export default QuestionStep;
}
