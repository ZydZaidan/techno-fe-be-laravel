import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PengajuanInkubasi = () => {
  const navigate = useNavigate();

  // Redirect jika belum login
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    judulInovasi: "",
    abstrak: "",
    ketuaTim: "",
    kodeAnggota: "",
    fileProposal: null,
  });

  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fileProposal: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fileProposal) {
      alert("Harap unggah berkas proposal terlebih dahulu!");
      return;
    }

    alert("Pengajuan Inkubasi berhasil dikirim!");
    navigate("/");
  };

  const handleDownloadTemplate = () => {
    // Simulasi download template
    alert("Mengunduh Template Dokumen Administrasi...");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-poppins pt-24">
      <Navbar />

      <main className="grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Tombol Kembali */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1c3250] text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>

          {/* Header Form */}
          <div>
            <h1 className="font-readex text-3xl md:text-4xl font-extrabold text-[#1c3250]">
              Formulir Pengajuan Inkubasi
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Lengkapi formulir di bawah ini untuk mengajukan pendaftaran program inkubasi bisnis.
            </p>
          </div>

          {/* 📌 Catatan Abstrak Dosen */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3.5 text-amber-800 text-sm">
            <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <span className="font-bold block mb-0.5">Catatan Penting Abstrak Dosen:</span>
              <span>Pastikan abstrak memuat latar belakang riset/inovasi, solusi teknologis yang ditawarkan, serta potensi komersialisasi produk yang akan dikembangkan.</span>
            </div>
          </div>

          {/* 📄 Section Administrasi & Download Template */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-readex font-bold text-[#1c3250] text-base">
                Administrasi & Dokumen Persyaratan
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Unduh dan sesuaikan berkas pengajuan menggunakan format resmi yang telah disediakan.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-50 text-custom-cyan hover:bg-custom-cyan hover:text-white font-bold text-xs rounded-xl transition-all border border-sky-100 shadow-xs shrink-0 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Template
            </button>
          </div>

          {/* 📝 Main Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Judul Inovasi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Judul Inovasi / Startup <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="judulInovasi"
                  required
                  placeholder="Masukkan judul riset atau nama produk inovasi"
                  value={formData.judulInovasi}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
                />
              </div>

              {/* Abstrak */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Abstrak Inovasi <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="abstrak"
                  rows={4}
                  required
                  placeholder="Ringkasan abstrak inovasi, masalah yang diselesaikan, dan dampak pengembangan..."
                  value={formData.abstrak}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
                />
              </div>

              {/* Ketua & Anggota Tim */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Ketua Tim <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ketuaTim"
                    required
                    placeholder="Nama lengkap ketua tim"
                    value={formData.ketuaTim}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Anggota Tim (Kode Pendaftaran)
                  </label>
                  <input
                    type="text"
                    name="kodeAnggota"
                    placeholder="Contoh: USR-8921, USR-4310"
                    value={formData.kodeAnggota}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Pisahkan dengan koma jika anggota lebih dari satu.
                  </span>
                </div>
              </div>

              {/* Upload Proposal */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Upload Proposal (PDF, Max 10MB) <span className="text-rose-500">*</span>
                </label>
                
                <div className="relative border-2 border-dashed border-slate-300 hover:border-custom-cyan bg-slate-50/50 hover:bg-cyan-50/20 rounded-2xl p-8 text-center transition-all group">
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 bg-cyan-100 text-custom-cyan rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>

                    {fileName ? (
                      <p className="text-sm font-bold text-custom-blue">{fileName}</p>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-slate-700">
                          Drag & drop file proposal di sini, atau <span className="text-custom-cyan underline">pilih berkas</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Format PDF (Maksimal 10 MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-custom-yellow hover:bg-amber-400 text-custom-blue font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Submit Proposal
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PengajuanInkubasi;