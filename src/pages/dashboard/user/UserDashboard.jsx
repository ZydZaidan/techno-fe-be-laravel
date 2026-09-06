import { useState, useEffect } from "react";
import API from "../../../services/api";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get("/pengajuan-inkubasi/dashboard");
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
  const logbookStats = dashboardData?.logbookStats;

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
    <div className="space-y-6 md:ml-64 font-poppins">
      <div>
        <h2 className="text-lg font-bold text-[#092B52]">Dashboard Tenant</h2>
        <p className="text-xs text-slate-400">
          Pantau progres inkubasi aktif dan metrik logbook mentoring kamu.
        </p>
      </div>

      {/* Metrik Logbook + Count Revisi Proposal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Total Logbook</p>
          <h3 className="text-2xl font-bold text-[#092B52] mt-1">
            {logbookStats ? logbookStats.total : 0}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Logbook Disetujui</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {logbookStats ? logbookStats.approved : 0}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Logbook Menunggu</p>
          <h3 className="text-2xl font-bold text-amber-500 mt-1">
            {logbookStats ? logbookStats.pending : 0}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Revisi Proposal</p>
          <h3 className="text-2xl font-bold text-rose-500 mt-1">
            {dashboardData?.revisiProposalCount ?? dashboardData?.revisiProposal ?? (pengajuan?.status_inkubasi === "Revisi" ? 1 : 0)}
          </h3>
        </div>
      </div>

      {/* Program Inkubasi Terbaru */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-[#092B52]">
            Kegiatan Inkubasi Terbaru
          </h3>
          {pengajuan && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-mono">
              ID: #{pengajuan.id_pengajuan}
            </span>
          )}
        </div>

        {!pengajuan ? (
          <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl">
            <p className="text-xs text-slate-400">
              Kamu belum mendaftar atau mengikuti kegiatan inkubasi aktif saat ini.
            </p>
          </div>
        ) : (
          <div className="p-4 border border-slate-100 bg-slate-50/50 rounded-xl space-y-3 text-xs">
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
              <div>
                <p className="font-semibold text-[#092B52]">
                  {pengajuan.nama_tim}
                </p>
                <p className="text-slate-400">{pengajuan.kategori_bisnis}</p>
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
                        {pengajuan.total_skor}
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