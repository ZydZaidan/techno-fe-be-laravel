import { NavLink, Link, useNavigate } from 'react-router-dom';

const DashboardIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const EvaluasiIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const LogbookIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 00-1 1m-6 0h6" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1m0 16v-1" />
  </svg>
);

const SidebarReviewer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/reviewer/dashboard', icon: DashboardIcon },
    { name: 'Penilaian Proposal', path: '/reviewer/penilaian', icon: EvaluasiIcon },
    { name: 'Logbook Mentoring', path: '/reviewer/logbook', icon: LogbookIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 w-64 bg-[#188B9E] h-full min-h-screen text-white flex flex-col justify-between font-poppins md:rounded-tr-3xl shrink-0 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          <div className="p-6 pb-8 flex items-center justify-between">
            <Link to="/" onClick={onClose}>
              <img
                src="/src/assets/img/logo-white.svg"
                alt="ITPLN Science Technopark"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <button onClick={onClose} className="md:hidden text-white/80 hover:text-white p-1 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="px-4 space-y-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
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

export default SidebarReviewer;