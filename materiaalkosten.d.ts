declare module "./materiaalkosten" {
  interface MateriaalkostenProps {
    materiaal: string;
    kosten: number;
    eenheid: string;
    beschrijving: string;
  }

  const Materiaalkosten: React.FC<MateriaalkostenProps>;
  export default Materiaalkosten;
}
