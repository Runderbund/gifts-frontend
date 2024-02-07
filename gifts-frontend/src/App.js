// General Imports
import { Routes, Route } from "react-router-dom";
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
          <Route path="/" element={<MemberSelectPage />} />
          <Route path="/other" element={<ViewOtherPage />} />
          <Route path="/self" element={<ViewSelfPage />} />
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
