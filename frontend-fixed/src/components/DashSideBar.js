import { NavLink, useNavigate } from "react-router-dom";
import { Home, GraduationCap, BookOpen, Award, User, LogOut } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/university-programs", label: "University Programs", icon: GraduationCap },
  { to: "/careers", label: "Careers", icon: BookOpen },
  { to: "/concours", label: "Concours", icon: Award },
  { to: "/profile", label: "Profile", icon: User },
];

const DashSidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="cp-dash-sidebar">
      <div className="cp-dash-brand">Career Pathway</div>
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
        <button className="cp-dash-nav-item" onClick={() => navigate("/login")}>
          <span className="cp-dash-ico"><LogOut size={18} /></span>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default DashSidebar;
