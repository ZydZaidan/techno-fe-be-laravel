import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profil from './pages/Profil';
import Inkubasi from './pages/Inkubasi';
import Inovasi from './pages/Inovasi';
import HKI from './pages/HKI';
import Publikasi from './pages/Publikasi';
import Contact from './pages/Contact';
import PengajuanInkubasi from './pages/PengajuanInkubasi';

// Import Login & Register dari folder auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Utama Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/inkubasi" element={<Inkubasi />} />
        <Route path="/inovasi" element={<Inovasi />} />
        <Route path="/hki" element={<HKI />} />
        <Route path="/publikasi" element={<Publikasi />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pengajuan-inkubasi" element={<PengajuanInkubasi />} />

        {/* Rute Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;