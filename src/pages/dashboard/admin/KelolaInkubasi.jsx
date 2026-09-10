import { useState, useEffect, useMemo, useCallback } from "react";
import API from "../../../services/api";

const KelolaInkubasi = () => {
  const [inkubasiList, setInkubasiList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter States
  const [filterBulan, setFilterBulan] = useState("");
  const [filterStatus, setFilterStatus] = useState("Inkubasi"); // Default menampilkan yang sedang berjalan

  const fetchMasterData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/admin/master-inkubasi");
      if (response.data?.success) {
        setInkubasiList(response.data.data || []);
      }
    } catch (error) {
      console.error("Gagal memuat data inkubasi:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchMasterData();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchMasterData]);

  // Logika Multi-Filter (Bulan & Status)
  const filteredList = useMemo(() => {
    let result = inkubasiList;

    // 1. Filter by Status
    if (filterStatus !== "Semua") {
      result = result.filter((item) => item.status_inkubasi === filterStatus);
    }

    // 2. Filter by Bulan
    if (filterBulan) {
      result = result.filter((item) => {
        if (!item.created_at) return false;
        const date = new Date(item.created_at);
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        return yearMonth === filterBulan;
      });
    }

    return result;
  }, [filterBulan, filterStatus, inkubasiList]);

  // Menghitung berapa data yang valid untuk diluluskan secara massal (Hanya yang berstatus 'Inkubasi')
  const validForCompletion = useMemo(() => {
    return filteredList.filter((item) => item.status_inkubasi === "Inkubasi");
  }, [filteredList]);

  // Fungsi Bulk Update (Luluskan Semua di Tabel yang Aktif)
  const handleSelesaikanSemua = async () => {
    if (validForCompletion.length === 0) {
      alert("Tidak ada tim berstatus 'Inkubasi' pada tabel saat ini.");
      return;
    }

    const confirmMessage = `Apakah Anda yakin ingin MELULUSKAN ${validForCompletion.length} tim ini dari program inkubasi?`;
    if (!window.confirm(confirmMessage)) return;

    setIsSubmitting(true);
    try {
      const idsToComplete = validForCompletion.map((item) => item.id);
      const response = await API.put("/admin/inkubasi/bulk-selesai", {
        ids: idsToComplete,
      });

      if (response.data?.success) {
        alert("Berhasil! Tim terpilih telah diselesaikan masa inkubasinya.");
        fetchMasterData();
      }
    } catch (error) {
      console.error("Gagal menyelesaikan inkubasi:", error);
      alert("Terjadi kesalahan saat mengupdate status kelulusan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fungsi Update Status per Baris (Dropdown)
  const handleStatusChange = async (id, newStatus) => {
    const confirmMsg = `Ubah status tim ini menjadi "${newStatus}"?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      // Endpoint BE yang akan kita buat nanti
      const response = await API.put(`/admin/inkubasi/${id}/status`, {
        status: newStatus,
      });

      if (response.data?.success) {
        alert("Status inkubasi berhasil diperbarui!");
        fetchMasterData();
      }
    } catch (error) {
      console.error("Gagal mengubah status:", error);
      alert(error.response?.data?.message || "Gagal memperbarui status.");
    }
  };

  // Fungsi Hapus Data Inkubasi per Baris
  const handleDeleteInkubasi = async (id, namaTim) => {
    const confirmMsg = `PERINGATAN: Apakah Anda yakin ingin menghapus data pengajuan inkubasi "${namaTim}"? Tindakan ini permanen.`;
    if (!window.confirm(confirmMsg)) return;

    try {
      // Endpoint BE yang akan kita buat nanti
      const response = await API.delete(`/admin/inkubasi/${id}`);

      if (response.data?.success) {
        alert("Data pengajuan inkubasi berhasil dihapus.");
        fetchMasterData();
      }
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert(error.response?.data?.message || "Gagal menghapus data inkubasi.");
    }
  };

  return (
    <div className="space-y-6 md:ml-64 font-poppins pt-8 px-4 md:px-8 pb-16 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">
            Kelola Master Inkubasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau seluruh riwayat proposal, ubah status, dan tetapkan kelulusan program inkubasi.
          </p>
        </div>
      </div>

      {/* Control Panel: Filter & Action */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Filter Status */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600 shrink-0">
              Status:
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#188B9E] outline-none"
            >
              <option value="Semua">Semua Riwayat</option>
              <option value="Inkubasi">Sedang Inkubasi</option>
              <option value="Pending">Pending / Verifikasi</option>
              <option value="Selesai">Telah Lulus (Selesai)</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>

          {/* Filter Bulan */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600 shrink-0">
              Bulan:
            </label>
            <input
              type="month"
              value={filterBulan}
              onChange={(e) => setFilterBulan(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#188B9E] outline-none"
            />
            {filterBulan && (
              <button
                onClick={() => setFilterBulan("")}
                className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Tombol Bulk Update (Luluskan Semua dalam Filter Aktif) */}
        <button
          onClick={handleSelesaikanSemua}
          disabled={isSubmitting || validForCompletion.length === 0}
          className="w-full md:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
        >
          {isSubmitting ? (
            "Memproses..."
          ) : (
            <>
              <span>🎓</span> Luluskan Batch ({validForCompletion.length} Tim)
            </>
          )}
        </button>
      </div>

      {/* Table Data */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-xs text-slate-400 text-center py-8 font-medium">
              Memuat data inkubasi...
            </p>
          ) : filteredList.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8 font-medium">
              Tidak ada data yang sesuai dengan filter yang dipilih.
            </p>
          ) : (
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold text-slate-500 uppercase">
                  <th className="py-3 px-4">Nama Tim / Proposal</th>
                  <th className="py-3 px-4">Pengusul</th>
                  <th className="py-3 px-4">Mentor / Reviewer</th>
                  <th className="py-3 px-4">Tanggal Pengajuan</th>
                  <th className="py-3 px-4">Ubah Status (Manual)</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#092B52]">{item.nama_tim}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {item.kategori_bisnis}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {item.nama_pengusul}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {item.nama_reviewer || "-"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="py-3.5 px-4">
                      {/* Dropdown Interaktif Ubah Status Per Baris */}
                      <select
                        value={item.status_inkubasi || "Pending"}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                          item.status_inkubasi === "Inkubasi"
                            ? "bg-cyan-50 border-cyan-200 text-cyan-800"
                            : item.status_inkubasi === "Selesai"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : item.status_inkubasi === "Ditolak"
                            ? "bg-rose-50 border-rose-200 text-rose-800"
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Inkubasi">Inkubasi (Berjalan)</option>
                        <option value="Selesai">Selesai (Lulus)</option>
                        <option value="Ditolak">Ditolak</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {/* Tombol Hapus Baris */}
                      <button
                        onClick={() => handleDeleteInkubasi(item.id, item.nama_tim)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-[11px] font-semibold transition inline-flex items-center gap-1"
                        title="Hapus Data Inkubasi"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default KelolaInkubasi;