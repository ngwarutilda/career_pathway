import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo-white.png";
import { Home, GraduationCap, BookOpen, Award, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/university-programs", label: "University Programs", icon: GraduationCap },
  { to: "/careers", label: "Careers", icon: BookOpen },
  { to: "/concours", label: "Concours", icon: Award },
  { to: "/profile", label: "Profile", icon: User },
];

const DashSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="cp-dash-sidebar">
      {/* Logo */}
      <div className="cp-dash-sidebar-logo">
        <img src={logo} alt="Career Pathway" />
      </div>

      {/* Divider */}
      <div className="cp-dash-sidebar-divider" />

      {/* Nav */}
      <nav className="cp-dash-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `cp-dash-nav-item ${isActive ? "is-active" : ""}`
              }
            >
              <span className="cp-dash-ico"><Icon size={18} /></span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout pushed to bottom */}
      <div className="cp-dash-sidebar-bottom">
        <div className="cp-dash-sidebar-divider" />
        <button className="cp-dash-nav-item cp-dash-logout" onClick={handleLogout}>
          <span className="cp-dash-ico"><LogOut size={18} /></span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashSidebar;