import { useState } from 'react';

const initialNews = [
  { id: 1, judul: 'IT-PLN Technopark Resmi Luncurkan Program Inkubasi 2026', kategori: 'Berita Utama', tanggal: '01 Okt 2024', status: 'Published' },
  { id: 2, judul: 'Workshop AR-volution AR & VR Dalam Industri Energi', kategori: 'Event', tanggal: '28 Sep 2024', status: 'Draft' },
];

const KelolaBerita = () => {
  // Ubah baris ini: hapus setNews
  const [news] = useState(initialNews);

  return (
    <div className="space-y-6 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">Kelola Berita & Artikel</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Buat, sunting, dan publikasikan artikel berita terkini.</p>
        </div>
        <button className="px-4 py-2.5 bg-[#188B9E] hover:bg-[#157888] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto">
          + Tulis Berita Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Judul Artikel</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Tanggal Rilis</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-semibold text-[#092B52] min-w-[240px]">{item.judul}</td>
                  <td className="p-4 text-slate-500">{item.kategori}</td>
                  <td className="p-4 text-slate-400">{item.tanggal}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                      item.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#092B52] rounded-lg text-[11px] font-medium transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[11px] font-medium transition-colors">
                      Hapus
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

export default KelolaBerita;