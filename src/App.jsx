import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp-LogIn/SignUp";
import LogIn from "./components/SignUp-LogIn/LogIn";
import Creatures from "./components/Creatures/Creatures";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/creatures">
          <Route index element={<Creatures />} />
          <Route path=":id" element />
        </Route>
        <Route path="/cultures">
          <Route index element />
          <Route path=":id" element />
          <Route path="/cultures/events">
            <Route index element />
            <Route path=":id" element/>
          </Route>
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/favorites" element />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
