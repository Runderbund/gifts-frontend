// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Page Imports
import ViewOtherPage from "./pages/ViewOtherPage";
import ViewSelfPage from "./pages/ViewSelfPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";

// Context Imports
import { MemberProvider } from './context/MemberContext'; 

// Util Imports
// import PrivateRoute from "./utils/PrivateRoute";
// Add later, once I understand chain better

function App() {
  return (
    
      <div>
      <MemberProvider>
      <Navbar />
      <div>
        <Routes>
          <Route path="/other" element={<ViewOtherPage />} />
          <Route path="/self" element={<ViewSelfPage />} />
        </Routes>
      </div>
      </MemberProvider>
    </div>
    
  );
}

export default App;
