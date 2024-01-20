import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MemberProvider } from './context/MemberContext'; 
import { BrowserRouter as Router } from "react-router-dom";

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
