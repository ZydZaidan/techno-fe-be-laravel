import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import VerifikatorLayout from "./layouts/VerifikatorLayout";

// Routes Guard
import ProtectedRoute from "./routes/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Public Pages
import Home from "./pages/public/Home";
import Profil from "./pages/public/Profil";
import Contact from "./pages/public/Contact";
import Inkubasi from "./pages/public/Inkubasi";
import Inovasi from "./pages/public/Inovasi";
import HKI from "./pages/public/HKI";
import Publikasi from "./pages/public/Publikasi";

// Admin Pages
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import ManajemenUser from "./pages/dashboard/admin/ManajemenUser";
import KelolaBerita from "./pages/dashboard/admin/KelolaBerita";
import AuditLog from "./pages/dashboard/admin/AuditLog";

// User Pages
import UserDashboard from "./pages/dashboard/user/UserDashboard";
import FormInkubasi from "./pages/dashboard/user/FormInkubasi";
import TrackingStatus from "./pages/dashboard/user/TrackingStatus";
import LogbookTenant from "./pages/dashboard/user/LogbookTenant";
// Verifikator Pages
import VerifikatorDashboard from "./pages/dashboard/verifikator/VerifikatorDashboard";
import VerifikasiInkubasi from "./pages/dashboard/verifikator/VerifikasiInkubasi";
// Reviewer Pages
import ReviewerLayout from "./layouts/ReviewerLayout";
import ReviewerDashboard from "./pages/dashboard/reviewer/ReviewerDashboard";
import PenilaianProposal from "./pages/dashboard/reviewer/PenilaianProposal";
import ApprovalLogbook from "./pages/dashboard/reviewer/ApprovalLogbook";
function App() {
  return (
    <Router>
      <Routes>
        {/* 1. HALAMAN PUBLIK */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/inkubasi" element={<Inkubasi />} />
          <Route path="/inovasi" element={<Inovasi />} />
          <Route path="/hki" element={<HKI />} />
          <Route path="/publikasi" element={<Publikasi />} />
        </Route>

        {/* 2. HALAMAN AUTHENTICATION */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 3. HALAMAN DASHBOARD ADMIN */}
        <Route
          element={<ProtectedRoute allowedRoles={["administrator", "admin"]} />}
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManajemenUser />} />
            <Route path="berita" element={<KelolaBerita />} />
            <Route path="audit-log" element={<AuditLog />} />
          </Route>
        </Route>

        {/* 4. HALAMAN DASHBOARD TENANT / USER */}
        <Route element={<ProtectedRoute allowedRoles={["user", "tenant"]} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="inkubasi/pengajuan" element={<FormInkubasi />} />
            <Route path="tracking" element={<TrackingStatus />} />
            <Route path="inkubasi/logbook" element={<LogbookTenant />} />
          </Route>
        </Route>
        {/* 5. HALAMAN DASHBOARD VERIFIKATOR */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["verifikator", "administrator"]} />
          }
        >
          <Route path="/verifikator" element={<VerifikatorLayout />}>
            <Route path="dashboard" element={<VerifikatorDashboard />} />
            <Route path="inkubasi" element={<VerifikasiInkubasi />} />
          </Route>
        </Route>
        // 6. HALAMAN DASHBOARD REVIEWER
        <Route
          element={
            <ProtectedRoute allowedRoles={["reviewer", "administrator"]} />
          }
        >
          <Route path="/reviewer" element={<ReviewerLayout />}>
            <Route path="dashboard" element={<ReviewerDashboard />} />
            <Route path="penilaian" element={<PenilaianProposal />} />
            <Route path="logbook" element={<ApprovalLogbook />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
