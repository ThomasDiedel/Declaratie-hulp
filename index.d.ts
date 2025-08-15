declare module "./index" {
  // Indien je index.js een default export heeft:
  const App: React.FC<any>; // Dit vertelt TypeScript dat App een React functionele component is
  export default App;
}
