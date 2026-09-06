import { useState, useEffect } from "react";
import API from "../../../services/api";

const TrackingStatus = () => {
  const [listInkubasi, setListInkubasi] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await API.get("/pengajuan-inkubasi/my");

        if (res.data.success && res.data.data) {
          const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
          setListInkubasi(data);
        }
      } catch (err) {
        console.error("Gagal mengambil status pengajuan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs">
        Memuat status pengajuan...
      </div>
    );
  }

  if (listInkubasi.length === 0) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-100 text-center text-slate-500 text-xs font-poppins">
        Kamu belum pernah mengirimkan proposal pengajuan inkubasi.
      </div>
    );
  }

  // Ambil data inkubasi yang dipilih berdasarkan dropdown
  const dataInkubasi = listInkubasi[selectedIndex] || listInkubasi[0];

  const isLolosVerifikasi = dataInkubasi.status_verifikasi === "Lolos";
  const isEvaluated = Boolean(
    dataInkubasi.evaluasi || dataInkubasi.total_skor !== null
  );

  const steps = [
    {
      label: "Proposal Terkirim",
      done: true,
      date: dataInkubasi.created_at
        ? new Date(dataInkubasi.created_at).toLocaleDateString("id-ID")
        : "Terkirim",
    },
    {
      label: "Verifikasi Administrasi",
      done: isLolosVerifikasi,
      active: !isLolosVerifikasi,
      date: dataInkubasi.status_verifikasi || "Pending",
    },
    {
      label: "Penilaian Reviewer",
      done: isEvaluated,
      active: isLolosVerifikasi && !isEvaluated,
      date: isEvaluated ? "Selesai" : "Menunggu Reviewer",
    },
    {
      label: "Keputusan Final",
      done: isEvaluated,
      date: isEvaluated ? dataInkubasi.rekomendasi || dataInkubasi.status : "-",
    },
  ];

  const fileBaseUrl =
    import.meta.env.VITE_FILE_BASE_URL || "http://localhost:5000";

  return (
    <div className="space-y-6 font-poppins md:ml-64">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">
            Real-time Status Tracking
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau perkembangan tahapan seleksi pengajuan kamu secara transparan.
          </p>
        </div>

        {/* Dropdown Pemilih Inkubasi jika user punya lebih dari 1 pengajuan */}
        {listInkubasi.length > 1 && (
          <div className="flex items-center gap-2">
            <select
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              className="bg-white border border-slate-200 text-xs text-[#092B52] rounded-xl px-3 py-2 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]"
            >
              {listInkubasi.map((item, index) => (
                <option key={item.id || index} value={index}>
                  {item.nama_tim} ({item.kategori_bisnis})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-wrap justify-between items-start gap-4">
          <div>
            <span className="text-[10px] font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200">
              {dataInkubasi.kategori_bisnis || "Inkubasi Bisnis"}
            </span>
            <h3 className="text-lg font-bold text-[#092B52] mt-2">
              {dataInkubasi.nama_tim}
            </h3>
            <p className="text-xs text-slate-400">
              Reviewer: {dataInkubasi.reviewer_nama || "Belum di-assign"}
            </p>
          </div>

          {dataInkubasi.file_dokumen && (
            <a
              href={`${fileBaseUrl}${dataInkubasi.file_dokumen}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-[#092B52] text-xs font-semibold rounded-xl transition"
            >
              📄 Lihat Dokumen
            </a>
          )}
        </div>

        {/* STEPPER PROGRESS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                step.active
                  ? "border-[#188B9E] bg-cyan-50/50"
                  : "border-slate-100 bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done
                      ? "bg-[#188B9E] text-white"
                      : "bg-slate-300 text-slate-600"
                  }`}
                >
                  {idx + 1}
                </div>
                <h4 className="text-xs font-bold text-[#092B52]">{step.label}</h4>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 pl-8">{step.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingStatus;