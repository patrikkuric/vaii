import Navbar from "./Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Tech from "./pages/Tech";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";  // Import the new component
import Admin from "./pages/Admin";
import React, {useEffect} from "react";
import axios from "axios";
import useTokenStore from "./token";
import Account from "./pages/Account";
import {NotificationContainer} from "react-notifications";

function App() {
    const { setUsername, setRole  } = useTokenStore();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios
                    .get("http://localhost:4000/token", {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})

                const { user, role } = response.data;
                setUsername(user);
                setRole(role);
            } catch (error) {
                //
            }
        }

        verifyToken();
     }, [setRole, setUsername]);

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
            <Route path="/account" element={<Account />} />
        </Routes>

        <NotificationContainer />
    </div>
  );
}

export default App;
