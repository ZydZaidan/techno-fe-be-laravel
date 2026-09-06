import { useState } from "react";

const HeaderUser = ({ onToggleSidebar }) => {
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Helper function aman untuk membuat inisial nama tanpa memicu ESLint error
  const getInitial = (name) => {
    if (!name) return "US";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const displayName = user?.nama || user?.name || "Pengusul Inovasi";

  return (
    <header className="bg-white px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center font-poppins border-b border-slate-100 md:border-none md:ml-64">
      {/* KIRI: Tombol Toggle Mobile & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-[#092B52] bg-slate-100 hover:bg-slate-200 md:hidden focus:outline-none transition-colors"
          aria-label="Open Sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#092B52] tracking-tight">Portal Tenant & Inovator</h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">Kelola pengajuan inkubasi, HKI, dan logbook kegiatan</p>
        </div>
      </div>

      {/* KANAN: Profil User */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-[#092B52]">{displayName}</p>
          <p className="text-[10px] text-slate-400 font-medium capitalize">
            {user?.role || "Tenant / User"}
          </p>
        </div>
        
        {/* Avatar Inisial Bulat (Aman dari TypeError) */}
        <div className="w-9 h-9 rounded-full bg-[#188B9E] text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
          {getInitial(user?.nama || user?.name)}
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;