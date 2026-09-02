import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // State User dari LocalStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const dropdownRef = useRef(null);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  // Sync state user saat perpindahan halaman atau event storage trigger
  useEffect(() => {
    const checkUserStorage = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    checkUserStorage();

    // Listen event storage (berguna saat baru selesai login)
    window.addEventListener("storage", checkUserStorage);
    return () => window.removeEventListener("storage", checkUserStorage);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    closeAllMenus();
  };

  const navBg = isMobileMenuOpen
    ? "bg-[#092B52] text-white shadow-none"
    : isHome && !isScrolled
      ? "bg-transparent border-transparent text-white shadow-none"
      : "bg-custom-blue border-b-2 border-custom-yellow text-white shadow-md";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Profil", path: "/profil" },
    { name: "Inkubasi", path: "/inkubasi" },
    { name: "Inovasi", path: "/inovasi" },
    { name: "HKI", path: "/hki" },
    { name: "Publikasi", path: "/publikasi" },
    { name: "Contact", path: "/contact" },
  ];

  // Penentuan Navigasi Dashboard Berdasarkan Role DB
  const getDashboardPath = () => {
    if (!user) return "/login";
    const role = user.role?.toLowerCase();
    
    if (role === "admin" || role === "administrator") return "/admin/dashboard";
    if (role === "verifikator") return "/verifikator/dashboard";
    if (role === "reviewer") return "/reviewer/dashboard";
    if (role === "tenant") return "/tenant/dashboard";
    return "/";
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 font-poppins transition-all duration-300 ${navBg}`}
    >
      <div className="layout-container mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" onClick={closeAllMenus}>
          <img
            src="/src/assets/img/logo-white.svg"
            alt="Logo Technopark"
            className="h-12 md:h-14 transition-transform hover:scale-105 duration-200"
          />
        </Link>

        {/* ================= DESKTOP MENU (MD to UP) ================= */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 items-center font-normal text-white">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-1 group transition-all duration-200 ${
                    isActive
                      ? "font-semibold text-custom-yellow"
                      : "hover:font-semibold"
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-custom-yellow transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          <div className="relative" ref={dropdownRef}>
            {!user ? (
              /* BUTTON LOGIN DESKTOP */
              <Link
                to="/login"
                className="relative inline-flex items-center justify-center px-7 py-2 text-sm font-semibold text-custom-blue bg-custom-yellow rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-custom-yellow/20 hover:shadow-lg active:scale-95 group focus:outline-none"
              >
                <span>Login</span>
              </Link>
            ) : (
              /* AVATAR & DROPDOWN USER */
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-custom-yellow overflow-hidden bg-slate-200 transition-transform group-hover:scale-105 shadow-sm">
                    <img
                      src={
                        user.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nama || user.name}`
                      }
                      alt={user.nama || user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-bold text-[#092B52] truncate">
                        {user.nama || user.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium capitalize">
                        {user.role}
                      </p>
                    </div>

                    <Link
                      to={getDashboardPath()}
                      onClick={closeAllMenus}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-custom-blue transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 00-1 1m-6 0h6"
                        />
                      </svg>
                      Dashboard
                    </Link>

                    <Link
                      to="/settings"
                      onClick={closeAllMenus}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-custom-blue transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <svg
                        className="w-4 h-4 text-rose-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1m0 16v-1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= MOBILE CONTROLS (HP) ================= */}
        <div className="flex md:hidden items-center gap-3">
          {!user && (
            <Link
              to="/login"
              className="px-4 py-1.5 bg-custom-yellow text-custom-blue text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-transform"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE DROPDOWN MENU (HP) ================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#092B52] border-b-2 border-custom-yellow px-6 pt-2 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 pt-2 border-b border-white/10 pb-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeAllMenus}
                  className={`text-sm font-medium py-1.5 transition-colors ${
                    isActive
                      ? "text-custom-yellow font-semibold"
                      : "text-slate-200 hover:text-custom-yellow"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {user && (
            <div className="pt-1 space-y-4">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="w-10 h-10 rounded-full border border-custom-yellow overflow-hidden bg-slate-200 shrink-0">
                  <img
                    src={
                      user.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nama || user.name}`
                    }
                    alt={user.nama || user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">
                    {user.nama || user.name}
                  </p>
                  <p className="text-[10px] text-custom-yellow font-medium capitalize">
                    {user.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Link
                  to={getDashboardPath()}
                  onClick={closeAllMenus}
                  className="flex items-center gap-2.5 text-xs font-medium text-slate-200 hover:text-custom-yellow py-1.5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 00-1 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 pt-2 transition-colors text-left"
                >
                  <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1m0 16v-1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;