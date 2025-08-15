declare module "./ResultDisplay" {
  interface ResultDisplayProps {
    result: string;
    code: string;
    description: string;
    onCopy: () => void;
  }

  const ResultDisplay: React.FC<ResultDisplayProps>;
  export default ResultDisplay;
}
