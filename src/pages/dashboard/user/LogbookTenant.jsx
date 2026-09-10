import { useState, useEffect, useCallback } from 'react';
import API from '../../../services/api';

const LogbookTenant = () => {
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [listInkubasi, setListInkubasi] = useState([]);
  const [listMentor, setListMentor] = useState([]);
  const [riwayatLogbook, setRiwayatLogbook] = useState([]);

  const [formData, setFormData] = useState({
    id_pengajuan_inkubasi: '',
    id_reviewer: '',
    tanggal_konsultasi: '',
    metode_mentoring: 'Luring',
    aktivitas_mentoring: '',
    progres_bisnis: '',
  });

  const [fileBukti, setFileBukti] = useState(null);

  // Fungsi Fetch Riwayat Logbook
  const fetchRiwayatLogbook = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const res = await API.get('/pengajuan-inkubasi/logbook/my');
      if (res.data.success) {
        setRiwayatLogbook(res.data.data || []);
      }
    } catch (err) {
      console.error("Gagal mengambil riwayat logbook", err);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  // Fetch Data Awal (Inkubasi, Mentor, dan Riwayat)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 1. Ambil Data Inkubasi Tenant
        const resInkubasi = await API.get('/pengajuan-inkubasi/my');
        if (resInkubasi.data.success && resInkubasi.data.data) {
          const list = Array.isArray(resInkubasi.data.data)
            ? resInkubasi.data.data
            : [resInkubasi.data.data];

          setListInkubasi(list);
          if (list.length > 0) {
            setFormData((prev) => ({
              ...prev,
              id_pengajuan_inkubasi: list[0].id,
              id_reviewer: list[0].id_reviewer || '',
            }));
          }
        }

        // 2. Ambil Data Reviewer/Mentor
        const resMentor = await API.get('/auth/reviewers');
        if (resMentor.data.success && resMentor.data.data) {
          setListMentor(resMentor.data.data);
        }

        await fetchRiwayatLogbook();
      } catch (err) {
        console.error("Gagal mengambil data awal", err);
      }
    };

    fetchInitialData();
  }, [fetchRiwayatLogbook]);

  // Handler Ganti Inkubasi
  const handleInkubasiChange = (e) => {
    const selectedId = e.target.value;
    const selectedInkubasi = listInkubasi.find((item) => String(item.id) === String(selectedId));

    setFormData((prev) => ({
      ...prev,
      id_pengajuan_inkubasi: selectedId,
      id_reviewer: selectedInkubasi?.id_reviewer || prev.id_reviewer,
    }));
  };

  // Submit Form Logbook
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('id_pengajuan_inkubasi', formData.id_pengajuan_inkubasi);
      data.append('id_reviewer', formData.id_reviewer);
      data.append('tanggal_konsultasi', formData.tanggal_konsultasi);
      data.append('metode_mentoring', formData.metode_mentoring);
      data.append('aktivitas_mentoring', formData.aktivitas_mentoring);
      data.append('progres_bisnis', formData.progres_bisnis);

      if (fileBukti) {
        data.append('file_bukti', fileBukti);
      }

      const res = await API.post('/pengajuan-inkubasi/logbook', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        alert("E-Logbook mentoring berhasil tersimpan!");
        
        // Reset Form
        setFormData((prev) => ({
          ...prev,
          tanggal_konsultasi: '',
          metode_mentoring: 'Luring',
          aktivitas_mentoring: '',
          progres_bisnis: '',
        }));
        setFileBukti(null);

        // Auto Refresh Tabel Riwayat
        fetchRiwayatLogbook();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mengisi logbook.");
    } finally {
      setLoading(false);
    }
  };

  // Helper Badge Status Approval
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">Disetujui</span>;
      case 'Rejected':
        return <span className="px-2.5 py-1 text-xs font-semibold bg-rose-100 text-rose-700 rounded-full">Ditolak</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">Pending</span>;
    }
  };

  return (
    <div className="space-y-6 md:ml-64 font-poppins pt-8 px-4 md:px-8 pb-16 bg-[#F9FAFB] min-h-screen">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">E-Logbook Mentoring Inkubasi</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Catat aktivitas berkala perkembangan bisnis dan konsultasi bersama mentor.</p>
      </div>

      {/* FORM INPUT LOGBOOK */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-base font-bold text-[#092B52] mb-4">Isi Logbook Baru</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Dropdown Program Inkubasi */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pilih Tim / Tim Inkubasi</label>
            <select
              required
              value={formData.id_pengajuan_inkubasi}
              onChange={handleInkubasiChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            >
              <option value="">-- Pilih Program Inkubasi --</option>
              {listInkubasi.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama_tim} - {item.kategori_bisnis}
                </option>
              ))}
            </select>
          </div>

          {/* Grid Layout Mentor & Metode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pilih Mentor / Reviewer Pendamping</label>
              <select
                value={formData.id_reviewer}
                onChange={(e) => setFormData({ ...formData, id_reviewer: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
              >
                <option value="">-- Pilih Mentor / Reviewer --</option>
                {listMentor.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nama} ({m.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Metode Mentoring</label>
              <select
                value={formData.metode_mentoring}
                onChange={(e) => setFormData({ ...formData, metode_mentoring: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
              >
                <option value="Luring">Luring (Tatap Muka / Offline)</option>
                <option value="Daring">Daring (Online / Zoom / Meet)</option>
              </select>
            </div>
          </div>

          {/* Tanggal Bimbingan */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tanggal Bimbingan / Mentoring</label>
            <input
              type="date"
              required
              value={formData.tanggal_konsultasi}
              onChange={(e) => setFormData({ ...formData, tanggal_konsultasi: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            />
          </div>

          {/* Aktivitas Mentoring */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Aktivitas Mentoring & Masukan Mentor</label>
            <textarea
              rows="3"
              required
              placeholder="Aktivitas bimbingan atau masukan dari mentor..."
              value={formData.aktivitas_mentoring}
              onChange={(e) => setFormData({ ...formData, aktivitas_mentoring: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            />
          </div>

          {/* Progres Bisnis */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Progres & Pencapaian Bisnis</label>
            <textarea
              rows="3"
              required
              placeholder="Rincian progres produk, pasar, atau kendala yang diselesaikan..."
              value={formData.progres_bisnis}
              onChange={(e) => setFormData({ ...formData, progres_bisnis: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            />
          </div>

          {/* Upload Bukti */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Upload Bukti Mentoring (Foto / Document)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFileBukti(e.target.files[0])}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#188B9E]/10 file:text-[#188B9E] hover:file:bg-[#188B9E]/20"
            />
            <p className="text-[10px] text-slate-400 mt-1">Format: JPG, PNG, atau PDF (Maks. 5MB)</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-[#092B52] font-bold rounded-xl transition-all shadow-sm text-sm disabled:opacity-50 mt-2"
          >
            {loading ? "Menyimpan..." : "Simpan Logbook"}
          </button>
        </form>
      </div>

      {/* TABEL RIWAYAT LOGBOOK */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#092B52]">Riwayat Logbook</h3>
          <button 
            onClick={fetchRiwayatLogbook} 
            className="text-xs text-[#188B9E] hover:underline font-semibold"
          >
            Refresh Data
          </button>
        </div>

        {loadingHistory ? (
          <p className="text-xs text-slate-500 text-center py-6">Memuat riwayat logbook...</p>
        ) : riwayatLogbook.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">Belum ada riwayat logbook yang dikirim.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-slate-600">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="p-3 font-semibold text-slate-700">Tanggal</th>
                  <th className="p-3 font-semibold text-slate-700">Mentor</th>
                  <th className="p-3 font-semibold text-slate-700">Metode</th>
                  <th className="p-3 font-semibold text-slate-700">Aktivitas & Progres</th>
                  <th className="p-3 font-semibold text-slate-700">Bukti</th>
                  <th className="p-3 font-semibold text-slate-700">Status</th>
                  <th className="p-3 font-semibold text-slate-700">Catatan Mentor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {riwayatLogbook.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 whitespace-nowrap font-medium text-slate-800">
                      {new Date(log.tanggal_konsultasi).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-3 whitespace-nowrap">{log.nama_reviewer || '-'}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px]">
                        {log.metode_mentoring}
                      </span>
                    </td>
                    <td className="p-3 max-w-xs space-y-1">
                      <p className="font-semibold text-slate-800 line-clamp-2">{log.aktivitas_mentoring}</p>
                      <p className="text-slate-500 line-clamp-2">{log.progres_bisnis}</p>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {log.file_bukti ? (
                        <a 
                          href={`${import.meta.env.VITE_API_URL || ''}${log.file_bukti}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[#188B9E] font-semibold hover:underline"
                        >
                          Lihat File
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {renderStatusBadge(log.status_approval)}
                    </td>
                    <td className="p-3 max-w-xs italic text-slate-500">
                      {log.catatan_mentor || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogbookTenant;