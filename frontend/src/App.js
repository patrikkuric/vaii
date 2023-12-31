import Navbar from "./Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Tech from "./pages/Tech";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";  // Import the new component
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:gameName" element={<GameDetails />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    </div>
  );
}

export default App;
