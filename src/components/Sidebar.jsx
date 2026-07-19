import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        ⚡ TestForge
        <span>AI-Powered QA</span>
      </div>

      <nav>
        <Link to="/dashboard" className="nav-item">Dashboard</Link>
        <Link to="/testcases" className="nav-item">Test Case Generator</Link>
      </nav>

    </div>
  );
}

export default Sidebar;