import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Container from "@mui/material/Container";
import reportWebVitals from "./reportWebVitals";
import PruebaToggleButon from "./PruebaToggleButon";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Container fluid className="body">
      <PruebaToggleButon />
      <App />
    </Container>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
