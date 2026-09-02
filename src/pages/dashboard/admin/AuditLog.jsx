import { useState } from 'react';

const initialLogs = [
  { id: 1, waktu: '12 Okt 2024, 14:30', pengguna: 'Budi Santoso', role: 'Admin', aktivitas: 'Melakukan verifikasi dokumen HKI ID-4421', ip: '192.168.1.105' },
  { id: 2, waktu: '12 Okt 2024, 13:15', pengguna: 'Startup Inovasi AI', role: 'Tenant', aktivitas: 'Mengunggah proposal tahap inkubasi', ip: '114.125.66.82' },
  { id: 3, waktu: '12 Okt 2024, 11:05', pengguna: 'Dr. Hendra Wijaya', role: 'Reviewer', aktivitas: 'Mengubah skor Monev Tim Alpha', ip: '202.43.11.9' },
  { id: 4, waktu: '12 Okt 2024, 09:00', pengguna: 'System', role: 'System', aktivitas: 'Backup database otomatis berhasil', ip: 'localhost' },
  { id: 5, waktu: '11 Okt 2024, 16:45', pengguna: 'Ani Lestari', role: 'Admin', aktivitas: 'Login berhasil', ip: '192.168.1.112' },
];

const getRoleBadge = (role) => {
  switch (role) {
    case 'Admin':
      return 'bg-amber-100 text-amber-700';
    case 'Tenant':
      return 'bg-sky-100 text-sky-700';
    case 'Reviewer':
      return 'bg-indigo-100 text-indigo-700';
    case 'System':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Semua Role');
  const [filterDate, setFilterDate] = useState('');

  const filteredLogs = initialLogs.filter((log) => {
    const matchSearch = log.pengguna.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.aktivitas.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = selectedRole === 'Semua Role' || log.role === selectedRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6 font-poppins">
      {/* HEADER PAGE */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">System Audit Log & Riwayat Aktivitas</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pantau semua aktivitas sistem dan perubahan data oleh pengguna.
        </p>
      </div>

      {/* CARD MAIN */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-6">
        
        {/* FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari aktivitas atau pengguna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#188B9E] transition-colors"
            />
          </div>

          {/* Date Picker */}
          <div className="relative">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-600 focus:outline-none focus:border-[#188B9E] transition-colors"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#188B9E] transition-colors"
            >
              <option value="Semua Role">Semua Role</option>
              <option value="Admin">Admin</option>
              <option value="Tenant">Tenant</option>
              <option value="Reviewer">Reviewer</option>
              <option value="System">System</option>
            </select>
          </div>
        </div>

        {/* TABLE LOGS */}
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Waktu</th>
                <th className="p-4">Pengguna</th>
                <th className="p-4">Role</th>
                <th className="p-4">Aktivitas</th>
                <th className="p-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 whitespace-nowrap text-slate-500">{log.waktu}</td>
                  <td className="p-4 whitespace-nowrap font-semibold text-[#092B52]">{log.pengguna}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getRoleBadge(log.role)}`}>
                      {log.role}
                    </span>
                  </td>
                  <td className="p-4 min-w-60 text-slate-600">{log.aktivitas}</td>
                  <td className="p-4 whitespace-nowrap font-mono text-slate-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500">
          <p>Menampilkan 1 hingga {filteredLogs.length} dari 124 entri</p>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50">&lt;</button>
            <button className="px-3 py-1.5 rounded-lg bg-[#188B9E] text-white font-semibold">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">3</button>
            <span className="px-1">...</span>
            <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">&gt;</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuditLog;