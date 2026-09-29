import { useState, useEffect } from "react";
import API from "../../../services/api";

const FormInkubasi = () => {
  const [loading, setLoading] = useState(false);
  const [checkingActive, setCheckingActive] = useState(true);
  const [activeInkubasi, setActiveInkubasi] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(true);
  
  // Form utama
  const [formData, setFormData] = useState({
    nama_tim: "",
    kategori_bisnis: "IoT & Smart Grid",
    deskripsi: "",
  });

  // State Ketua Tim
  const [ketua, setKetua] = useState({
    nama: "",
    user_code: "",
    id_user: null,
    status: null, // 'loading' | 'success' | 'error'
  });

  // State Anggota Tim
  const [anggotaList, setAnggotaList] = useState([]);
  const [fileDokumen, setFileDokumen] = useState(null);

// --- CEK STATUS INKUBASI AKTIF SAAT LOAD ---
useEffect(() => {
  const checkFormAndActiveStatus = async () => {
    try {
      // 1. Cek Pendaftaran Buka/Tutup dari Admin
      const statusRes = await API.get("/techno/inkubasi/form-status");
      
      if (statusRes.data?.success) {
        // Ambil isOpen (dengan fallback ke is_active jika ada perubahan di backend)
        const statusValue = statusRes.data?.isOpen ?? statusRes.data?.data?.isOpen ?? statusRes.data?.is_active;

        // Cek boolean / string / number
        const openStatus = 
          statusValue === true || 
          statusValue === "true" || 
          statusValue === 1 || 
          statusValue === "1";

        setIsFormOpen(openStatus);
      }

      // 2. Cek Pengajuan Aktif milik User
      const res = await API.get("/techno/inkubasi/dashboard");
      if (res.data?.success && res.data?.data?.pengajuanTerbaru) {
        const pengajuan = res.data.data.pengajuanTerbaru;
        if (pengajuan.status_inkubasi !== "Selesai") {
          setActiveInkubasi(pengajuan);
        }
      }
    } catch (error) {
      console.error("Gagal mengecek status pendaftaran/inkubasi:", error);
    } finally {
      setCheckingActive(false);
    }
  };

  checkFormAndActiveStatus();
}, []);

  // Handler input utama
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFileDokumen(e.target.files[0]);
  };

  const handleDownloadTemplate = () => {
    alert("Mengunduh Template Dokumen Administrasi...");
  };

  // --- OTOMATISASI KETUA TIM (Auto-Check via User Code) ---
  useEffect(() => {
    if (!ketua.user_code.trim()) return;

    const timer = setTimeout(async () => {
      setKetua((prev) => ({ ...prev, status: "loading" }));
      try {
        const res = await API.get(`/auth/check-code/${ketua.user_code}`);
        setKetua((prev) => ({
          ...prev,
          nama: res.data.data.nama,
          id_user: res.data.data.id,
          status: "success",
        }));
      } catch {
        setKetua((prev) => ({ ...prev, status: "error", id_user: null }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [ketua.user_code]);

  // --- OTOMATISASI ANGGOTA TIM ---
  const handleAddAnggota = () => {
    setAnggotaList([
      ...anggotaList,
      { nama_anggota: "", user_code: "", id_user: null, status: null },
    ]);
  };

  const handleRemoveAnggota = (index) => {
    const list = [...anggotaList];
    list.splice(index, 1);
    setAnggotaList(list);
  };

  const handleAnggotaChange = (index, field, value) => {
    const list = [...anggotaList];
    list[index][field] = value;
    if (field === "user_code") {
      list[index].status = value ? "loading" : null;
    }
    setAnggotaList(list);
  };

  const checkAnggotaCode = async (index, code) => {
    if (!code.trim()) return;

    try {
      const res = await API.get(`/auth/check-code/${code}`);
      setAnggotaList((prev) => {
        const list = [...prev];
        if (list[index]) {
          list[index].nama_anggota = res.data.data.nama;
          list[index].id_user = res.data.data.id;
          list[index].status = "success";
        }
        return list;
      });
    } catch {
      setAnggotaList((prev) => {
        const list = [...prev];
        if (list[index]) {
          list[index].status = "error";
          list[index].id_user = null;
        }
        return list;
      });
    }
  };

  useEffect(() => {
    const timers = anggotaList.map((item, index) => {
      if (item.user_code && item.status === "loading") {
        return setTimeout(() => {
          checkAnggotaCode(index, item.user_code);
        }, 500);
      }
      return null;
    });

    return () => timers.forEach((t) => t && clearTimeout(t));
  }, [anggotaList]);

  // --- SUBMIT FORM ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormOpen) {
      alert("Pendaftaran inkubasi saat ini sedang ditutup oleh Admin!");
      return;
    }
    if (activeInkubasi) {
      alert("Anda masih memiliki pengajuan inkubasi yang sedang berjalan!");
      return;
    }

    if (!fileDokumen) {
      alert("Wajib mengunggah file dokumen proposal!");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("nama_tim", formData.nama_tim);
      data.append("kategori_bisnis", formData.kategori_bisnis);
      data.append("deskripsi", formData.deskripsi);
      data.append("file_dokumen", fileDokumen);

      const payloadAnggota = anggotaList.map((item) => ({
        nama_anggota: item.nama_anggota,
        user_code: item.user_code,
        id_user: item.id_user,
        peran: "Anggota",
      }));

      data.append("anggota", JSON.stringify(payloadAnggota));

      const res = await API.post("/techno/inkubasi", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Pengajuan proposal inkubasi berhasil dikirim!");
        setFormData({
          nama_tim: "",
          kategori_bisnis: "IoT & Smart Grid",
          deskripsi: "",
        });
        setKetua({ nama: "", user_code: "", id_user: null, status: null });
        setAnggotaList([]);
        setFileDokumen(null);
        setActiveInkubasi(res.data.data);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Gagal mengirim pengajuan inkubasi."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingActive) {
    return (
      <div className="max-w-4xl mx-auto md:ml-64 py-12 text-center text-xs text-slate-400 font-poppins">
        Memeriksa status pengajuan inkubasi...
      </div>
    );
  }

  const isFormDisabled = !isFormOpen || !!activeInkubasi;

  return (
    <div className="space-y-6 md:ml-64 font-poppins pt-8 px-4 md:px-8 pb-16 bg-[#F9FAFB] min-h-screen">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">
          Form Pengajuan
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Lengkapi formulir dan unggah Pitch Deck/Proposal tim kamu.
        </p>
      </div>

      {/* 🛑 BANNER 1: Pendaftaran Ditutup oleh Admin */}
      {!isFormOpen && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-900 space-y-1">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-bold text-sm">Pendaftaran Inkubasi Ditutup</h4>
          </div>
          <p className="text-xs leading-relaxed text-rose-800">
            Saat ini penerimaan proposal inkubasi sedang ditutup. Silakan tunggu pembukaan batch berikutnya.
          </p>
        </div>
      )}

      {/* ⚠️ BANNER 2: Peringatan Inkubasi Berjalan */}
      {isFormOpen && activeInkubasi && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 space-y-1">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h4 className="font-bold text-sm">Pengajuan Baru Tidak Tersedia</h4>
          </div>
          <p className="text-xs leading-relaxed text-amber-800">
            Kamu saat ini masih memiliki program inkubasi berjalan dengan tim <strong>"{activeInkubasi.nama_tim}"</strong>.
          </p>
        </div>
      )}

      {/* 📄 Section Download Template */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-[#092B52] text-sm sm:text-base">
            Administrasi & Dokumen Persyaratan
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Unduh dan sesuaikan berkas pengajuan menggunakan format resmi
          </p>
        </div>
        <button
          type="button"
          onClick={handleDownloadTemplate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-50 text-[#188B9E] hover:bg-[#188B9E] hover:text-white font-bold text-xs rounded-xl transition-all border border-sky-100 shadow-xs shrink-0 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Template
        </button>
      </div>

      {/* 📝 Main Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Nama Tim */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Tim <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="nama_tim"
              required
              disabled={isFormDisabled}
              value={formData.nama_tim}
              onChange={handleChange}
              placeholder="Nama Tim"
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50 disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* 2. Kategori */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kategori <span className="text-rose-500">*</span>
            </label>
            <select
              name="kategori_bisnis"
              disabled={isFormDisabled}
              value={formData.kategori_bisnis}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50 disabled:bg-slate-100 disabled:cursor-not-allowed"
            >
              <option value="IoT & Smart Grid">IoT & Smart Grid</option>
              <option value="Energi Terbarukan">Energi Terbarukan</option>
              <option value="Software & AI">Software & AI</option>
              <option value="Teknologi Lingkungan">Teknologi Lingkungan</option>
            </select>
          </div>

          {/* 👑 3. KETUA TIM */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#092B52]">
                Ketua Tim <span className="text-rose-500">*</span>
              </label>
              {ketua.status === "loading" && (
                <span className="text-[11px] text-amber-600 font-medium animate-pulse">
                  Mencari akun...
                </span>
              )}
              {ketua.status === "success" && (
                <span className="text-[11px] text-emerald-600 font-medium">
                  ✓ Akun Ketua Ditemukan
                </span>
              )}
              {ketua.status === "error" && (
                <span className="text-[11px] text-rose-500 font-medium">
                  User Code tidak ditemukan
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="User Code Ketua (cth: USR-001)"
                  value={ketua.user_code}
                  required
                  disabled={isFormDisabled}
                  onChange={(e) => {
                    const userCode = e.target.value;
                    setKetua((prev) => ({
                      ...prev,
                      user_code: userCode,
                      ...(userCode.trim() ? {} : { status: null, id_user: null }),
                    }));
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50 disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nama Ketua (Otomatis terisi)"
                  value={ketua.nama}
                  disabled={isFormDisabled}
                  onChange={(e) => setKetua({ ...ketua, nama: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed ${
                    ketua.status === "success"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-medium"
                      : "bg-white border-slate-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 👥 4. ANGGOTA TIM */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#092B52]">
                Anggota Tim
              </label>
              {!isFormDisabled && (
                <button
                  type="button"
                  onClick={handleAddAnggota}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#188B9E] hover:text-[#092B52] cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Anggota
                </button>
              )}
            </div>

            {anggotaList.map((item, index) => (
              <div key={index} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Anggota {index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.status === "loading" && (
                      <span className="text-[10px] text-amber-600 font-medium animate-pulse">
                        Mengecek...
                      </span>
                    )}
                    {item.status === "success" && (
                      <span className="text-[10px] text-emerald-600 font-medium">
                        ✓ Terverifikasi
                      </span>
                    )}
                    {item.status === "error" && (
                      <span className="text-[10px] text-rose-500 font-medium">
                        Code tidak valid
                      </span>
                    )}
                    {!isFormDisabled && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAnggota(index)}
                        className="text-rose-500 hover:text-rose-700 text-xs font-semibold cursor-pointer ml-2"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="User Code Anggota"
                    value={item.user_code}
                    disabled={isFormDisabled}
                    onChange={(e) => handleAnggotaChange(index, "user_code", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                  <input
                    type="text"
                    placeholder="Nama Anggota (Otomatis terisi)"
                    value={item.nama_anggota}
                    disabled={isFormDisabled}
                    onChange={(e) => handleAnggotaChange(index, "nama_anggota", e.target.value)}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-xs focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed ${
                      item.status === "success"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-medium"
                        : "bg-white border-slate-300"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 5. Deskripsi Inovasi */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Deskripsi Inovasi <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="deskripsi"
              rows="4"
              required
              disabled={isFormDisabled}
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Jelaskan secara ringkas mengenai inovasi Anda..."
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50 disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* 6. Upload Dokumen */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Upload Dokumen Proposal / Pitch Deck (PDF){" "}
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              required
              disabled={isFormDisabled}
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#188B9E] file:text-white hover:file:bg-[#092B52] disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isFormDisabled}
            className="w-full py-3 bg-[#188B9E] hover:bg-[#092B52] text-white font-bold rounded-xl transition-all shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading
              ? "Mengunggah Proposal..."
              : !isFormOpen
              ? "Pendaftaran Sedang Ditutup"
              : activeInkubasi
              ? "Selesaikan Inkubasi Aktif untuk Mengirim Baru"
              : "Kirim Pengajuan Inkubasi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormInkubasi;