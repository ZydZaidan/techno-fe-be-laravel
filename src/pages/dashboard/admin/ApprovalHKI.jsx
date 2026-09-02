import { useState } from 'react';

const initialHKI = [
  { id: 'HKI-001', judul: 'Sistem Monitoring Smart Grid Listrik', pengusul: 'Dr. Ahmad Fauzi', tipe: 'Paten Sederhana', tanggal: '10 Okt 2024', status: 'Pending' },
  { id: 'HKI-002', judul: 'Aplikasi Manajemen Limbah Baterai EV', pengusul: 'Tim Inovasi ZeroWaste', tipe: 'Hak Cipta Software', tanggal: '08 Okt 2024', status: 'Approved' },
  { id: 'HKI-003', judul: 'Desain Industri Blade Turbin Angin Mikro', pengusul: 'Rahmat Hidayat, M.T.', tipe: 'Desain Industri', tanggal: '05 Okt 2024', status: 'Rejected' },
];

const ApprovalHKI = () => {
  const [hkiList, setHkiList] = useState(initialHKI);

  const handleStatusChange = (id, newStatus) => {
    setHkiList(hkiList.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="space-y-6 font-poppins">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">Approval HKI</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Verifikasi dan setujui usulan Hak Kekayaan Intelektual dari civitas & tenant.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-4">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Kode ID</th>
                <th className="p-4">Judul Inovasi</th>
                <th className="p-4">Pengusul</th>
                <th className="p-4">Jenis HKI</th>
                <th className="p-4">Tanggal Pengajuan</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {hkiList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#188B9E]">{item.id}</td>
                  <td className="p-4 font-semibold text-[#092B52] min-w-[200px]">{item.judul}</td>
                  <td className="p-4">{item.pengusul}</td>
                  <td className="p-4 text-slate-500">{item.tipe}</td>
                  <td className="p-4 text-slate-400">{item.tanggal}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                      item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusChange(item.id, 'Approved')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-medium transition-colors"
                    >
                      Setujui
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, 'Rejected')}
                      className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-[11px] font-medium transition-colors"
                    >
                      Tolak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovalHKI;