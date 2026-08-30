import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Buat ngecek posisi halaman sekarang

  // Ngecek apakah user lagi buka halaman utama (Home)
  const isHome = location.pathname === '/';

  // Logika buat mantau scroll mouse
  useEffect(() => {
    const handleScroll = () => {
      // Kalau di-scroll lebih dari 50px ke bawah, trigger warna solid
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Penentuan style Navbar:
  // Kalo di halaman Home DAN belom scroll -> Transparan tanpa border
  // Kalo selain Home ATAU udah scroll -> Warna Biru Default + Border Kuning
  const navBg = isHome && !isScrolled
    ? 'bg-transparent border-transparent text-white shadow-none'
    : 'bg-custom-blue border-b-2 border-custom-yellow text-white shadow-md';
  return (
<nav className={`fixed w-full top-0 z-50 font-poppins transition-all duration-500 ${navBg}`}>
        <div className="layout-container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Judul Brand */}
        <Link to="/">
          <img
            src="/src/assets/img/logo-white.svg"
            alt="Logo Technopark"
            className="h-20"
          />
        </Link>

        <div className="flex items-center gap-12">
          {/* Menu Navigasi Utama */}
          <div className="hidden md:flex gap-6 items-center font-normal text-white">
            
            {/* Kita pakai trik transisi border & opacity/color biar smooth */}
            <Link to="/" className="relative py-1 group transition-all hover:font-semibold">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-custom-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/profil" className="relative py-1 group transition-all hover:font-semibold">
              <span>Profil</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-custom-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/inkubasi" className="relative py-1 group transition-all hover:font-semibold">
              <span>Inkubasi</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-custom-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/inovasi" className="relative py-1 group transition-all hover:font-semibold">
              <span>Inovasi</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-custom-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/hki" className="relative py-1 group transition-all hover:font-semibold">
              <span>HKI</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-custom-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/publikasi" className="relative py-1 group transition-all hover:font-semibold">
              <span>Publikasi</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-custom-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/contact" className="relative py-1 group transition-all hover:font-semibold">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-custom-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>

          </div>

          {/* Tombol Login */}
          <div>
            <Link
              to="/login"
              className="px-8 py-2 bg-custom-yellow text-custom-blue font-semibold rounded-lg shadow-sm border-2 border-custom-yellow hover:bg-transparent hover:text-custom-yellow transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;