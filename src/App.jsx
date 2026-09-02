import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Routes Guard
import ProtectedRoute from './routes/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Public Pages
import Home from './pages/public/Home';
import Profil from './pages/public/Profil';
import Contact from './pages/public/Contact';
import Inkubasi from './pages/public/Inkubasi';
import Inovasi from './pages/public/Inovasi';
import PengajuanInkubasi from './pages/public/PengajuanInkubasi';
import HKI from './pages/public/HKI';
import Publikasi from './pages/public/Publikasi';

// Admin Pages
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import ManajemenUser from './pages/dashboard/admin/ManajemenUser';
import KelolaBerita from './pages/dashboard/admin/KelolaBerita';
import ApprovalHKI from './pages/dashboard/admin/ApprovalHKI';
import AuditLog from './pages/dashboard/admin/AuditLog';

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
          <Route path="/pengajuan-inkubasi" element={<PengajuanInkubasi />} />
          <Route path="/hki" element={<HKI />} />
          <Route path="/publikasi" element={<Publikasi />} />
        </Route>

        {/* 2. HALAMAN AUTHENTICATION */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 3. HALAMAN DASHBOARD ADMIN (DIPROTEKSI) */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManajemenUser />} />
            <Route path="berita" element={<KelolaBerita />} />
            <Route path="hki" element={<ApprovalHKI />} />
            <Route path="audit-log" element={<AuditLog />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;