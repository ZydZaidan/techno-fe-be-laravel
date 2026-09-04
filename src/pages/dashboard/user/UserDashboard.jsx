import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const stats = [
    { title: 'Total Pengajuan', value: '2', desc: 'Proposal inkubasi & HKI', color: 'bg-blue-500' },
    { title: 'Status Inkubasi', value: 'Diproses', desc: 'Tahap verifikasi', color: 'bg-amber-500' },
    { title: 'Status HKI', value: 'Draft', desc: 'Belum di-submit', color: 'bg-indigo-500' },
    { title: 'Logbook Disetujui', value: '4', desc: 'Laporan mingguan', color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6 font-poppins">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">Overview Pengusul</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Pantau progres pengajuan inkubasi, layanan HKI, dan kegiatan logbook kamu.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QUICK ACTIONS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#092B52]">Aksi Cepat</h3>
          <div className="space-y-3">
            <Link to="/user/inkubasi/pengajuan" className="block w-full text-center py-3 px-4 bg-[#188B9E] hover:bg-[#092B52] text-white font-bold text-xs rounded-xl transition-all shadow-sm">
              + Ajukan Proposal Inkubasi
            </Link>
            <Link to="/user/hki/pengajuan" className="block w-full text-center py-3 px-4 bg-[#092B52] hover:bg-[#188B9E] text-white font-bold text-xs rounded-xl transition-all shadow-sm">
              + Ajukan Permohonan HKI
            </Link>
            <Link to="/user/inkubasi/logbook" className="block w-full text-center py-3 px-4 bg-amber-400 hover:bg-amber-500 text-[#092B52] font-bold text-xs rounded-xl transition-all shadow-sm">
              + Isi E-Logbook Tenant
            </Link>
          </div>
        </div>

        {/* RECENT STATUS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#092B52]">Ringkasan Status Pengajuan</h3>
            <Link to="/user/tracking" className="text-xs font-bold text-[#188B9E] hover:underline">Lihat Detail Tracking →</Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 border border-slate-100 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-200">
                  Verifikasi Administrasi
                </span>
                <h4 className="text-sm font-bold text-[#092B52] mt-2">IoT Smart Metering Grid</h4>
                <p className="text-xs text-slate-400 mt-0.5">Program Inkubasi Bisnis • Dikirim 3 Sep 2026</p>
              </div>
              <span className="text-xs font-bold text-amber-600">Diproses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;