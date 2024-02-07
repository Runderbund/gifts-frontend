import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// Context Import
import { MemberProvider } from './context/MemberContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MemberProvider>
        <App />
      </MemberProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
