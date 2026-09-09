import { useState, useEffect, useCallback } from 'react';
import API from '../../../services/api';

const EyeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const KelolaBerita = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const [formData, setFormData] = useState({
    judul: '',
    ringkasan: '',
    kategori: 'Peresmian',
    isi_artikel: '',
    status_publikasi: 'Published',
    is_highlight: false,
    gambar_url: '',
  });

  const fetchBerita = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/berita');
      if (res.data?.success) {
        setNews(res.data.data);
      }
    } catch (err) {
      console.error('Gagal ambil berita:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchBerita();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchBerita]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setSelectedNews(item);
      setFormData({
        judul: item.judul || '',
        ringkasan: item.ringkasan || '',
        kategori: item.kategori || 'Peresmian',
        isi_artikel: item.konten || '',
        status_publikasi: item.status_publikasi || 'Published',
        is_highlight: Boolean(item.is_highlight),
        gambar_url: item.gambar_url || '',
      });
    } else {
      setSelectedNews(null);
      setFormData({
        judul: '',
        ringkasan: '',
        kategori: 'Peresmian',
        isi_artikel: '',
        status_publikasi: 'Published',
        is_highlight: false,
        gambar_url: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedNews) {
        await API.put(`/berita/${selectedNews.id}`, formData);
      } else {
        await API.post('/berita', formData);
      }
      setIsModalOpen(false);
      void fetchBerita();
    } catch (err) {
      console.error('Gagal simpan berita:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus artikel ini?')) {
      try {
        await API.delete(`/berita/${id}`);
        void fetchBerita();
      } catch (err) {
        console.error('Gagal hapus berita:', err);
      }
    }
  };

  return (
    <div className="space-y-6 font-poppins md:ml-64">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">Kelola Berita & Artikel</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Buat, sunting, dan publikasikan artikel berita terkini.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 bg-[#188B9E] hover:bg-[#157888] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
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
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-slate-400">Memuat artikel...</td>
                </tr>
              ) : news.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-slate-400">Belum ada artikel.</td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-[#092B52] min-w-60">
                      <div className="flex items-center gap-2">
                        {item.judul}
                        {Boolean(item.is_highlight) && (
                          <span className="bg-amber-100 text-amber-700 text-[9px] px-2 py-0.5 rounded-full font-bold">
                            ⭐ Highlight
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-slate-500">{item.kategori}</td>
                    <td className="p-4 text-slate-400">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                        item.status_publikasi === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status_publikasi}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-1.5">
                      <button
                        onClick={() => window.open(`/publikasi/${item.id}`, '_blank')}
                        className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-lg text-[11px] font-medium transition-colors inline-flex items-center gap-1"
                        title="Preview Berita"
                      >
                        <EyeIcon className="w-3.5 h-3.5" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#092B52] rounded-lg text-[11px] font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[11px] font-medium transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM TAMBAH / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#092B52]">
              {selectedNews ? 'Edit Artikel' : 'Tambah Artikel Baru'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Judul Artikel</label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-[#188B9E]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Ringkasan Singkat (Untuk Card)</label>
                <textarea
                  rows="2"
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                  placeholder="Ringkasan singkat berita..."
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-[#188B9E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kategori</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full border rounded-lg p-2.5 outline-none focus:border-[#188B9E]"
                  >
                    <option value="Peresmian">Peresmian</option>
                    <option value="Startup">Startup</option>
                    <option value="Program">Program</option>
                    <option value="Panduan">Panduan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Status</label>
                  <select
                    value={formData.status_publikasi}
                    onChange={(e) => setFormData({ ...formData, status_publikasi: e.target.value })}
                    className="w-full border rounded-lg p-2.5 outline-none focus:border-[#188B9E]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="is_highlight"
                  checked={formData.is_highlight}
                  onChange={(e) => setFormData({ ...formData, is_highlight: e.target.checked })}
                  className="w-4 h-4 text-[#188B9E] rounded focus:ring-[#188B9E]"
                />
                <label htmlFor="is_highlight" className="font-semibold text-slate-700 cursor-pointer">
                  ⭐ Jadikan Berita Utama (Highlight Paling Atas)
                </label>
              </div>

              <div>
                <label className="block font-semibold mb-1">URL Gambar Header</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.gambar_url}
                  onChange={(e) => setFormData({ ...formData, gambar_url: e.target.value })}
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-[#188B9E]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Isi Lengkap Artikel</label>
                <textarea
                  rows="5"
                  required
                  value={formData.isi_artikel}
                  onChange={(e) => setFormData({ ...formData, isi_artikel: e.target.value })}
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-[#188B9E]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#188B9E] hover:bg-[#157888] text-white rounded-lg font-semibold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaBerita;