declare module "./resultCodes" {
  export const resultCodes: {
    [key: string]: {
      [key: string]: {
        code: string;
        text: string;
      };
    };
  };
}
