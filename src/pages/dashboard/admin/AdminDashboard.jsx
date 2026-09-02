// import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total User', value: '142', desc: 'Pengguna terdaftar', color: 'bg-blue-500' },
    { title: 'HKI Pending', value: '18', desc: 'Menunggu approval', color: 'bg-amber-500' },
    { title: 'Berita Rilis', value: '34', desc: 'Artikel terpublikasi', color: 'bg-emerald-500' },
    { title: 'Total Tenant', value: '12', desc: 'Inkubasi aktif', color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-6 font-poppins">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">Overview Dashboard</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Selamat datang kembali di Admin Panel Science Technopark IT-PLN.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">{item.title}</p>
              <h3 className="text-2xl font-bold text-[#092B52] mt-1">{item.value}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <div className={`w-3 h-12 rounded-full ${item.color}`} />
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS & RECENT HKI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* Status System Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 lg:col-span-2">
          <h3 className="text-sm font-bold text-[#092B52]">Status Pengajuan HKI Bulan Ini</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Terverifikasi (Disetujui)</span>
              <span className="font-bold text-emerald-600">24 Dokumen</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[70%]" />
            </div>

            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-slate-600">Pending Approval</span>
              <span className="font-bold text-amber-600">18 Dokumen</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[40%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;