import { useState, useEffect } from "react";
import { GraduationCap, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashTopbar from "../components/DashTopbar";
import { getAllCareers, getRecommendedCareers } from "../api/careers";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";
import "./Careers.css";
import ChatBot from "../components/ChatBot";

const FIELDS = ["Technology", "Medicine", "Engineering", "Law", "Business", "Science", "Agriculture", "Health", "Finance"];

const Careers = () => {
  const { user } = useAuth();

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showingRecommended, setShowingRecommended] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await getRecommendedCareers();
        const data = res.data.careers || [];
        if (data.length === 0) {
          const allRes = await getAllCareers();
          setCareers(allRes.data.careers || []);
          setShowingRecommended(false);
        } else {
          setCareers(data);
        }
      } catch (err) {
        console.error("Careers fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommended();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setShowingRecommended(false);
    try {
      const filters = {};
      if (selectedField) filters.field = selectedField;
      if (searchText) filters.search = searchText;
      const res = await getAllCareers(filters);
      setCareers(res.data.careers || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setSelectedField("");
    setSearchText("");
    setShowingRecommended(true);
    try {
      const res = await getRecommendedCareers();
      const data = res.data.careers || [];
      if (data.length === 0) {
        const allRes = await getAllCareers();
        setCareers(allRes.data.careers || []);
        setShowingRecommended(false);
      } else {
        setCareers(data);
      }
    } catch (err) {
      console.error("Reset error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cp-dash">
      <DashSidebar />

      <main className="cp-dash-main">
        <DashTopbar userName={user?.name} />

        <div className="cp-cr-header">
          <h1>Careers</h1>
          <p>
            {showingRecommended
              ? "Careers recommended based on your profile interests."
              : "Explore all available careers."}
          </p>
        </div>

        {/* Filters */}
        <div className="cp-cr-filters">
          <div className="cp-cr-select">
            <GraduationCap size={16} color="#5b8def" />
            <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
              <option value="">All Fields</option>
              {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="cp-cr-select">
            <BookOpen size={16} color="#5b8def" />
            <input
              type="text"
              placeholder="Search career..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <button className="cp-cr-search-btn" onClick={handleSearch}>
            Search
          </button>

          {!showingRecommended && (
            <button className="cp-cr-reset-btn" onClick={handleReset}>
              ⭐ My Recommendations
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="cp-cr-empty">Loading careers...</div>
        ) : careers.length === 0 ? (
          <div className="cp-cr-empty">No careers found. Try different filters.</div>
        ) : (
          <div className="cp-cr-grid">
            {careers.map((c) => (
              <article key={c._id} className="cp-cr-card">

                <div className="cp-cr-card-top">
                  <div className="cp-cr-card-icon">💼</div>
                  <div className="cp-cr-card-top-text">
                    <h3>{c.title}</h3>
                    {c.field && (
                      <span className="cp-cr-field-badge">{c.field}</span>
                    )}
                  </div>
                </div>

                <p className="cp-cr-desc">{c.description}</p>

                <div className="cp-cr-meta">
                  {c.averageSalary && (
                    <div className="cp-cr-meta-item">
                      💰 <span>{c.averageSalary}</span>
                    </div>
                  )}
                  {c.jobProspects && (
                    <div className="cp-cr-meta-item">
                      📈 <span>{c.jobProspects}</span>
                    </div>
                  )}
                </div>

                {c.relatedPrograms?.length > 0 && (
                  <div className="cp-cr-programs">
                    {c.relatedPrograms.slice(0, 3).map((p) => (
                      <span key={p} className="cp-cr-program-tag">{p}</span>
                    ))}
                  </div>
                )}

                <div className="cp-cr-card-footer">
                  <Link to="/university-programs" className="cp-cr-related">
                    View Related Programs →
                  </Link>
                </div>

              </article>
            ))}
          </div>
        )}
      </main>
      <ChatBot />
    </div>
  );
};

export default Careers;