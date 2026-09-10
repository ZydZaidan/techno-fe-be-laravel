import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../services/api'; // Sesuaikan relative path ke file api.js kamu

const VerifikatorDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    lolos: 0,
    revisi: 0,
    prosesInkubasi: 0,
    selesai: 0,
    ditolak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/verifikator/pengajuan');
        
        if (res.data && res.data.success) {
          const list = res.data.data || [];
          setStats({
            total: list.length,
            pending: list.filter(item => item.status_verifikasi === 'Pending').length,
            lolos: list.filter(item => item.status_verifikasi === 'Lolos').length,
            revisi: list.filter(item => item.status_verifikasi === 'Revisi').length,
            prosesInkubasi: list.filter(item => item.status_verifikasi === 'Proses Inkubasi').length,
            selesai: list.filter(item => item.status_verifikasi === 'Selesai').length,
            ditolak: list.filter(item => item.status_verifikasi === 'Ditolak').length,
          });
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Pengajuan', value: stats.total, desc: 'Semua usulan inkubasi', color: 'bg-blue-500' },
    { title: 'Pending Verifikasi', value: stats.pending, desc: 'Perlu segera diverifikasi', color: 'bg-amber-500' },
    { title: 'Proses Inkubasi', value: stats.prosesInkubasi, desc: 'Sedang berjalan', color: 'bg-sky-500' },
    { title: 'Program Selesai', value: stats.selesai, desc: 'Telah menyelesaikan tahapan', color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-6 md:ml-64 font-poppins pt-8 px-4 md:px-8 pb-16 bg-[#F9FAFB] min-h-screen">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">Overview Verifikator</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pantau status verifikasi berkas dan penugasan reviewer inkubasi bisnis.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">{item.title}</p>
              <h3 className="text-2xl font-bold text-[#092B52] mt-1">
                {loading ? '...' : item.value}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <div className={`w-3 h-12 rounded-full ${item.color}`} />
          </div>
        ))}
      </div>

      {/* QUICK ACTION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#092B52]">Antrean Verifikasi Proposal</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Terdapat <span className="font-bold text-amber-600">{stats.pending} pengajuan</span> yang belum diperiksa.
          </p>
        </div>
        <Link
          to="/verifikator/inkubasi"
          className="px-5 py-2.5 bg-[#188B9E] text-white text-xs font-semibold rounded-full hover:bg-[#147484] transition-colors shrink-0"
        >
          Proses Verifikasi Now &rarr;
        </Link>
      </div>
    </div>
  );
};

export default VerifikatorDashboard;