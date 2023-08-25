import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.warn(
      "DEVELOPER TOOL is for DEVELOPERS only. Please do not paste unknown code or follow others instructions while using this tool, it is only for software developers working in this project. If you are not aware of what you are doing please close this immidately. "
    );
  }, []);
  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
