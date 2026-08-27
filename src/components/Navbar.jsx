import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-custom-blue shadow-md sticky top-0 z-50 font-poppins border-b-2 border-custom-yellow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
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