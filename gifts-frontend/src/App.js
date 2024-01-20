// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Page Imports
import ViewOtherPage from "./pages/ViewOtherPage";
import ViewSelfPage from "./pages/ViewSelfPage";
import MemberSelectPage from "./pages/MemberSelectPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";

// Context Imports

// Util Imports
// import PrivateRoute from "./utils/PrivateRoute";
// Add later, once I understand chain better

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/select" element={<MemberSelectPage />} />
          <Route path="/other" element={<ViewOtherPage />} />
          <Route path="/self" element={<ViewSelfPage />} />
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
