import { useState } from 'react';
import API from '../../../services/api';

const LogbookTenant = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_pengajuan_inkubasi: '1',
    tanggal: '',
    kegiatan: '',
    kendala: '',
    rencana_tindak_lanjut: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post('/tenant/logbook', formData);
      if (res.data.success) {
        alert("E-Logbook mentoring berhasil tersimpan!");
        setFormData({
          id_pengajuan_inkubasi: '1',
          tanggal: '',
          kegiatan: '',
          kendala: '',
          rencana_tindak_lanjut: '',
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mengisi logbook.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-poppins">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">E-Logbook Mentoring Inkubasi</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Catat aktivitas berkala perkembangan bisnis dan konsultasi bersama mentor.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tanggal Kegiatan / Mentoring</label>
            <input
              type="date"
              required
              value={formData.tanggal}
              onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Aktivitas & Progres Bisnis</label>
            <textarea
              rows="3"
              required
              placeholder="Rincian aktivitas yang telah dikerjakan..."
              value={formData.kegiatan}
              onChange={(e) => setFormData({ ...formData, kegiatan: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Kendala yang Dihadapi</label>
            <textarea
              rows="2"
              placeholder="Kendala teknis / operasional..."
              value={formData.kendala}
              onChange={(e) => setFormData({ ...formData, kendala: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Rencana Tindak Lanjut</label>
            <textarea
              rows="2"
              placeholder="Langkah perbaikan selanjutnya..."
              value={formData.rencana_tindak_lanjut}
              onChange={(e) => setFormData({ ...formData, rencana_tindak_lanjut: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-[#092B52] font-bold rounded-xl transition-all shadow-sm text-sm disabled:opacity-50"
          >
            {loading ? "Simpan..." : "Simpan Logbook"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogbookTenant;