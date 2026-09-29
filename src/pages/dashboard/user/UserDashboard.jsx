import { useState, useEffect } from "react";
import API from "../../../services/api";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get("/techno/inkubasi/dashboard");
        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data dashboard user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading)
    return (
      <p className="text-xs text-slate-400 py-6 text-center">
        Memuat dashboard...
      </p>
    );

  const pengajuan = dashboardData?.pengajuanTerbaru;

  // Helper badge warna berdasarkan status inkubasi
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Lolos":
      case "Diterima":
        return "bg-emerald-100 text-emerald-700";
      case "Sedang Proses":
      case "Proses Inkubasi":
        return "bg-sky-100 text-sky-700";
      case "Selesai":
        return "bg-indigo-100 text-indigo-700";
      case "Ditolak":
        return "bg-rose-100 text-rose-700";
      case "Revisi":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="space-y-6 md:ml-64 font-poppins pt-8 px-4 md:px-8 pb-16 bg-[#F9FAFB] min-h-screen">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">Dashboard Tenant</h2>
        <p className="text-xs text-slate-400">
          Pantau status progres kegiatan inkubasi aktif dan hasil evaluasi proposal kamu.
        </p>
      </div>

      {/* Program Inkubasi Utama */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-[#092B52]">
            Kegiatan Inkubasi
          </h3>
          {pengajuan && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-mono">
              ID: #{pengajuan.id_pengajuan}
            </span>
          )}
        </div>

        {!pengajuan ? (
          <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl space-y-2">
            <p className="text-xs text-slate-500 font-medium">
              Kamu belum mendaftar atau mengikuti kegiatan inkubasi aktif saat ini.
            </p>
            <p className="text-[11px] text-slate-400">
              Silakan ajukan proposal inkubasi baru untuk mulai menggunakan layanan program.
            </p>
          </div>
        ) : (
          <div className="p-4 border border-slate-100 bg-slate-50/50 rounded-xl space-y-3 text-xs">
            <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-slate-100 shadow-2-[#00000005]">
              <div>
                <p className="font-semibold text-[#092B52] text-sm">
                  {pengajuan.nama_tim}
                </p>
                <p className="text-slate-400 mt-0.5">{pengajuan.kategori_bisnis}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-semibold ${renderStatusBadge(
                  pengajuan.status_inkubasi
                )}`}
              >
                {pengajuan.status_inkubasi}
              </span>
            </div>

            {/* Evaluasi Reviewer */}
            {pengajuan.total_skor !== null &&
              pengajuan.total_skor !== undefined && (
                <div className="border-t border-slate-200/60 pt-3 space-y-2">
                  <p className="font-semibold text-[#092B52]">
                    Hasil Penilaian Reviewer (
                    {pengajuan.nama_reviewer || "Reviewer"}):
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded-xl text-center border border-slate-100">
                    <div>
                      <span className="text-slate-400 block">Orisinalitas</span>
                      <strong className="text-[#092B52]">
                        {pengajuan.skor_orisinalitas}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">
                        Kelayakan Bisnis
                      </span>
                      <strong className="text-[#092B52]">
                        {pengajuan.skor_kelayakan_bisnis}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Kesiapan Tekno</span>
                      <strong className="text-[#092B52]">
                        {pengajuan.skor_kesiapan_teknologi}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Total Skor</span>
                      <strong className="text-[#188B9E]">
                        {Number(pengajuan.total_skor).toFixed(1)}
                      </strong>
                    </div>
                  </div>
                  {pengajuan.catatan_rekomendasi && (
                    <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-amber-800">
                      <strong>Catatan Reviewer:</strong>{" "}
                      {pengajuan.catatan_rekomendasi}
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;