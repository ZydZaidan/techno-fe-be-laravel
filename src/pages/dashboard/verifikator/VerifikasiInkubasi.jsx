import { useState, useEffect } from "react";
import API from "../../../services/api";

const VerifikasiInkubasi = () => {
  const [pengajuanList, setPengajuanList] = useState([]);
  const [reviewerList, setReviewerList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusVerifikasi, setStatusVerifikasi] = useState("Pending");
  const [idReviewer, setIdReviewer] = useState("");
  const [catatanVerifikator, setCatatanVerifikator] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const [resPengajuan, resReviewer] = await Promise.all([
          API.get("/verifikator/pengajuan"),
          API.get("/verifikator/reviewers"),
        ]);

        if (isMounted) {
          if (resPengajuan.data?.success) setPengajuanList(resPengajuan.data.data || []);
          if (resReviewer.data?.success) setReviewerList(resReviewer.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching data verifikator:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  const refetchData = async () => {
    setLoading(true);
    try {
      const [resPengajuan, resReviewer] = await Promise.all([
        API.get("/verifikator/pengajuan"),
        API.get("/verifikator/reviewers"),
      ]);

      if (resPengajuan.data?.success) setPengajuanList(resPengajuan.data.data || []);
      if (resReviewer.data?.success) setReviewerList(resReviewer.data.data || []);
    } catch (err) {
      console.error("Error re-fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setStatusVerifikasi(item.status_verifikasi || "Pending");
    setIdReviewer(item.id_reviewer || "");
    setCatatanVerifikator(item.catatan_verifikator || "");
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await API.put(`/verifikator/pengajuan/${selectedItem.id}`, {
        status_verifikasi: statusVerifikasi,
        id_reviewer: idReviewer || null,
        catatan_verifikator: catatanVerifikator,
      });

      if (res.data?.success) {
        alert("Verifikasi berhasil diperbarui!");
        handleCloseModal();
        refetchData();
      } else {
        alert(res.data?.message || "Gagal memperbarui verifikasi.");
      }
    } catch (err) {
      console.error("Error updating verification:", err);
      alert(err.response?.data?.message || "Terjadi kesalahan koneksi backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Lolos":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
            Lolos Verifikasi
          </span>
        );
      case "Revisi":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">
            Revisi
          </span>
        );
      case "Ditolak":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700">
            Ditolak
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-poppins md:ml-64">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">
          Verifikasi & Plotting Reviewer
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Daftar seluruh proposal pengajuan inkubasi yang perlu dilakukan
          verifikasi berkas dan penunjukan reviewer.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[#092B52] font-semibold border-b border-slate-100">
                <th className="p-4">Kode User</th>
                <th className="p-4">Tim</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Dokumen</th>
                <th className="p-4">Status Administrasi</th>
                <th className="p-4">Reviewer</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-8 text-center text-slate-400 font-medium"
                  >
                    Memuat data pengajuan...
                  </td>
                </tr>
              ) : pengajuanList.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-8 text-center text-slate-400 font-medium"
                  >
                    Belum ada pengajuan inkubasi.
                  </td>
                </tr>
              ) : (
                pengajuanList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4 font-bold text-[#092B52]">
                      {item.user_code_pengusul}
                    </td>
                    <td className="p-4 font-semibold text-slate-700">
                      {item.nama_tim}
                    </td>
                    <td className="p-4 text-slate-500">
                      {item.kategori_bisnis}
                    </td>
                    <td className="p-4">
                      {item.file_dokumen ? (
                        <a
                          href={`${import.meta.env.VITE_FILE_BASE_URL || "http://localhost:5000"}${item.file_dokumen}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#188B9E] hover:underline font-medium"
                        >
                          Lihat File
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">Tidak Ada</span>
                      )}
                    </td>
                    <td className="p-4">
                      {getStatusBadge(item.status_verifikasi)}
                    </td>
                    <td className="p-4 font-medium text-slate-700">
                      {item.nama_reviewer ? (
                        item.nama_reviewer
                      ) : (
                        <span className="text-slate-400 font-normal">
                          Belum Ditempatkan
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="px-3 py-1.5 bg-[#188B9E] text-white rounded-lg hover:bg-[#147484] font-medium transition-colors text-[11px]"
                      >
                        Verifikasi
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL VERIFIKASI */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl font-poppins animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-base font-bold text-[#092B52]">
                Proses Verifikasi: {selectedItem.nama_tim}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#092B52] mb-2">
                  Status Verifikasi Administrasi
                </label>
                <select
                  value={statusVerifikasi}
                  onChange={(e) => setStatusVerifikasi(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#188B9E]"
                >
                  <option value="Pending">Pending (Sedang Diproses)</option>
                  <option value="Revisi">Revisi Berkas</option>
                  <option value="Lolos">Lolos Verifikasi Administrasi</option>
                  <option value="Ditolak">Ditolak Administrasi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092B52] mb-2">
                  Pilih Reviewer Submisi
                </label>
                <select
                  value={idReviewer}
                  onChange={(e) => setIdReviewer(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#188B9E]"
                >
                  <option value="">-- Belum Dipilih / Kosongkan --</option>
                  {reviewerList.map((rev) => (
                    <option key={rev.id} value={rev.id}>
                      {rev.nama} ({rev.user_code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092B52] mb-2">
                  Catatan Verifikator
                </label>
                <textarea
                  rows="3"
                  value={catatanVerifikator}
                  onChange={(e) => setCatatanVerifikator(e.target.value)}
                  placeholder="Masukkan instruksi revisi atau alasan penolakan berkas..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#188B9E]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 rounded-full"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#188B9E] hover:bg-[#147484] rounded-full disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifikasiInkubasi;