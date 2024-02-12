import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/*         <Route path="/creatures" index></Route>
        <Route path="/cultures" index></Route>
        <Route path="/sign-up"/>
        <Route path="/log-in"/>
        <Route path="/favorites"/> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
