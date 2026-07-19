import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TestCaseGenerator from "./pages/TestCaseGenerator";
import "./dashboard.css";
import ScreenshotAI from "./pages/ScreenshotAI";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/testcases">Test Case Generator</Link>
        <Link to="/screenshot-ai">Screenshot AI</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testcases" element={<TestCaseGenerator />} />
        <Route path="/screenshot-ai" element={<ScreenshotAI />} />
      </Routes>
    </Router>
  );
}

export default App;
