import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp-LogIn/SignUp";
import LogIn from "./components/SignUp-LogIn/LogIn";
import Creatures from "./components/Creatures/Creatures";
import SingleCreature from "./components/Creatures/SingleCreature";
import Cultures from "./components/Cultures/Cultures";
import InnerNavbar from "./components/Cultures/InnerNavbar";
import SingleCulture from "./components/Cultures/SingleCulture";
import Events from "./components/Events/Events";
import SingleEvent from "./components/Events/SingleEvent";
import Search from "./components/Search";
import Favorites from "./components/Favorites/Favorites";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="creatures">
          <Route index element={<Creatures />} />
          <Route path="creature/:id" element={<SingleCreature />} />
        </Route>
        <Route path="cultures" element={<InnerNavbar />}>
          <Route index element={<Cultures />} />
          <Route path="culture/:id" element={<SingleCulture />} />
          <Route path="/cultures/events">
            <Route index element={<Events />} />
            <Route path="event/:id" element={<SingleEvent />} />
          </Route>
        </Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="log-in" element={<LogIn />} />
        <Route path="favorites" element={<Favorites/>} />
        <Route path="add" element />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
