// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Page Imports
import HomePage from "./pages/HomePage/HomePage";

// Util Imports
// import PrivateRoute from "./utils/PrivateRoute";
// Add later, once I understand chain better

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
    </div>
  );
}

export default App;
