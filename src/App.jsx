import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp-LogIn/SignUp";
import LogIn from "./components/SignUp-LogIn/LogIn";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
       {/*  <Route path="/creatures" index></Route>
        <Route path="/cultures" index></Route> */}
        <Route path="/sign-up" element={<SignUp/>}/> 
        <Route path="/log-in" element={<LogIn/>}/>
       {/*  <Route path="/favorites"/> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
