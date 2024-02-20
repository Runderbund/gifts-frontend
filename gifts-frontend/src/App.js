// General Imports
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Page Imports
import ViewOtherPage from "./pages/ViewOtherPage";
import ViewSelfPage from "./pages/ViewSelfPage";
import MemberSelectPage from "./pages/MemberSelectPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/select" element={<MemberSelectPage />} />
          <Route path="/other" element={<ViewOtherPage />} />
          <Route path="/self" element={<ViewSelfPage />} />
          <Route path="/" element={<Navigate replace to="/select" />} /> {/* Redirects from / to /select */}
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
