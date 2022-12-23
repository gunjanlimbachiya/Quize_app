import { HashRouter, Route, Routes } from "react-router-dom";
import Container from "./components/Container";
import ErrorPage from "./components/ErrorPage";
import LandingPage from "./components/LandingPage";
import QuizePage from "./components/QuizePage";
import AppContext from "./context/AppContext";

function App() {
  return (
    <AppContext>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route index element={<LandingPage />} />
            <Route path="/questions" element={<QuizePage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppContext>
  );
}

export default App;
