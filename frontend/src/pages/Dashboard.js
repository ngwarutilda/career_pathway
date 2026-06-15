import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashTopbar from "../components/DashTopbar";
import { getRecommendations } from "../api/profile";
import { getRecommendedCareers } from "../api/careers";
import { useAuth } from "../context/AuthContext";
import ChatBot from "../components/ChatBot";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recommendations, setRecommendations] = useState([]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = user?.name || "Student";
  const firstName = userName.split(" ")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recRes, careerRes] = await Promise.all([
          getRecommendations(),
          getRecommendedCareers(),
        ]);
        setRecommendations(recRes.data.recommendations || []);
        setCareers(careerRes.data.careers?.slice(0, 3) || []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="cp-dash">
      <DashSidebar />

      <main className="cp-dash-main">
        <DashTopbar userName={userName} />

        {/* Welcome banner */}
        <div className="cp-dash-welcome">
          <div>
            <h1>Welcome back, {firstName}! 👋</h1>
            <p>Here are your personalized recommendations based on your profile.</p>
          </div>
          <span className="cp-dash-welcome-emoji">🎓</span>
        </div>

        {loading ? (
          <div className="cp-dash-loading">Loading your recommendations...</div>
        ) : (
          <div className="cp-dash-sections">

            {/* Recommended Programs */}
            <section className="cp-dash-panel">
              <div className="cp-dash-panel-header">
                <h2>Recommended Programs</h2>
                <button
                  className="cp-dash-panel-link"
                  onClick={() => navigate("/university-programs")}
                >
                  View all →
                </button>
              </div>

              {recommendations.length === 0 ? (
                <div className="cp-dash-empty">
                  No recommendations yet.{" "}
                  <button
                    className="cp-dash-empty-link"
                    onClick={() => navigate("/setup-profile")}
                  >
                    Update your profile
                  </button>{" "}
                  to get recommendations.
                </div>
              ) : (
                <div className="cp-dash-cards">
                  {recommendations.slice(0, 4).map((program) => (
                    <article key={program._id} className="cp-dash-card">
                      <span className={`cp-dash-badge ${
                        program.university?.type === "private"
                          ? "cp-dash-badge-private"
                          : "cp-dash-badge-public"
                      }`}>
                        {program.university?.type === "private" ? "Private" : "Public"}
                      </span>
                      <h3>{program.name}</h3>
                      <p>{program.university?.name}</p>
                      <div className="cp-dash-card-meta">
                        <span>📍 {program.university?.city}</span>
                        <span>·</span>
                        <span>⏱ {program.duration} yrs</span>
                      </div>
                      <div className="cp-dash-card-tags">
                        {program.requiredSubjects?.slice(0, 3).map((s) => (
                          <span key={s} className="cp-dash-card-tag">{s}</span>
                        ))}
                      </div>
                      <button
                        className="cp-dash-learn"
                        onClick={() => navigate(`/university-programs/${program._id}`)}
                      >
                        Learn More
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Suggested Careers */}
            <section className="cp-dash-panel cp-dash-careers">
              <div className="cp-dash-panel-header">
                <h2>Suggested Careers</h2>
                <button
                  className="cp-dash-panel-link"
                  onClick={() => navigate("/careers")}
                >
                  View all →
                </button>
              </div>

              {careers.length === 0 ? (
                <div className="cp-dash-empty">
                  Complete your profile to see career suggestions.
                </div>
              ) : (
                careers.map((career) => (
                  <article key={career._id} className="cp-dash-career-card">
                    <span className="cp-dash-career-field">{career.field}</span>
                    <h3>{career.title}</h3>
                    <p>{career.description}</p>
                    <div className="cp-dash-career-salary">
                      💰 {career.averageSalary}
                    </div>
                    <button
                      className="cp-dash-learn"
                      onClick={() => navigate("/careers")}
                    >
                      Learn More
                    </button>
                  </article>
                ))
              )}
            </section>

          </div>
        )}
      </main>
      <ChatBot />
    </div>
  );
};

export default Dashboard;