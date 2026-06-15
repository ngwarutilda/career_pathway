import { Search } from "lucide-react";

const DashTopbar = ({ userName = "Rutilda" }) => (
  <div className="cp-dash-topbar">
    <div className="cp-dash-search">
      <Search size={18} color="#5b6485" />
      <input type="text" placeholder="Search" />
    </div>

    <div className="cp-dash-user">
      <span className="cp-dash-avatar" />
      <span className="cp-dash-user-name">{userName}</span>
    </div>
  </div>
);

export default DashTopbar;
