import { useState } from 'react';

const initialUsers = [
  { id: 1, nama: 'Budi Santoso', email: 'budi.santoso@itpln.ac.id', role: 'Admin', status: 'Aktif' },
  { id: 2, nama: 'Dr. Hendra Wijaya', email: 'hendra.w@itpln.ac.id', role: 'Reviewer', status: 'Aktif' },
  { id: 3, nama: 'Startup Inovasi AI', email: 'contact@inovasiai.id', role: 'Tenant', status: 'Pending' },
];

const ManajemenUser = () => {
  // Ubah baris ini: hapus setUsers
  const [users] = useState(initialUsers);

  return (
    <div className="space-y-6 font-poppins md:ml-64">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">Manajemen Pengguna</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Kelola hak akses akun admin, reviewer, dan tenant.</p>
        </div>
        <button className="px-4 py-2.5 bg-[#188B9E] hover:bg-[#157888] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto">
          + Tambah Pengguna Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Nama Pengguna</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status Akun</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="p-4 font-semibold text-[#092B52]">{u.nama}</td>
                  <td className="p-4 text-slate-500">{u.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-slate-100 text-[#092B52] rounded-full text-[11px] font-semibold">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                      u.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#092B52] rounded-lg text-[11px] font-medium transition-colors">
                      Edit Role
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

export default ManajemenUser;