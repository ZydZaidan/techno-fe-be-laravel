import { NavLink, Link, useNavigate } from 'react-router-dom';

// ================= SVG ICONS =================
const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const NewsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
  </svg>
);


const AuditIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DashboardIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1m0 16v-1" />
  </svg>
);

const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 00-1 1m-6 0h6" />
  </svg>
);

const SidebarAdmin = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Manajemen User', path: '/admin/users', icon: UserIcon },
    { name: 'Kelola Berita', path: '/admin/berita', icon: NewsIcon },
    { name: 'Audit Log', path: '/admin/audit-log', icon: AuditIcon },
    { name: 'Dashboard', path: '/admin/dashboard', icon: DashboardIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* 1. OVERLAY GELAP (Mobile Only saat sidebar terbuka) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        />
      )}

      {/* 2. SIDEBAR ASIDE */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 bg-[#188B9E] h-screen text-white flex flex-col justify-between font-poppins md:rounded-tr-3xl shrink-0 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* BAGIAN ATAS */}
        <div>
          {/* Header Logo + Close Button Mobile */}
          <div className="p-6 pb-8 flex items-center justify-between">
            <Link to="/" onClick={onClose}>
              <img
                src="/src/assets/img/logo-white.svg"
                alt="ITPLN Science Technopark"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Tombol Close (Mobile Only) */}
            <button
              onClick={onClose}
              className="md:hidden text-white/80 hover:text-white p-1 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigasi Menu Admin */}
          <nav className="px-4 space-y-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose} // Otomatis tutup sidebar saat menu diklik di HP
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-5 py-3 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#FDE047] text-[#092B52] font-semibold shadow-md'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <IconComponent className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* BAGIAN BAWAH: BUTTON HOME & LOGOUT */}
        <div className="p-6 space-y-2">
          <Link
            to="/"
            onClick={onClose}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-white/80 hover:text-white transition-colors"
          >
            <HomeIcon className="w-4 h-4 shrink-0" />
            <span>Lihat Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-white/90 hover:text-rose-200 transition-colors text-left"
          >
            <LogoutIcon className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
};

export default SidebarAdmin;