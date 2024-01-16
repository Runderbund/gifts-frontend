// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Page Imports
import ViewAllPage from "./pages/ViewAllPage";
import ViewOtherPage from "./pages/ViewOtherPage";
import ViewSelfPage from "./pages/ViewSelfPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";

// Context Imports
import { ViewProvider } from './ViewContext'; 

// Util Imports
// import PrivateRoute from "./utils/PrivateRoute";
// Add later, once I understand chain better

function App() {
  return (
    <ViewProvider>
      <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<ViewAllPage />} />
          <Route path="/viewother" element={<ViewOtherPage />} />
          <Route path="/viewself" element={<ViewSelfPage />} />
        </Routes>
      </div>
    </div>
    </ViewProvider>
  );
}

export default App;
