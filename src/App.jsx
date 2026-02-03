import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TestCaseGenerator from "./pages/TestCaseGenerator";
import "./dashboard.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/testcases">Test Case Generator</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testcases" element={<TestCaseGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
