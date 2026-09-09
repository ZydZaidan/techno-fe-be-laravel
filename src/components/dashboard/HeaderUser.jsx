import { useState } from "react";

const HeaderUser = ({ onToggleSidebar }) => {
  const [copied, setCopied] = useState(false);

  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });



  const userCode = user?.user_code || `ID-${user?.id || '000'}`;

  // Fungsi Copy User Code ke Clipboard
  const handleCopyCode = () => {
    if (userCode) {
      navigator.clipboard.writeText(userCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="bg-white px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center font-poppins border-b border-slate-100 md:border-none md:ml-64 shadow-sm md:shadow-none">
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

      {/* KANAN: Profil User & Badge User Code */}
      <div className="flex items-center gap-3">
        {/* Detail Info User */}
        <div className="text-right hidden sm:flex flex-col items-end">
          
          <div className="flex items-center gap-1.5 mt-0.5">
            {/* Badge User Code dengan Fitur Click-to-Copy */}
            <button
              onClick={handleCopyCode}
              title="Klik untuk menyalin User Code"
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-slate-600 hover:text-custom-cyan text-[10px] font-mono font-bold rounded-md transition-all group"
            >
              <span>{userCode}</span>
              <svg className="w-3 h-3 text-slate-400 group-hover:text-custom-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>

          </div>

          {/* Notifikasi Salin Sukses */}
          {copied && (
            <span className="text-[9px] text-emerald-600 font-semibold animate-pulse mt-0.5">
              Kode tersalin!
            </span>
          )}
        </div>
        

      </div>
    </header>
  );
};

export default HeaderUser;