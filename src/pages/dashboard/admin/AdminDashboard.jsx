import { useState, useEffect, useCallback } from "react";
import API from "../../../services/api";

const AdminDashboard = () => {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalBerita: 0,
    tenantAktif: 0,
    inkubasiStats: {
      pending: 0,
      inkubasi: 0,
      selesai: 0,
      ditolak: 0,
      total: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data statistik dari BE
  const fetchDashboardStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/admin/stats");
      if (response.data?.success && response.data?.data) {
        setStatsData(response.data.data);
      }
    } catch (error) {
      console.error("Gagal memuat data statistik dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchDashboardStats();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchDashboardStats]);

  const totalUsers = statsData?.totalUsers || 0;
  const totalBerita = statsData?.totalBerita || 0;
  const tenantAktif = statsData?.tenantAktif || 0;
  const inkubasiStats = statsData?.inkubasiStats || {
    pending: 0,
    inkubasi: 0,
    selesai: 0,
    ditolak: 0,
    total: 0,
  };

  // hitung persentase untuk progress bar
  const totalInkubasi = inkubasiStats.total || 0;
  const getPercentage = (val) =>
    totalInkubasi > 0 ? Math.round((val / totalInkubasi) * 100) : 0;

  const pctPending = getPercentage(inkubasiStats.pending);
  const pctBerjalan = getPercentage(inkubasiStats.inkubasi);
  const pctSelesai = getPercentage(inkubasiStats.selesai);
  const pctDitolak = getPercentage(inkubasiStats.ditolak);

  const cards = [
    {
      title: "Total User",
      value: totalUsers,
      desc: "Pengguna terdaftar",
      color: "bg-blue-500",
    },
    {
      title: "Tenant Aktif",
      value: tenantAktif,
      desc: "Sedang masa inkubasi",
      color: "bg-indigo-500",
    },
    {
      title: "Pengajuan Pending",
      value: inkubasiStats.pending,
      desc: "Menunggu verifikasi",
      color: "bg-amber-500",
    },
    {
      title: "Berita Rilis",
      value: totalBerita,
      desc: "Artikel terpublikasi",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="space-y-6 font-poppins md:ml-64">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">
          Overview Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Selamat datang kembali di Admin Panel Science Technopark IT-PLN.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-medium text-slate-400">{item.title}</p>
              <h3 className="text-2xl font-bold text-[#092B52] mt-1">
                {isLoading ? "..." : item.value}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <div className={`w-3 h-12 rounded-full ${item.color}`} />
          </div>
        ))}
      </div>

      {/* STATUS PROGRAM INKUBASI */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#092B52]">
              Ringkasan Status Pengajuan Inkubasi
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Breakdown akumulasi status pengajuan seluruh tim tenant.
            </p>
          </div>
          <span className="text-xs font-bold bg-slate-100 text-[#092B52] px-3 py-1 rounded-full">
            Total: {inkubasiStats.total} Proposal
          </span>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-400 text-center py-4">
            Memuat statistik...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Pending */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600">
                  ⏳ Pending / Verifikasi
                </span>
                <span className="font-bold text-amber-600">
                  {inkubasiStats.pending} Proposal ({pctPending}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-500"
                  style={{ width: `${pctPending}%` }}
                />
              </div>
            </div>

            {/* Status Inkubasi Berjalan */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600">
                  🚀 Sedang Berjalan (Inkubasi)
                </span>
                <span className="font-bold text-cyan-600">
                  {inkubasiStats.inkubasi} Proposal ({pctBerjalan}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 h-full transition-all duration-500"
                  style={{ width: `${pctBerjalan}%` }}
                />
              </div>
            </div>

            {/* Status Selesai / Lulus */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600">
                  🎓 Telah Lulus (Selesai)
                </span>
                <span className="font-bold text-emerald-600">
                  {inkubasiStats.selesai} Proposal ({pctSelesai}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${pctSelesai}%` }}
                />
              </div>
            </div>

            {/* Status Ditolak */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600">
                  ❌ Ditolak
                </span>
                <span className="font-bold text-rose-600">
                  {inkubasiStats.ditolak} Proposal ({pctDitolak}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full transition-all duration-500"
                  style={{ width: `${pctDitolak}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;