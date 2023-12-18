// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Page Imports
import HomePage from "./pages/HomePage";
import GiftListPage from "./pages/GiftListPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";


// Util Imports
// import PrivateRoute from "./utils/PrivateRoute";
// Add later, once I understand chain better

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<GiftListPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
