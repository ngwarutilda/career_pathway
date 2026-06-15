import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, GraduationCap, BookOpen, ChevronRight } from "lucide-react";
import DashSidebar from "../components/DashSidebar";
import DashTopbar from "../components/DashTopbar";
import { getAllPrograms } from "../api/programs";
import { getRecommendations } from "../api/profile";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";
import "./UniversityPrograms.css";
import ChatBot from "../components/ChatBot";

const UniversityPrograms = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchType, setSearchType] = useState("");

  const grouped = programs.reduce((acc, program) => {
    const uniName = program.university?.name || "Unknown";
    if (!acc[uniName]) {
      acc[uniName] = {
        name: uniName,
        city: program.university?.city || "",
        type: program.university?.type || "public",
        programs: [],
      };
    }
    acc[uniName].programs.push(program);
    return acc;
  }, {});

  const fetchRecommended = async () => {
    setLoading(true);
    try {
      const res = await getRecommendations();
      setPrograms(res.data.recommendations || []);
    } catch (err) {
      console.error("Recommendations fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPrograms = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (searchField) filters.field = searchField;
      const res = await getAllPrograms(filters);
      let data = res.data.programs || [];
      if (searchCity) data = data.filter(p => p.university?.city === searchCity);
      if (searchType) data = data.filter(p => p.university?.type === searchType);
      setPrograms(data);
    } catch (err) {
      console.error("Programs fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecommended(); }, []);

  const handleShowAll = () => { setShowAll(true); fetchAllPrograms(); };
  const handleShowRecommended = () => { setShowAll(false); fetchRecommended(); };

  return (
    <div className="cp-dash">
      <DashSidebar />

      <main className="cp-dash-main">
        <DashTopbar userName={user?.name} />

        <div className="cp-up-header">
          <h1>University Programs</h1>
          <p>
            {showAll
              ? "Explore all programs across universities in Cameroon."
              : "Programs recommended for you based on your profile."}
          </p>
        </div>

        {/* Toggle */}
        <div className="cp-up-toggle">
          <button
            className={`cp-up-toggle-btn ${!showAll ? "active" : ""}`}
            onClick={handleShowRecommended}
          >
            ⭐ Recommended For Me
          </button>
          <button
            className={`cp-up-toggle-btn ${showAll ? "active" : ""}`}
            onClick={handleShowAll}
          >
            🎓 Show All Programs
          </button>
        </div>

        {/* Filters */}
        {showAll && (
          <div className="cp-up-filters">
            <div className="cp-up-select">
              <MapPin size={16} color="#5b8def" />
              <select value={searchCity} onChange={(e) => setSearchCity(e.target.value)}>
                <option value="">All Cities</option>
                <option>Buea</option>
                <option>Bamenda</option>
                <option>Yaoundé</option>
                <option>Douala</option>
                <option>Dschang</option>
                <option>Ngaoundéré</option>
              </select>
            </div>
            <div className="cp-up-select">
              <GraduationCap size={16} color="#5b8def" />
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="">Public & Private</option>
                <option value="public">Public Universities</option>
                <option value="private">Private Universities</option>
              </select>
            </div>
            <div className="cp-up-select">
              <BookOpen size={16} color="#5b8def" />
              <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                <option value="">All Fields</option>
                <option value="Technology">Technology</option>
                <option value="Medicine">Medicine</option>
                <option value="Engineering">Engineering</option>
                <option value="Law">Law</option>
                <option value="Business">Business</option>
                <option value="Science">Science</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Education">Education</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
            <button className="cp-up-search-btn" onClick={fetchAllPrograms}>
              Search
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="cp-up-empty">Loading programs...</div>
        ) : programs.length === 0 ? (
          <div className="cp-up-empty">
            {showAll
              ? "No programs found. Try different filters."
              : "No recommendations yet. Complete your profile to get recommendations."}
          </div>
        ) : (
          Object.values(grouped).map((uni) => (
            <section key={uni.name} className="cp-up-uni">
              <div className="cp-up-uni-title">
                <h2>{uni.name}</h2>
                <div className="cp-up-uni-meta">
                  <span>📍 {uni.city}</span>
                  <span className={`cp-up-badge ${
                    uni.type === "private" ? "cp-up-badge-private" : "cp-up-badge-public"
                  }`}>
                    {uni.type === "private" ? "Private" : "Public"}
                  </span>
                </div>
              </div>

              {uni.programs.map((p) => (
                <div key={p._id} className="cp-up-row">
                  <div className="cp-up-cell">{p.name}</div>
                  <div className="cp-up-cell-subjects">
                    {p.requiredSubjects?.slice(0, 3).join(", ")}
                  </div>
                  <div className="cp-up-cell-right">
                    <button
                      className="cp-up-view"
                      onClick={() => navigate(`/university-programs/${p._id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="cp-up-arrow"
                      aria-label="Open"
                      onClick={() => navigate(`/university-programs/${p._id}`)}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          ))
        )}
      </main>
      <ChatBot />
    </div>
  );
};

export default UniversityPrograms;