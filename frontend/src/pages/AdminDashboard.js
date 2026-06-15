import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllStudents, deleteStudent } from "../api/admin";
import { getAllPrograms, createProgram, deleteProgram } from "../api/programs";
import { getAllUniversities, createUniversity, deleteUniversity } from "../api/universities";
import { getAllCareers, createCareer, deleteCareer } from "../api/careers";
import { getAllConcours, createConcours, deleteConcours } from "../api/concours";
import "./Dashboard.css";

const TABS = ["Overview", "Programs", "Universities", "Careers", "Concours", "Students"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const [tab, setTab] = useState("Overview");
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [careers, setCareers] = useState([]);
  const [concours, setConcours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const showMsg = (msg) => { setMessage(msg); setTimeout(() => setMessage(""), 3000); };

  const fetchData = async () => {
    setLoading(true);
    console.log("Token being used:", localStorage.getItem('token'));
    console.log("Admin in storage:", localStorage.getItem('admin'));
    try {
      const [s, p, u, c, co] = await Promise.all([
        getAllStudents(),
        getAllPrograms(),
        getAllUniversities(),
        getAllCareers(),
        getAllConcours(),
      ]);
      setStudents(s.data.students || []);
      setPrograms(p.data.programs || []);
      setUniversities(u.data.universities || []);
      setCareers(c.data.careers || []);
      setConcours(co.data.concours || []);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      if (type === "program") await deleteProgram(id);
      if (type === "university") await deleteUniversity(id);
      if (type === "career") await deleteCareer(id);
      if (type === "concours") await deleteConcours(id);
      if (type === "student") await deleteStudent(id);
      showMsg("Deleted successfully!");
      fetchData();
    } catch (err) {
      showMsg("Delete failed. Please try again.");
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProgram = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        requiredSubjects: formData.requiredSubjects?.split(",").map(s => s.trim()) || [],
        preferredSubjects: formData.preferredSubjects?.split(",").map(s => s.trim()) || [],
        relatedCareers: formData.relatedCareers?.split(",").map(s => s.trim()) || [],
        relatedFields: formData.relatedFields?.split(",").map(s => s.trim()) || [],
        duration: Number(formData.duration) || 3,
      };
      await createProgram(payload);
      showMsg("Program added successfully!");
      setShowForm(false);
      setFormData({});
      fetchData();
    } catch (err) {
      showMsg(err.response?.data?.message || "Failed to add program.");
    }
  };

  const handleAddUniversity = async (e) => {
    e.preventDefault();
    try {
      await createUniversity(formData);
      showMsg("University added successfully!");
      setShowForm(false);
      setFormData({});
      fetchData();
    } catch (err) {
      showMsg(err.response?.data?.message || "Failed to add university.");
    }
  };

  const handleAddCareer = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        relatedSubjects: formData.relatedSubjects?.split(",").map(s => s.trim()) || [],
        relatedPrograms: formData.relatedPrograms?.split(",").map(s => s.trim()) || [],
        skills: formData.skills?.split(",").map(s => s.trim()) || [],
      };
      await createCareer(payload);
      showMsg("Career added successfully!");
      setShowForm(false);
      setFormData({});
      fetchData();
    } catch (err) {
      showMsg(err.response?.data?.message || "Failed to add career.");
    }
  };

  const handleAddConcours = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        requirements: formData.requirements?.split(",").map(s => s.trim()) || [],
        subjects: formData.subjects?.split(",").map(s => s.trim()) || [],
      };
      await createConcours(payload);
      showMsg("Concours added successfully!");
      setShowForm(false);
      setFormData({});
      fetchData();
    } catch (err) {
      showMsg(err.response?.data?.message || "Failed to add concours.");
    }
  };

  const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, marginTop: 4, boxSizing: "border-box" };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginTop: 12 };
  const btnPrimary = { background: "#5b8def", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600 };
  const btnDanger = { background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 13 };
  const btnSecondary = { background: "#f1f5f9", color: "#374151", border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 14 };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Admin Sidebar */}
      <aside style={{ width: 220, background: "#1e293b", color: "#fff", padding: "24px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 20px 24px", fontSize: 18, fontWeight: 700, borderBottom: "1px solid #334155" }}>
          Career Pathway<br />
          <span style={{ fontSize: 12, fontWeight: 400, color: "#94a3b8" }}>Admin Panel</span>
        </div>

        <nav style={{ flex: 1, padding: "16px 0" }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setShowForm(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "10px 20px", background: tab === t ? "#3b82f6" : "none",
                color: "#fff", border: "none", cursor: "pointer", fontSize: 14,
              }}
            >
              {t}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} style={{ margin: "16px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontSize: 14 }}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "32px" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b" }}>{tab}</h1>
          <p style={{ color: "#5b6485", fontSize: 14 }}>Welcome, {admin?.name}</p>
        </div>

        {message && (
          <div style={{ background: "#dcfce7", color: "#166534", padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
            {message}
          </div>
        )}

        {loading ? <div style={{ color: "#5b6485" }}>Loading...</div> : (
          <>
            {/* OVERVIEW */}
            {tab === "Overview" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
                {[
                  { label: "Students", count: students.length, color: "#dbeafe" },
                  { label: "Programs", count: programs.length, color: "#dcfce7" },
                  { label: "Universities", count: universities.length, color: "#fef3c7" },
                  { label: "Careers", count: careers.length, color: "#f3e8ff" },
                  { label: "Concours", count: concours.length, color: "#fee2e2" },
                ].map(item => (
                  <div key={item.label} style={{ background: item.color, borderRadius: 12, padding: "20px", textAlign: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#1e293b" }}>{item.count}</div>
                    <div style={{ fontSize: 14, color: "#475569" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* PROGRAMS */}
            {tab === "Programs" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: "#5b6485" }}>{programs.length} programs in database</span>
                  <button style={btnPrimary} onClick={() => { setShowForm(!showForm); setFormData({}); }}>
                    {showForm ? "Cancel" : "+ Add Program"}
                  </button>
                </div>

                {showForm && (
                  <form onSubmit={handleAddProgram} style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                    <h3 style={{ marginBottom: 16 }}>Add New Program</h3>
                    <label style={labelStyle}>Program Name *</label>
                    <input name="name" style={inputStyle} onChange={handleFormChange} required placeholder="e.g. Computer Science" />
                    <label style={labelStyle}>University ID * <span style={{ fontWeight: 400, color: "#94a3b8" }}>(copy from Universities tab)</span></label>
                    <input name="university" style={inputStyle} onChange={handleFormChange} required placeholder="MongoDB ObjectId" />
                    <label style={labelStyle}>Faculty</label>
                    <input name="faculty" style={inputStyle} onChange={handleFormChange} placeholder="e.g. Faculty of Engineering" />
                    <label style={labelStyle}>Degree</label>
                    <select name="degree" style={inputStyle} onChange={handleFormChange}>
                      <option value="BSc">BSc</option><option value="BA">BA</option>
                      <option value="BEng">BEng</option><option value="LLB">LLB</option>
                      <option value="MBBS">MBBS</option><option value="MSc">MSc</option>
                    </select>
                    <label style={labelStyle}>Duration (years)</label>
                    <input name="duration" type="number" style={inputStyle} onChange={handleFormChange} defaultValue={3} />
                    <label style={labelStyle}>Description</label>
                    <textarea name="description" style={{ ...inputStyle, minHeight: 80 }} onChange={handleFormChange} />
                    <label style={labelStyle}>Required Subjects <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
                    <input name="requiredSubjects" style={inputStyle} onChange={handleFormChange} placeholder="Mathematics, Physics" />
                    <label style={labelStyle}>Preferred Subjects <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
                    <input name="preferredSubjects" style={inputStyle} onChange={handleFormChange} placeholder="Further Mathematics, Chemistry" />
                    <label style={labelStyle}>Related Careers <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
                    <input name="relatedCareers" style={inputStyle} onChange={handleFormChange} placeholder="Software Engineer, Data Scientist" />
                    <label style={labelStyle}>Related Fields <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
                    <input name="relatedFields" style={inputStyle} onChange={handleFormChange} placeholder="Technology, Engineering" />
                    <label style={labelStyle}>Admission Requirements</label>
                    <textarea name="admissionRequirements" style={{ ...inputStyle, minHeight: 60 }} onChange={handleFormChange} />
                    <label style={labelStyle}>Tuition Fee</label>
                    <input name="tuitionFee" style={inputStyle} onChange={handleFormChange} placeholder="e.g. 50,000 - 80,000 XAF per year" />
                    <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                      <button type="submit" style={btnPrimary}>Save Program</button>
                      <button type="button" style={btnSecondary} onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        {["Program", "University", "Degree", "Actions"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, color: "#475569", fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {programs.map(p => (
                        <tr key={p._id} style={{ borderTop: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px 16px", fontSize: 14 }}>{p.name}</td>
                          <td style={{ padding: "12px 16px", fontSize: 14, color: "#5b6485" }}>{p.university?.name}</td>
                          <td style={{ padding: "12px 16px", fontSize: 14 }}>{p.degree}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <button style={btnDanger} onClick={() => handleDelete("program", p._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* UNIVERSITIES */}
            {tab === "Universities" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: "#5b6485" }}>{universities.length} universities in database</span>
                  <button style={btnPrimary} onClick={() => { setShowForm(!showForm); setFormData({}); }}>
                    {showForm ? "Cancel" : "+ Add University"}
                  </button>
                </div>

                {showForm && (
                  <form onSubmit={handleAddUniversity} style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                    <h3 style={{ marginBottom: 16 }}>Add New University</h3>
                    <label style={labelStyle}>University Name *</label>
                    <input name="name" style={inputStyle} onChange={handleFormChange} required placeholder="e.g. University of Buea" />
                    <label style={labelStyle}>Abbreviation</label>
                    <input name="abbreviation" style={inputStyle} onChange={handleFormChange} placeholder="e.g. UB" />
                    <label style={labelStyle}>City *</label>
                    <input name="city" style={inputStyle} onChange={handleFormChange} required placeholder="e.g. Buea" />
                    <label style={labelStyle}>Region</label>
                    <input name="region" style={inputStyle} onChange={handleFormChange} placeholder="e.g. South West" />
                    <label style={labelStyle}>Type</label>
                    <select name="type" style={inputStyle} onChange={handleFormChange}>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                    <label style={labelStyle}>Website</label>
                    <input name="website" style={inputStyle} onChange={handleFormChange} placeholder="https://..." />
                    <label style={labelStyle}>Description</label>
                    <textarea name="description" style={{ ...inputStyle, minHeight: 80 }} onChange={handleFormChange} />
                    <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                      <button type="submit" style={btnPrimary}>Save University</button>
                      <button type="button" style={btnSecondary} onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        {["Name", "City", "Type", "ID", "Actions"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, color: "#475569", fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {universities.map(u => (
                        <tr key={u._id} style={{ borderTop: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px 16px", fontSize: 14 }}>{u.name}</td>
                          <td style={{ padding: "12px 16px", fontSize: 14, color: "#5b6485" }}>{u.city}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: u.type === "private" ? "#fef3c7" : "#dbeafe", color: u.type === "private" ? "#92400e" : "#1e40af" }}>
                              {u.type}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>{u._id}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <button style={btnDanger} onClick={() => handleDelete("university", u._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CAREERS */}
            {tab === "Careers" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: "#5b6485" }}>{careers.length} careers in database</span>
                  <button style={btnPrimary} onClick={() => { setShowForm(!showForm); setFormData({}); }}>
                    {showForm ? "Cancel" : "+ Add Career"}
                  </button>
                </div>

                {showForm && (
                  <form onSubmit={handleAddCareer} style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                    <h3 style={{ marginBottom: 16 }}>Add New Career</h3>
                    <label style={labelStyle}>Career Title *</label>
                    <input name="title" style={inputStyle} onChange={handleFormChange} required placeholder="e.g. Software Engineer" />
                    <label style={labelStyle}>Field *</label>
                    <select name="field" style={inputStyle} onChange={handleFormChange} required>
                      <option value="">Select field</option>
                      {["Technology","Medicine","Engineering","Law","Business","Science","Agriculture","Health","Finance","Education"].map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <label style={labelStyle}>Description *</label>
                    <textarea name="description" style={{ ...inputStyle, minHeight: 80 }} onChange={handleFormChange} required />
                    <label style={labelStyle}>Related Subjects <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
                    <input name="relatedSubjects" style={inputStyle} onChange={handleFormChange} placeholder="Mathematics, Physics" />
                    <label style={labelStyle}>Related Programs <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
                    <input name="relatedPrograms" style={inputStyle} onChange={handleFormChange} placeholder="Computer Science, Engineering" />
                    <label style={labelStyle}>Job Prospects in Cameroon</label>
                    <textarea name="jobProspects" style={{ ...inputStyle, minHeight: 60 }} onChange={handleFormChange} />
                    <label style={labelStyle}>Average Salary</label>
                    <input name="averageSalary" style={inputStyle} onChange={handleFormChange} placeholder="e.g. 150,000 - 300,000 XAF/month" />
                    <label style={labelStyle}>Skills <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
                    <input name="skills" style={inputStyle} onChange={handleFormChange} placeholder="Programming, Problem Solving" />
                    <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                      <button type="submit" style={btnPrimary}>Save Career</button>
                      <button type="button" style={btnSecondary} onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        {["Career", "Field", "Salary", "Actions"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, color: "#475569", fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {careers.map(c => (
                        <tr key={c._id} style={{ borderTop: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px 16px", fontSize: 14 }}>{c.title}</td>
                          <td style={{ padding: "12px 16px", fontSize: 14, color: "#5b6485" }}>{c.field}</td>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: "#5b6485" }}>{c.averageSalary || "—"}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <button style={btnDanger} onClick={() => handleDelete("career", c._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CONCOURS */}
            {tab === "Concours" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: "#5b6485" }}>{concours.length} concours in database</span>
                  <button style={btnPrimary} onClick={() => { setShowForm(!showForm); setFormData({}); }}>
                    {showForm ? "Cancel" : "+ Add Concours"}
                  </button>
                </div>

                {showForm && (
                  <form onSubmit={handleAddConcours} style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                    <h3 style={{ marginBottom: 16 }}>Add New Concours</h3>
                    <label style={labelStyle}>Concours Name *</label>
                    <input name="name" style={inputStyle} onChange={handleFormChange} required placeholder="e.g. Concours ENAM" />
                    <label style={labelStyle}>School/Institution *</label>
                    <input name="school" style={inputStyle} onChange={handleFormChange} required placeholder="e.g. ENAM Yaoundé" />
                    <label style={labelStyle}>Category *</label>
                    <select name="category" style={inputStyle} onChange={handleFormChange} required>
                      <option value="">Select category</option>
                      {["Government","Military & Police","Engineering","Medicine","Education","Private"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <label style={labelStyle}>Description</label>
                    <textarea name="description" style={{ ...inputStyle, minHeight: 80 }} onChange={handleFormChange} />
                    <label style={labelStyle}>Requirements <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
                    <input name="requirements" style={inputStyle} onChange={handleFormChange} placeholder="GCE A-Level, Cameroonian nationality" />
                    <label style={labelStyle}>Required Subjects <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
                    <input name="subjects" style={inputStyle} onChange={handleFormChange} placeholder="Mathematics, Physics" />
                    <label style={labelStyle}>Application Deadline</label>
                    <input name="applicationDeadline" type="date" style={inputStyle} onChange={handleFormChange} />
                    <label style={labelStyle}>Exam Date</label>
                    <input name="examDate" type="date" style={inputStyle} onChange={handleFormChange} />
                    <label style={labelStyle}>Location</label>
                    <input name="location" style={inputStyle} onChange={handleFormChange} placeholder="e.g. Yaoundé, Douala, Buea" />
                    <label style={labelStyle}>Available Slots</label>
                    <input name="availableSlots" type="number" style={inputStyle} onChange={handleFormChange} />
                    <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                      <button type="submit" style={btnPrimary}>Save Concours</button>
                      <button type="button" style={btnSecondary} onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        {["Name", "School", "Category", "Exam Date", "Actions"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, color: "#475569", fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {concours.map(c => (
                        <tr key={c._id} style={{ borderTop: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px 16px", fontSize: 14 }}>{c.name}</td>
                          <td style={{ padding: "12px 16px", fontSize: 14, color: "#5b6485" }}>{c.school}</td>
                          <td style={{ padding: "12px 16px", fontSize: 13 }}>{c.category}</td>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: "#5b6485" }}>{c.examDate ? new Date(c.examDate).toLocaleDateString() : "TBA"}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <button style={btnDanger} onClick={() => handleDelete("concours", c._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* STUDENTS */}
            {tab === "Students" && (
              <div>
                <div style={{ marginBottom: 16, color: "#5b6485" }}>{students.length} registered students</div>
                <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        {["Name", "Email", "Profile Status", "Joined", "Actions"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, color: "#475569", fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(s => (
                        <tr key={s._id} style={{ borderTop: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px 16px", fontSize: 14 }}>{s.name}</td>
                          <td style={{ padding: "12px 16px", fontSize: 14, color: "#5b6485" }}>{s.email}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 20, background: s.profileCompleted ? "#dcfce7" : "#fef3c7", color: s.profileCompleted ? "#166534" : "#92400e" }}>
                              {s.profileCompleted ? "Complete" : "Incomplete"}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 13, color: "#5b6485" }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <button style={btnDanger} onClick={() => handleDelete("student", s._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
