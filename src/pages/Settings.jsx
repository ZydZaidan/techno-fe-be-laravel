import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getProfileAPI, updateProfileAPI, changePasswordAPI } from "../services/api";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'security'
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Alert State
  const [alert, setAlert] = useState({ type: "", message: "" });

  // Form State Profile (foto_profil dihapus)
  const [profileForm, setProfileForm] = useState({
    user_code: "",
    email: "",
    role: "",
    nama: "",
    nim_nidn: "",
    jurusan: "",
    no_hp: "",
  });

  // Form State Password
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 4000);
  }, []);

  // Helper Avatar Dynamic (Murni berdasarkan nama)
  const getAvatarUrl = (name) => {
    const userName = name || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName
    )}&background=092B52&color=FBB03B&bold=true&size=128`;
  };

  // Fetch Data Profile Saat Komponen Mount
  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const res = await getProfileAPI();
        if (isMounted && res.data?.success) {
          const data = res.data.data;
          setProfileForm({
            user_code: data.user_code || "-",
            email: data.email || "",
            role: data.role || "",
            nama: data.nama || "",
            nim_nidn: data.nim_nidn || "",
            jurusan: data.jurusan || "",
            no_hp: data.no_hp || "",
          });
        }
      } catch (err) {
        if (isMounted) {
          showAlert("error", err.response?.data?.message || "Gagal memuat data profil.");
        }
      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [showAlert]);

  // Handle Update Profile
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateProfileAPI({
        nama: profileForm.nama,
        nim_nidn: profileForm.nim_nidn,
        jurusan: profileForm.jurusan,
        no_hp: profileForm.no_hp,
      });

      if (res.data?.success) {
        showAlert("success", "Profil berhasil diperbarui!");
        
        // Update data user di sessionStorage
        const existingUser = JSON.parse(sessionStorage.getItem("user") || "{}");
        const updatedUser = { 
          ...existingUser, 
          ...res.data.user,
          nama: profileForm.nama
        };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        // Trigger custom event agar komponen Navbar bereaksi
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err) {
      showAlert("error", err.response?.data?.message || "Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Update Password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return showAlert("error", "Konfirmasi password baru tidak cocok!");
    }

    if (passwordForm.newPassword.length < 6) {
      return showAlert("error", "Password baru minimal 6 karakter.");
    }

    setLoading(true);
    try {
      const res = await changePasswordAPI({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (res.data?.success) {
        showAlert("success", "Password berhasil diubah!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      showAlert("error", err.response?.data?.message || "Gagal mengubah password.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#092B52]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-poppins py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* TOP BAR / NAVIGATION ACTION */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-[#092B52] text-xs font-semibold rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Beranda
          </Link>

          <span className="inline-block px-3.5 py-1 bg-[#092B52]/10 text-[#092B52] font-semibold rounded-full text-xs uppercase tracking-wider border border-[#092B52]/20">
            Role: {profileForm.role || "User"}
          </span>
        </div>

        {/* HEADER TITLE */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#092B52]">Pengaturan Akun</h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola informasi profil personal dan keamanan kredensial Anda.
          </p>
        </div>

        {/* ALERT NOTIFICATION */}
        {alert.message && (
          <div
            className={`p-4 mb-6 rounded-xl text-xs font-semibold shadow-sm transition-all ${
              alert.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* MAIN CARD CONTAINER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* USER AVATAR PREVIEW HEADER */}
          <div className="p-6 bg-gradient-to-r from-[#092B52] to-[#124178] text-white flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-custom-yellow overflow-hidden bg-slate-200 shrink-0 shadow-md">
              <img
                src={getAvatarUrl(profileForm.nama)}
                alt={profileForm.nama || "User Avatar"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-lg font-bold truncate">
                {profileForm.nama || "User"}
              </h2>
              <p className="text-xs text-slate-300 truncate">
                {profileForm.email}
              </p>
            </div>
          </div>

          {/* TABS HEADER */}
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-3.5 px-4 text-xs font-semibold transition-all ${
                activeTab === "profile"
                  ? "bg-white text-[#092B52] border-b-2 border-[#092B52] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Informasi Profil
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`flex-1 py-3.5 px-4 text-xs font-semibold transition-all ${
                activeTab === "security"
                  ? "bg-white text-[#092B52] border-b-2 border-[#092B52] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Keamanan / Password
            </button>
          </div>

          {/* TAB CONTENT CONTAINER */}
          <div className="p-6 md:p-8">
            
            {/* ================= TAB 1: PROFILE ================= */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* User Code */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      User Code
                    </label>
                    <input
                      type="text"
                      value={profileForm.user_code}
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl p-2.5 text-xs cursor-not-allowed font-mono"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl p-2.5 text-xs cursor-not-allowed"
                    />
                  </div>

                  {/* Nama Lengkap */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.nama}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, nama: e.target.value })
                      }
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#092B52]/20 focus:border-[#092B52] outline-none transition-all"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  {/* NIM / NIDN */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      NIM / NIDN
                    </label>
                    <input
                      type="text"
                      value={profileForm.nim_nidn}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, nim_nidn: e.target.value })
                      }
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#092B52]/20 focus:border-[#092B52] outline-none transition-all"
                      placeholder="Contoh: 202131001"
                    />
                  </div>

                  {/* Nomor HP */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nomor WhatsApp / HP
                    </label>
                    <input
                      type="text"
                      value={profileForm.no_hp}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, no_hp: e.target.value })
                      }
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#092B52]/20 focus:border-[#092B52] outline-none transition-all"
                      placeholder="Contoh: 08123456789"
                    />
                  </div>

                  {/* Jurusan */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Jurusan / Program Studi
                    </label>
                    <input
                      type="text"
                      value={profileForm.jurusan}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, jurusan: e.target.value })
                      }
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#092B52]/20 focus:border-[#092B52] outline-none transition-all"
                      placeholder="Contoh: S1 Teknik Informatika"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#092B52] hover:bg-[#124178] text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Menyimpan..." : "Simpan Perubahan Profil"}
                  </button>
                </div>
              </form>
            )}

            {/* ================= TAB 2: SECURITY ================= */}
            {activeTab === "security" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Password Saat Ini <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#092B52]/20 focus:border-[#092B52] outline-none transition-all"
                    placeholder="Masukkan password lama"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Password Baru <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#092B52]/20 focus:border-[#092B52] outline-none transition-all"
                    placeholder="Minimal 6 karakter"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Konfirmasi Password Baru <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#092B52]/20 focus:border-[#092B52] outline-none transition-all"
                    placeholder="Ulangi password baru"
                  />
                </div>

                <div className="flex justify-start pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Memproses..." : "Ubah Password"}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;