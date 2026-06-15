import { useRef, useState, useEffect } from "react";
import { Camera, Save } from "lucide-react";
import DashSidebar from "../components/DashSidebar";
import DashTopbar from "../components/DashTopbar";
import { getMe, updateUserProfile } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";
import "./Profile.css";

const Profile = () => {
  const { user, loginUser } = useAuth();
  const [tab, setTab] = useState("personal");
  const fileRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Personal
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Academic
  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("Upper Sixth");
  const [stream, setStream] = useState("Science");
  const [subjects, setSubjects] = useState("");
  const [interest, setInterest] = useState("");

  // Settings
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  // Load user data from backend on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        const u = res.data.user;
        const nameParts = u.name?.split(" ") || [];
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(" ") || "");
        setEmail(u.email || "");
        setPhone(u.phone || "");
        setCity(u.city || "");
        setBio(u.bio || "");
        setDateOfBirth(u.dateOfBirth || "");
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const onAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await updateUserProfile({
        name: `${firstName} ${lastName}`.trim(),
        phone,
        city,
        bio,
        dateOfBirth,
      });
      // Update user in context with new name
      loginUser(localStorage.getItem("token"), {
        ...user,
        name: res.data.user.name,
      });
      setMessage("Profile saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  if (loading) return (
    <div className="cp-dash">
      <DashSidebar />
      <main className="cp-dash-main">
        <DashTopbar userName={user?.name} />
        <div style={{ padding: "2rem", color: "#5b6485" }}>Loading profile...</div>
      </main>
    </div>
  );

  return (
    <div className="cp-dash">
      <DashSidebar />
      <main className="cp-dash-main">
        <DashTopbar userName={firstName || user?.name} />

        <div className="cp-profile-header">
          <div>
            <h1>My Profile</h1>
            <p>Manage your personal information, academics and settings.</p>
          </div>
        </div>

        {message && (
          <div style={{
            background: message.includes("success") ? "#dcfce7" : "#fee2e2",
            color: message.includes("success") ? "#166534" : "#dc2626",
            padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 14
          }}>
            {message}
          </div>
        )}

        <div className="cp-profile-tabs">
          <button className={`cp-profile-tab ${tab === "personal" ? "is-active" : ""}`} onClick={() => setTab("personal")}>Personal Info</button>
          <button className={`cp-profile-tab ${tab === "academic" ? "is-active" : ""}`} onClick={() => setTab("academic")}>Academic Info</button>
          <button className={`cp-profile-tab ${tab === "settings" ? "is-active" : ""}`} onClick={() => setTab("settings")}>Settings</button>
        </div>

        {/* PERSONAL */}
        {tab === "personal" && (
          <div className="cp-profile-card">
            <div className="cp-profile-avatar-row">
              <div className="cp-profile-avatar">
                {avatar ? <img src={avatar} alt="avatar" /> : initials}
              </div>
              <div className="cp-profile-avatar-info">
                <h2>{firstName} {lastName}</h2>
                <p>{email}</p>
                <button className="cp-profile-upload" onClick={() => fileRef.current?.click()} type="button">
                  <Camera size={14} /> Change picture
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={onAvatar} style={{ display: "none" }} />
              </div>
            </div>

            <div className="cp-profile-grid">
              <div className="cp-profile-field">
                <label>First name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="cp-profile-field">
                <label>Last name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="cp-profile-field">
                <label>Email</label>
                <input type="email" value={email} disabled style={{ background: "#f1f5f9", color: "#94a3b8" }} />
              </div>
              <div className="cp-profile-field">
                <label>Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+237 6XX XXX XXX" />
              </div>
              <div className="cp-profile-field">
                <label>City</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Buea" />
              </div>
              <div className="cp-profile-field">
                <label>Date of birth</label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </div>
              <div className="cp-profile-field full">
                <label>About me</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." />
              </div>
            </div>

            <div className="cp-profile-actions">
              <button className="cp-profile-btn ghost" type="button" onClick={() => window.location.reload()}>Cancel</button>
              <button className="cp-profile-btn primary" onClick={handleSave} disabled={saving}>
                <Save size={14} style={{ marginRight: 6 }} />
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        )}

        {/* ACADEMIC */}
        {tab === "academic" && (
          <div className="cp-profile-card">
            <div className="cp-profile-grid">
              <div className="cp-profile-field">
                <label>Current school</label>
                <input value={school} onChange={(e) => setSchool(e.target.value)} placeholder="e.g. GBHS Molyko" />
              </div>
              <div className="cp-profile-field">
                <label>Education level</label>
                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option>Form 5</option>
                  <option>Lower Sixth</option>
                  <option>Upper Sixth</option>
                  <option>University</option>
                </select>
              </div>
              <div className="cp-profile-field">
                <label>Stream / Series</label>
                <select value={stream} onChange={(e) => setStream(e.target.value)}>
                  <option>Science</option>
                  <option>Arts</option>
                  <option>Commercial</option>
                  <option>Technical</option>
                </select>
              </div>
              <div className="cp-profile-field">
                <label>Career interest</label>
                <input value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="e.g. Computer Science" />
              </div>
              <div className="cp-profile-field full">
                <label>Subjects</label>
                <input value={subjects} onChange={(e) => setSubjects(e.target.value)} placeholder="e.g. Maths, Physics, Chemistry" />
              </div>
              <div className="cp-profile-field full">
                <label>Goals & aspirations</label>
                <textarea placeholder="Describe what you want to achieve..." />
              </div>
            </div>
            <div className="cp-profile-actions">
              <button className="cp-profile-btn ghost">Cancel</button>
              <button className="cp-profile-btn primary" onClick={handleSave} disabled={saving}>
                <Save size={14} style={{ marginRight: 6 }} />
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div className="cp-profile-card">
            <div className="cp-settings-row">
              <div className="cp-settings-row-info">
                <h3>Email notifications</h3>
                <p>Get email updates on new programs and concours.</p>
              </div>
              <button className={`cp-toggle ${emailNotif ? "on" : ""}`} onClick={() => setEmailNotif(!emailNotif)} />
            </div>
            <div className="cp-settings-row">
              <div className="cp-settings-row-info">
                <h3>Push notifications</h3>
                <p>Receive instant alerts in your browser.</p>
              </div>
              <button className={`cp-toggle ${pushNotif ? "on" : ""}`} onClick={() => setPushNotif(!pushNotif)} />
            </div>
            <div className="cp-settings-row">
              <div className="cp-settings-row-info">
                <h3>Dark mode</h3>
                <p>Switch the interface to a darker theme.</p>
              </div>
              <button className={`cp-toggle ${darkMode ? "on" : ""}`} onClick={() => setDarkMode(!darkMode)} />
            </div>
            <div className="cp-settings-row">
              <div className="cp-settings-row-info">
                <h3>Public profile</h3>
                <p>Allow other students to see your profile.</p>
              </div>
              <button className={`cp-toggle ${publicProfile ? "on" : ""}`} onClick={() => setPublicProfile(!publicProfile)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;