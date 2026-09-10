import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/techno';

const ReviewerDashboard = () => {
  const [stats, setStats] = useState({
    totalAssigned: 0,
    needReview: 0,
    completedReview: 0,
    totalLogbookPending: 0,
  });
  const [recentAssigned, setRecentAssigned] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/reviewer/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted && response.data.success) {
          setStats(response.data.data.stats);
          setRecentAssigned(response.data.data.recentProposals || []);
        }
      } catch (error) {
        console.error('Gagal mengambil data dashboard reviewer:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6 md:ml-64 font-poppins">

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Total Tugas Proposal</p>
          <h3 className="text-2xl font-bold text-[#092B52] mt-1">
            {isLoading ? "..." : stats.totalAssigned}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Perlu Dinilai</p>
          <h3 className="text-2xl font-bold text-amber-500 mt-1">
            {isLoading ? "..." : stats.needReview}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Selesai Dinilai</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {isLoading ? "..." : stats.completedReview}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Logbook Pending</p>
          <h3 className="text-2xl font-bold text-sky-600 mt-1">
            {isLoading ? "..." : stats.totalLogbookPending}
          </h3>
        </div>
      </div>

      {/* Recent Assigned Proposals */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-[#092B52]">Proposal Perlu Penilaian Terbaru</h3>
          <Link to="/reviewer/penilaian" className="text-xs text-[#188B9E] font-semibold hover:underline">
            Lihat Semua →
          </Link>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-400 text-center py-6">Memuat proposal...</p>
        ) : recentAssigned.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">Belum ada proposal yang perlu dinilai.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase">
                  <th className="py-3 px-2">Judul Proposal</th>
                  <th className="py-3 px-2">Pengaju</th>
                  <th className="py-3 px-2">Kategori</th>
                  <th className="py-3 px-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {recentAssigned.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-[#092B52]">{item.judul_proposal}</td>
                    <td className="py-3 px-2 text-slate-600">{item.nama_pengaju}</td>
                    <td className="py-3 px-2 text-slate-500">{item.kategori}</td>
                    <td className="py-3 px-2 text-right">
                      <Link
                        to="/reviewer/penilaian"
                        className="px-3 py-1.5 bg-[#188B9E] text-white rounded-full text-[11px] font-medium hover:bg-[#147484] transition"
                      >
                        Nilai
                      </Link>
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

export default ReviewerDashboard;