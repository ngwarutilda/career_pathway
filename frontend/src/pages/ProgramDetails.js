import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashTopbar from "../components/DashTopbar";
import { getProgramById } from "../api/programs";
import { useAuth } from "../context/AuthContext";
import ChatBot from "../components/ChatBot";
import "./Dashboard.css";
import "./ProgramDetails.css";

const ProgramDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await getProgramById(id);
        setProgram(res.data.program);
      } catch (err) {
        setError("Program not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  if (loading) return (
    <div className="cp-dash">
      <DashSidebar />
      <main className="cp-dash-main">
        <DashTopbar userName={user?.name} />
        <div style={{ padding: "2rem", textAlign: "center", color: "#5b6485" }}>
          Loading program details...
        </div>
      </main>
    </div>
  );

  if (error || !program) return (
    <div className="cp-dash">
      <DashSidebar />
      <main className="cp-dash-main">
        <DashTopbar userName={user?.name} />
        <div style={{ padding: "2rem", textAlign: "center", color: "#dc2626" }}>
          {error || "Program not found."}
          <br />
          <button
            onClick={() => navigate("/university-programs")}
            style={{ marginTop: 12, color: "#5b8def", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            ← Back to Programs
          </button>
        </div>
      </main>
    </div>
  );

  return (
    <div className="cp-dash">
      <DashSidebar />

      <main className="cp-dash-main">
        <DashTopbar userName={user?.name} />

        {/* Back button */}
        <button className="cp-pd-back" onClick={() => navigate("/university-programs")}>
          ← Back to Programs
        </button>

        {/* Hero banner */}
        <div className="cp-pd-hero">
          <div className="cp-pd-hero-left">
            <h1>{program.name}</h1>
            <div className="cp-pd-hero-uni">
              🏛 {program.university?.name} &nbsp;·&nbsp; 📍 {program.university?.city}, Cameroon
            </div>
            <div className="cp-pd-hero-badges">
              <span className={`cp-pd-hero-badge ${
                program.university?.type === "private" ? "cp-pd-hero-badge-orange" : ""
              }`}>
                {program.university?.type === "private" ? "Private" : "Public"}
              </span>
              {program.faculty && (
                <span className="cp-pd-hero-badge">{program.faculty}</span>
              )}
              <span className="cp-pd-hero-badge">🎓 {program.degree}</span>
              <span className="cp-pd-hero-badge">⏱ {program.duration} years</span>
              {program.tuitionFee && (
                <span className="cp-pd-hero-badge cp-pd-hero-badge-orange">
                  💰 {program.tuitionFee}
                </span>
              )}
            </div>
          </div>
          <div className="cp-pd-hero-icon">🎓</div>
        </div>

        {/* Description */}
        {program.description && (
          <div className="cp-pd-desc">
            <h2>About this Program</h2>
            <p>{program.description}</p>
          </div>
        )}

        {/* Requirements grid */}
        <div className="cp-pd-grid">

          {/* Subjects */}
          <div className="cp-pd-card">
            <div className="cp-pd-card-title">
              <div className="cp-pd-card-icon">📚</div>
              Subject Requirements
            </div>

            {program.requiredSubjects?.length > 0 && (
              <div className="cp-pd-sub-section">
                <div className="cp-pd-sub-label">Required Subjects</div>
                <div className="cp-pd-tags">
                  {program.requiredSubjects.map((s) => (
                    <span key={s} className="cp-pd-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {program.preferredSubjects?.length > 0 && (
              <div className="cp-pd-sub-section">
                <div className="cp-pd-sub-label">Recommended Subjects</div>
                <div className="cp-pd-tags">
                  {program.preferredSubjects.map((s) => (
                    <span key={s} className="cp-pd-tag cp-pd-tag-orange">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admission */}
          <div className="cp-pd-card">
            <div className="cp-pd-card-title">
              <div className="cp-pd-card-icon cp-pd-card-icon-orange">✅</div>
              Admission Requirements
            </div>
            <p className="cp-pd-admission-text">
              {program.admissionRequirements || "Contact the university for admission details."}
            </p>
          </div>

        </div>

        {/* Related Careers */}
        {program.relatedCareers?.length > 0 && (
          <div className="cp-pd-careers-section">
            <div className="cp-pd-careers-title">
              <div className="cp-pd-card-icon">💼</div>
              Related Careers
            </div>
            <div className="cp-pd-careers-grid">
              {program.relatedCareers.map((c) => (
                <div key={c} className="cp-pd-career-chip">{c}</div>
              ))}
            </div>
          </div>
        )}

      </main>
      <ChatBot />
    </div>
  );
};

export default ProgramDetails;