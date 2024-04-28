import { useState } from "react";

import "./App.css";
import ChatUI from "./Components/ChatUI/ChatUI";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChatUI />
    </>
  );
}

export default App;
