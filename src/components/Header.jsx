import { Bell, User } from "lucide-react";

function Header() {
  return (
    <div className="header">

      <div>
        <h2>AI QA Platform</h2>
        <span>Quality Assurance Automation Analytics</span>
      </div>

      <div className="header-icons">
        <Bell size={20} />
        <User size={20} />
      </div>

    </div>
  );
}

export default Header;