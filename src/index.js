import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Quiz from "./components/Quiz";
import { QuizProvider } from "./contexts/quiz";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);

root.render(
  <React.StrictMode>
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  </React.StrictMode>
);
