import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute, { AdminRoute } from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SetUpProfile from "./pages/SetUpProfile";
import Dashboard from "./pages/Dashboard";
import UniversityPrograms from "./pages/UniversityPrograms";
import ProgramDetails from "./pages/ProgramDetails";
import Careers from "./pages/Careers";
import Concours from "./pages/Concours";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected student routes */}
        <Route path="/setup-profile" element={<ProtectedRoute><SetUpProfile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/university-programs" element={<ProtectedRoute><UniversityPrograms /></ProtectedRoute>} />
        <Route path="/university-programs/:id" element={<ProtectedRoute><ProgramDetails /></ProtectedRoute>} />
        <Route path="/careers" element={<ProtectedRoute><Careers /></ProtectedRoute>} />
        <Route path="/concours" element={<ProtectedRoute><Concours /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Protected admin routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
