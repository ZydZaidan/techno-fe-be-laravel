import { useState, useEffect } from 'react';
import axios from 'axios';

const PenilaianProposal = () => {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Evaluasi Rubrik
  const [rubrik, setRubrik] = useState({
    skor_orisinalitas: 0,
    skor_kelayakan_bisnis: 0,
    skor_kesiapan_teknologi: 0,
    rekomendasi: 'Lolos',
    catatan_rekomendasi: '',
  });

  // Base URL Dinamis dari .env
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/techno';
  const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL || 'http://localhost:5000/uploads';

  const loadProposals = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/reviewer/proposals`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setProposals(response.data.data);
      }
    } catch (error) {
      console.error('Gagal memuat proposal reviewer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/reviewer/proposals`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted && response.data.success) {
          setProposals(response.data.data);
        }
      } catch (error) {
        console.error('Gagal memuat proposal reviewer:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, [API_BASE_URL]);

  const handleOpenReview = (proposal) => {
    setSelectedProposal(proposal);
    setRubrik({
      skor_orisinalitas: proposal.evaluasi?.skor_orisinalitas || 0,
      skor_kelayakan_bisnis: proposal.evaluasi?.skor_kelayakan_bisnis || 0,
      skor_kesiapan_teknologi: proposal.evaluasi?.skor_kesiapan_teknologi || 0,
      rekomendasi: proposal.evaluasi?.rekomendasi || 'Lolos',
      catatan_rekomendasi: proposal.evaluasi?.catatan_rekomendasi || '',
    });
    setIsModalOpen(true);
  };

  const calculateTotal = () => {
    return (
      Number(rubrik.skor_orisinalitas) +
      Number(rubrik.skor_kelayakan_bisnis) +
      Number(rubrik.skor_kesiapan_teknologi)
    );
  };

  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...rubrik,
        total_skor: calculateTotal(),
      };

      const response = await axios.post(
        `${API_BASE_URL}/reviewer/evaluasi/${selectedProposal.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Penilaian proposal berhasil disimpan!');
        setIsModalOpen(false);
        loadProposals();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menyimpan penilaian');
    }
  };

  return (
    <div className="space-y-6 font-poppins md:ml-64">
      <div>
        <h2 className="text-lg font-bold text-[#092B52]">Penilaian Substantif Proposal</h2>
        <p className="text-xs text-slate-400">
          Daftar proposal lolos berkas yang ditugaskan untuk evaluasi rubrik & rekomendasi kelayakan.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm overflow-x-auto">
        {isLoading ? (
          <p className="text-xs text-slate-400 text-center py-6">Memuat proposal...</p>
        ) : proposals.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">Belum ada proposal yang perlu dinilai.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase">
                <th className="py-3 px-2">Judul Proposal</th>
                <th className="py-3 px-2">Pengaju</th>
                <th className="py-3 px-2">Skor Total</th>
                <th className="py-3 px-2">Status Penilaian</th>
                <th className="py-3 px-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {proposals.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-3 px-2 font-medium text-[#092B52]">{item.judul_proposal}</td>
                  <td className="py-3 px-2 text-slate-600">{item.nama_pengaju}</td>
                  <td className="py-3 px-2 font-bold text-[#188B9E]">
                    {item.evaluasi ? item.evaluasi.total_skor : '-'}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        item.evaluasi
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {item.evaluasi ? 'Sudah Evaluasi' : 'Belum Evaluasi'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleOpenReview(item)}
                      className="px-3 py-1.5 bg-[#092B52] text-white rounded-full text-[11px] font-medium hover:bg-[#07203d] transition"
                    >
                      {item.evaluasi ? 'Edit Nilai' : 'Beri Nilai'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Penilaian Proposal */}
      {isModalOpen && selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-[#092B52]">Rubrik Penilaian Proposal</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Informasi Detail & Tombol Akses File PDF */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-wrap justify-between items-center gap-3">
              <div>
                <p className="text-xs font-bold text-[#092B52]">{selectedProposal.judul_proposal}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Pengaju: {selectedProposal.nama_pengaju}</p>
              </div>
              {selectedProposal.file_dokumen ? (
                <a
                  href={`${FILE_BASE_URL}/documents/${selectedProposal.file_dokumen}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#092B52] text-white text-[11px] font-medium rounded-lg hover:bg-slate-800 transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Lihat PDF
                </a>
              ) : (
                <span className="text-[11px] text-slate-400 italic">Berkas tidak tersedia</span>
              )}
            </div>

            <form onSubmit={handleSubmitEvaluation} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Orisinalitas & Inovasi (Max: 35)
                </label>
                <input
                  type="number"
                  min="0"
                  max="35"
                  value={rubrik.skor_orisinalitas}
                  onChange={(e) => setRubrik({ ...rubrik, skor_orisinalitas: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Kelayakan Bisnis & Pasar (Max: 35)
                </label>
                <input
                  type="number"
                  min="0"
                  max="35"
                  value={rubrik.skor_kelayakan_bisnis}
                  onChange={(e) => setRubrik({ ...rubrik, skor_kelayakan_bisnis: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Kesiapan Teknologi & Tim (Max: 30)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={rubrik.skor_kesiapan_teknologi}
                  onChange={(e) => setRubrik({ ...rubrik, skor_kesiapan_teknologi: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                  required
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center font-bold text-[#092B52]">
                <span>Total Skor Evaluasi:</span>
                <span className="text-sm text-[#188B9E]">{calculateTotal()} / 100</span>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Rekomendasi Akhir</label>
                <select
                  value={rubrik.rekomendasi}
                  onChange={(e) => setRubrik({ ...rubrik, rekomendasi: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none bg-white"
                >
                  <option value="Lolos">Rekomendasikan Lolos (Diterima)</option>
                  <option value="Ditolak">Rekomendasikan Ditolak</option>
                  <option value="Revisi">Perlu Revisi Substantif</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Catatan Evaluator</label>
                <textarea
                  rows="3"
                  value={rubrik.catatan_rekomendasi}
                  onChange={(e) => setRubrik({ ...rubrik, catatan_rekomendasi: e.target.value })}
                  placeholder="Masukkan catatan masukan & alasan penilaian..."
                  className="w-full px-3 py-2 border rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-full font-medium hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#188B9E] text-white rounded-full font-medium hover:bg-[#147484]"
                >
                  Simpan Evaluasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PenilaianProposal;