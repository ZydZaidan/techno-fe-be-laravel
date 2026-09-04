import { useState } from "react";
import API from "../../../services/api"; // Path import disesuaikan (naik 3 level)

const FormInkubasi = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_tim: "",
    kategori_bisnis: "IoT & Smart Grid",
    deskripsi: "",
  });
  const [fileDokumen, setFileDokumen] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFileDokumen(e.target.files[0]);
  };

  const handleDownloadTemplate = () => {
    // Simulasi download template atau isi lokasi static file (contoh: /templates/Template_Proposal.docx)
    alert("Mengunduh Template Dokumen Administrasi...");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const res = await API.post("/tenant/pengajuan", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Pengajuan proposal inkubasi berhasil dikirim!");
        setFormData({
          nama_tim: "",
          kategori_bisnis: "IoT & Smart Grid",
          deskripsi: "",
        });
        setFileDokumen(null);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Gagal mengirim pengajuan inkubasi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-poppins">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">
          Form Pengajuan Inkubasi Bisnis
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Lengkapi formulir dan unggah Pitch Deck/Proposal tim kamu.
        </p>
      </div>

      {/* 📌 Catatan Penting */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3.5 text-amber-800 text-xs sm:text-sm">
        <svg
          className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <span className="font-bold block mb-0.5">Catatan Penting Abstrak/Deskripsi:</span>
          <span>
            Pastikan deskripsi memuat latar belakang riset/inovasi, solusi teknologis yang ditawarkan, serta potensi komersialisasi produk yang akan dikembangkan.
          </span>
        </div>
      </div>

      {/* 📄 Section Download Template */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-[#092B52] text-sm sm:text-base">
            Administrasi & Dokumen Persyaratan
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Unduh dan sesuaikan berkas pengajuan menggunakan format resmi yang telah disediakan.
          </p>
        </div>
        <button
          type="button"
          onClick={handleDownloadTemplate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-50 text-[#188B9E] hover:bg-[#188B9E] hover:text-white font-bold text-xs rounded-xl transition-all border border-sky-100 shadow-xs shrink-0 cursor-pointer"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Template
        </button>
      </div>

      {/* 📝 Main Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Tim / Startup <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="nama_tim"
              required
              value={formData.nama_tim}
              onChange={handleChange}
              placeholder="Contoh: InnovateX Team"
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kategori Bisnis <span className="text-rose-500">*</span>
            </label>
            <select
              name="kategori_bisnis"
              value={formData.kategori_bisnis}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            >
              <option value="IoT & Smart Grid">IoT & Smart Grid</option>
              <option value="Energi Terbarukan">Energi Terbarukan</option>
              <option value="Software & AI">Software & AI</option>
              <option value="Teknologi Lingkungan">Teknologi Lingkungan</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Deskripsi Inovasi <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="deskripsi"
              rows="4"
              required
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Jelaskan secara ringkas mengenai inovasi bisnis Anda..."
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Upload Dokumen Proposal / Pitch Deck (PDF) <span className="text-rose-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#188B9E] file:text-white hover:file:bg-[#092B52]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#188B9E] hover:bg-[#092B52] text-white font-bold rounded-xl transition-all shadow-sm text-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Mengunggah Proposal..." : "Kirim Pengajuan Inkubasi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormInkubasi;