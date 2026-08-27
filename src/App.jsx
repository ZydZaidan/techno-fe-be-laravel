import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profil from './pages/Profil';
import Inkubasi from './pages/Inkubasi';
import Inovasi from './pages/Inovasi';
import HKI from './pages/HKI';
import Publikasi from './pages/Publikasi';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 2. Daftarin rute untuk masing-masing halaman */}
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/inkubasi" element={<Inkubasi />} />
        <Route path="/inovasi" element={<Inovasi />} />
        <Route path="/hki" element={<HKI />} />
        <Route path="/publikasi" element={<Publikasi />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;