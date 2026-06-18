// Set Up Your Profile — 2-step onboarding after signup
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveProfile } from "../api/profile";
import { useAuth } from "../context/AuthContext";
import "./SetUpProfile.css";

const LEVELS = ["Secondary School", "High School", "Undergraduate", "Graduate"];
const STREAMS = ["Science", "Arts", "Commercial", "Technical"];
const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English Language", "History", "Economics", "Geography", "Further Mathematics", "Computer Science", "Accounting", "Government", "Literature"];
const FIELDS = ["Science", "Technology", "Arts", "Medicine", "Engineering", "Business", "Law", "Agriculture", "Health", "Finance"];
const LOCATIONS = ["Yaounde", "Douala", "Buea", "Ngaoundere", "Bamenda", "Dschang", "Maroua"];

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Chip = ({ label, selected, onClick }) => (
  <button
    type="button"
    className={`cp-sp-chip ${selected ? "selected" : ""}`}
    onClick={onClick}
  >
    <span className="cp-sp-chip-radio"><Check /></span>
    {label}
  </button>
);

const SetupProfile = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1
  const [level, setLevel] = useState("");
  const [stream, setStream] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [fields, setFields] = useState([]);

  // Step 2
  const [relocate, setRelocate] = useState("");
  const [locations, setLocations] = useState([]);
  const [careerGoals, setCareerGoals] = useState("");

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const handleContinue = () => setStep(2);

  const handleFinish = async () => {
    setLoading(true);
    setError("");
    try {
      await saveProfile({
        favoriteSubjects: subjects,
        preferredFields: fields,
        interests: fields,
        careerGoals: careerGoals,
        preferredCity: locations[0] || "",
        stream: stream,
      });
      loginUser(localStorage.getItem('token'), { ...user, profileCompleted: true });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => navigate("/dashboard");

  return (
    <div className="cp-sp-page">
      <div className="cp-sp-card">
        <div className="cp-sp-body">
          {/* Step indicator */}
          <div className="cp-sp-step-label">
            <span>Step {step} of 2</span>
            <span className="cp-sp-dots">
              <span className={`cp-sp-dot ${step >= 1 ? "active" : ""}`} />
              <span className={`cp-sp-dot ${step === 2 ? "active" : ""}`} />
            </span>
          </div>

          <h1 className="cp-sp-title">Set Up Your Profile</h1>

          {error && (
            <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
              {error}
            </div>
          )}

          {step === 1 ? (
            <>
              <p className="cp-sp-subtitle">
                Tell us a bit about yourself so we can tailor recommendations.
              </p>

              {/* Current Level */}
              <div className="cp-sp-group">
                <label className="cp-sp-group-label">Current Level</label>
                <select className="cp-sp-select" value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option value="">Select your current level</option>
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Stream */}
              <div className="cp-sp-group">
                <span className="cp-sp-group-label">Your Stream / Series</span>
                <div className="cp-sp-options">
                  {STREAMS.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      selected={stream === s}
                      onClick={() => setStream(s)}
                    />
                  ))}
                </div>
              </div>

              {/* Subjects */}
              <div className="cp-sp-group">
                <span className="cp-sp-group-label">Subjects</span>
                <div className="cp-sp-options">
                  {SUBJECTS.map((s) => (
                    <Chip key={s} label={s} selected={subjects.includes(s)} onClick={() => toggle(subjects, setSubjects, s)} />
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div className="cp-sp-group">
                <span className="cp-sp-group-label">Fields of Interest</span>
                <div className="cp-sp-options">
                  {FIELDS.map((f) => (
                    <Chip key={f} label={f} selected={fields.includes(f)} onClick={() => toggle(fields, setFields, f)} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="cp-sp-step2-header">
                <p className="cp-sp-subtitle">Tell us more so we can recommend better programs.</p>
              </div>

              {/* Relocate */}
              <div className="cp-sp-group">
                <span className="cp-sp-group-label">Willing to Relocate?</span>
                <div className="cp-sp-options">
                  {["Yes", "No"].map((opt) => (
                    <Chip key={opt} label={opt} selected={relocate === opt} onClick={() => setRelocate(opt)} />
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="cp-sp-group">
                <span className="cp-sp-group-label">Preferred Study Location</span>
                <div className="cp-sp-options">
                  {LOCATIONS.map((loc) => (
                    <Chip key={loc} label={loc} selected={locations.includes(loc)} onClick={() => toggle(locations, setLocations, loc)} />
                  ))}
                </div>
              </div>

              {/* Career Goals */}
              <div className="cp-sp-group">
                <span className="cp-sp-group-label">Career Goals (optional)</span>
                <textarea
                  style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, marginTop: 8, minHeight: 80 }}
                  placeholder="e.g. I want to become a software engineer..."
                  value={careerGoals}
                  onChange={(e) => setCareerGoals(e.target.value)}
                />
              </div>

              <p className="cp-sp-helper">
                All set! Click <b>Finish</b> to complete your profile setup.
              </p>

              <button type="button" className="cp-sp-primary" onClick={handleFinish} disabled={loading}>
                {loading ? "Saving..." : "Finish"}
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="cp-sp-footer">
          {step === 1 ? (
            <button type="button" className="cp-sp-footer-btn" onClick={handleContinue}>
              Continue
            </button>
          ) : (
            <button type="button" className="cp-sp-footer-btn" onClick={handleSkip}>
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupProfile;