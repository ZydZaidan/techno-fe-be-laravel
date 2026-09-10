import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/techno';
const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL || 'http://localhost:5000/uploads';

const ApprovalLogbook = () => {
  const [logbooks, setLogbooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLogbook, setSelectedLogbook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [approvalData, setApprovalData] = useState({
    status_approval: 'Approved',
    catatan_mentor: '',
  });

  const fetchLogbooks = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/reviewer/logbook`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setLogbooks(response.data.data);
      }
    } catch (error) {
      console.error('Gagal mengambil daftar logbook:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchLogbooks();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchLogbooks]);

  const handleOpenModal = (logbook) => {
    setSelectedLogbook(logbook);
    setApprovalData({
      status_approval: logbook.status_approval || 'Approved',
      catatan_mentor: logbook.catatan_mentor || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmitApproval = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const token = sessionStorage.getItem('token');
      const response = await axios.put(
        `${API_BASE_URL}/reviewer/logbook/${selectedLogbook.id}`,
        approvalData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Status logbook berhasil diperbarui!');
        setIsModalOpen(false);
        fetchLogbooks();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal memperbarui logbook');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 md:ml-64 font-poppins pt-8 px-4 md:px-8 pb-16 bg-[#F9FAFB] min-h-screen">
      <div>
        <h2 className="text-lg font-bold text-[#092B52]">Logbook Mentoring Tenant</h2>
        <p className="text-xs text-slate-400">
          Tinjau catatan konsultasi harian/mingguan tenant dan berikan masukan atau persetujuan.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm overflow-x-auto">
        {isLoading ? (
          <p className="text-xs text-slate-400 text-center py-6">Memuat logbook...</p>
        ) : logbooks.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">Belum ada logbook tenant yang dikirim.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase">
                <th className="py-3 px-2">Tanggal</th>
                <th className="py-3 px-2">Nama Tenant</th>
                <th className="py-3 px-2">Aktivitas Mentoring</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {logbooks.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-3 px-2 text-slate-500">{item.tanggal_konsultasi}</td>
                  <td className="py-3 px-2 font-medium text-[#092B52]">{item.nama_tenant}</td>
                  <td className="py-3 px-2 text-slate-600 max-w-xs truncate">{item.aktivitas_mentoring}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        item.status_approval === 'Approved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.status_approval === 'Rejected'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {item.status_approval || 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="px-3 py-1.5 bg-[#188B9E] text-white rounded-full text-[11px] font-medium hover:bg-[#147484] transition"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Review Logbook */}
      {isModalOpen && selectedLogbook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-[#092B52]">Review Logbook Mentoring</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Detail Logbook dari Tenant */}
            <div className="space-y-3 text-xs text-slate-600">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <p><strong className="text-[#092B52]">Tenant:</strong> {selectedLogbook.nama_tenant}</p>
                <p><strong className="text-[#092B52]">Tanggal:</strong> {selectedLogbook.tanggal_konsultasi}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl">
                <strong className="text-[#092B52] block mb-1">Aktivitas Mentoring:</strong>
                <p className="whitespace-pre-line">{selectedLogbook.aktivitas_mentoring}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl">
                <strong className="text-[#092B52] block mb-1">Progres Bisnis:</strong>
                <p className="whitespace-pre-line">{selectedLogbook.progres_bisnis || '-'}</p>
              </div>

              {/* Tampilan Kendala & Solusi bila ada */}
              {(selectedLogbook.kendala || selectedLogbook.solusi) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-xl">
                    <strong className="text-rose-800 block mb-1">Kendala:</strong>
                    <p>{selectedLogbook.kendala || '-'}</p>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl">
                    <strong className="text-emerald-800 block mb-1">Rencana Solusi:</strong>
                    <p>{selectedLogbook.solusi || '-'}</p>
                  </div>
                </div>
              )}

              {/* Tautan Berkas / Lampiran Dokumentasi */}
              {selectedLogbook.file_dokumentasi && (
                <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-[#092B52]">Dokumentasi / Lampiran:</span>
                  <a
                    href={`${FILE_BASE_URL}/logbook/${selectedLogbook.file_dokumentasi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-[#092B52] text-white text-[11px] rounded-lg hover:bg-slate-800 transition"
                  >
                    Lihat Lampiran
                  </a>
                </div>
              )}
            </div>

            {/* Form Input Reviewer */}
            <form onSubmit={handleSubmitApproval} className="space-y-4 text-xs pt-2 border-t">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Status Persetujuan</label>
                <select
                  value={approvalData.status_approval}
                  onChange={(e) => setApprovalData({ ...approvalData, status_approval: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none bg-white font-medium"
                >
                  <option value="Approved">Approved (Disetujui)</option>
                  <option value="Rejected">Rejected (Perlu Perbaikan / Ditolak)</option>
                  <option value="Pending">Pending (Menunggu)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Catatan / Masukan Mentor</label>
                <textarea
                  rows="3"
                  value={approvalData.catatan_mentor}
                  onChange={(e) => setApprovalData({ ...approvalData, catatan_mentor: e.target.value })}
                  placeholder="Tuliskan arahan atau umpan balik untuk tenant..."
                  className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-full font-medium hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#188B9E] text-white rounded-full font-medium hover:bg-[#147484] disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Persetujuan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalLogbook;