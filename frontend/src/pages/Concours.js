import { useState, useEffect, useCallback } from "react";
import DashSidebar from "../components/DashSidebar";
import DashTopbar from "../components/DashTopbar";
import { getAllConcours } from "../api/concours";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";
import "./Concours.css";
import ChatBot from "../components/ChatBot";

const CATEGORIES = ["Government", "Military & Police", "Engineering", "Medicine", "Education", "Private"];

const CATEGORY_EMOJI = {
  "Government": "🏛️",
  "Military & Police": "🪖",
  "Engineering": "⚙️",
  "Medicine": "🏥",
  "Education": "📚",
  "Private": "🏢",
};

const Concours = () => {
  const { user } = useAuth();

  const [concours, setConcours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchConcours = useCallback(async () => {
    setLoading(true);
    try {
      const filters = {};
      if (selectedCategory) filters.category = selectedCategory;
      const res = await getAllConcours(filters);
      let data = res.data.concours || [];
      if (searchText) {
        data = data.filter(c =>
          c.name.toLowerCase().includes(searchText.toLowerCase()) ||
          c.school.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      setConcours(data);
    } catch (err) {
      console.error("Concours fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchText]);

  useEffect(() => { fetchConcours(); }, [fetchConcours]);

  const grouped = concours.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const formatDate = (date) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  return (
    <div className="cp-dash">
      <DashSidebar />

      <main className="cp-dash-main">
        <DashTopbar userName={user?.name} />

        <div className="cp-co-header">
          <h1>Concours & Opportunities</h1>
          <p>Stay updated on upcoming competitive entrance examinations and their requirements.</p>
        </div>

        {/* Filters */}
        <div className="cp-co-filters">
          <div className="cp-co-input">
            <input
              type="text"
              placeholder="Search by exam name or school..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchConcours()}
            />
          </div>
          <div className="cp-co-select">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button className="cp-co-search-btn" onClick={fetchConcours}>
            Search
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="cp-co-empty">Loading concours...</div>
        ) : concours.length === 0 ? (
          <div className="cp-co-empty">No concours found. Try different filters.</div>
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="cp-co-category">
              <div className="cp-co-category-title">
                <div className="cp-co-category-icon">
                  {CATEGORY_EMOJI[category] || "📋"}
                </div>
                <h2>{category}</h2>
                <span className="cp-co-category-count">
                  {items.length} {items.length === 1 ? "exam" : "exams"}
                </span>
              </div>

              <div className="cp-co-grid">
                {items.map((e) => (
                  <article key={e._id} className="cp-co-card">
                    <div className="cp-co-card-header">
                      <div className="cp-co-card-icon">
                        {CATEGORY_EMOJI[e.category] || "📋"}
                      </div>
                      <div className="cp-co-card-header-text">
                        <h3>{e.name}</h3>
                        <div className="cp-co-school">{e.school}</div>
                      </div>
                    </div>

                    <div className="cp-co-dates">
                      <div className="cp-co-date-item cp-co-date-exam">
                        📅 Exam: {formatDate(e.examDate)}
                      </div>
                      <div className="cp-co-date-item cp-co-date-deadline">
                        ⏰ Deadline: {formatDate(e.applicationDeadline)}
                      </div>
                      {e.location && (
                        <div className="cp-co-date-item cp-co-date-location">
                          📍 {e.location}
                        </div>
                      )}
                    </div>

                    {e.availableSlots && (
                      <div className="cp-co-slots">
                        👥 {e.availableSlots} slots available
                      </div>
                    )}

                    {e.requirements?.length > 0 && (
                      <div>
                        <span className="cp-co-req-title">Requirements</span>
                        <ul className="cp-co-req-list">
                          {e.requirements.slice(0, 3).map((r, j) => (
                            <li key={j}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
      <ChatBot />
    </div>
  );
};

export default Concours;