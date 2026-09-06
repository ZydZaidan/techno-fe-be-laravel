import { useState } from "react";

const HeaderAdmin = ({ onToggleSidebar }) => {
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <header className="md:ml-64 bg-white px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center font-poppins border-b border-slate-100 md:border-none">
      
      {/* KIRI: Tombol Toggle Mobile & Title */}
      <div className="flex items-center gap-3">
        {/* Tombol Hamburger (Hanya Tampil di HP) */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-[#092B52] bg-slate-100 hover:bg-slate-200 md:hidden focus:outline-none transition-colors"
          aria-label="Open Sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-lg sm:text-xl font-bold text-[#092B52] tracking-tight">Administrator</h1>
      </div>

      {/* KANAN: Profil Admin */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-[#092B52]">
            {user?.name || "Admin Utama"}
          </p>
          <p className="text-[10px] text-slate-400 font-medium capitalize">
            {user?.role || "Superadmin"}
          </p>
        </div>
        
        {/* Avatar Inisial Bulat */}
        <div className="w-9 h-9 rounded-full bg-[#092B52] text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
          {user?.name ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "AU"}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;