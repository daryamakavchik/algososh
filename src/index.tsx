import React from "react";
import "./index.css";
import "./fonts/fonts.css";
import "./components/ui/common.css";
import "./components/ui/box.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
reportWebVitals();
