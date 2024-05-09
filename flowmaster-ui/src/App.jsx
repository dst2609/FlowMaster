import { useState } from "react";
import "./App.css";
import Overview from "./Components/Overview/Overview";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="main-content">
        <Overview />
        <Footer />
      </div>
    </>
  );
}

export default App;
