import { useState, useEffect, useCallback } from 'react';
import { 
  getInovasiAPI, 
  createInovasiAPI, 
  updateInovasiAPI, 
  deleteInovasiAPI 
} from "../../../services/api"; // Sesuaikan path lokasi file api.js kamu

const BASE_SERVER_URL = 'http://localhost:8000'; // Untuk nampil gambar public Laravel

const KelolaInovasi = () => {
  const [inovasiList, setInovasiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // State Form Input & File
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    deskripsi: '',
    pengembang: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Helper function untuk format URL gambar
  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/150x150?text=No+Image';
    return url.startsWith('http') ? url : `${BASE_SERVER_URL}${url}`;
  };

  // 1. Fetch Inovasi via API.js
  const fetchInovasi = useCallback(async () => {
    try {
      const res = await getInovasiAPI();
      if (res.data.success) {
        setInovasiList(res.data.data);
      }
    } catch (err) {
      console.error('Error fetch data inovasi:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Initial Fetch
  useEffect(() => {
    void Promise.resolve().then(fetchInovasi);
  }, [fetchInovasi]);

  const handleOpenModal = (item = null) => {
    setImageFile(null); // Reset file upload
    if (item) {
      setEditingItem(item);
      setFormData({
        judul: item.judul || '',
        kategori: item.kategori || '',
        deskripsi: item.deskripsi || '',
        pengembang: item.pengembang || '',
      });
      setImagePreview(item.gambar_url ? getImageUrl(item.gambar_url) : '');
    } else {
      setEditingItem(null);
      setFormData({
        judul: '',
        kategori: '',
        deskripsi: '',
        pengembang: '',
      });
      setImagePreview('');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageFile(null);
    setImagePreview('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('judul', formData.judul);
    submitData.append('kategori', formData.kategori);
    submitData.append('deskripsi', formData.deskripsi);
    submitData.append('pengembang', formData.pengembang);

    if (imageFile) {
      submitData.append('gambar', imageFile);
    }

    try {
      if (editingItem) {
        // Poin 3 Solved: Pakai updateInovasiAPI yang udah ditambah _method=PUT
        await updateInovasiAPI(editingItem.id, submitData);
      } else {
        await createInovasiAPI(submitData);
      }
      
      fetchInovasi();
      handleCloseModal();
    } catch (err) {
      console.error('Error submit inovasi:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data inovasi ini?')) {
      try {
        const res = await deleteInovasiAPI(id);
        if (res.data.success) {
          fetchInovasi();
        }
      } catch (err) {
        console.error('Error delete inovasi:', err);
      }
    }
  };

  const filteredData = inovasiList.filter((item) =>
    item.judul?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kategori?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pengembang?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 md:ml-64 font-poppins pt-8 px-4 md:px-8 pb-16 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">
            Kelola Inovasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manajemen katalog karya & inovasi civitas akademika ITPLN.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#188B9E] text-white px-4 py-2.5 rounded-xl font-medium text-xs hover:bg-[#137282] transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Inovasi Baru
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Cari judul, kategori, atau pengembang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#188B9E]"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tabel Inovasi */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="text-xs text-slate-400 text-center py-8 font-medium">
            Memuat data inovasi...
          </p>
        ) : filteredData.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8 font-medium">
            Data inovasi tidak ditemukan.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold text-slate-500 uppercase">
                  <th className="py-3 px-4">Inovasi</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Pengembang</th>
                  <th className="py-3 px-4">Deskripsi</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={getImageUrl(item.gambar_url)}
                          alt={item.judul}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-100 shrink-0"
                        />
                        <span className="font-bold text-[#092B52] line-clamp-2">{item.judul}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-cyan-50 text-[#188B9E] font-semibold rounded-xl text-[11px] border border-cyan-100">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-700">
                      {item.pengembang || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                      {item.deskripsi || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-xl transition"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition"
                          title="Hapus"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form Tambah / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl overflow-hidden font-poppins max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-[#092B52]">
                {editingItem ? 'Edit Data Inovasi' : 'Tambah Inovasi Baru'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Judul Inovasi *</label>
                <input
                  type="text"
                  name="judul"
                  required
                  value={formData.judul}
                  onChange={handleInputChange}
                  placeholder="Masukkan judul inovasi"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#188B9E]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kategori *</label>
                  <input
                    type="text"
                    name="kategori"
                    required
                    value={formData.kategori}
                    onChange={handleInputChange}
                    placeholder="Contoh: Energi Baru Terbarukan"
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#188B9E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Pengembang</label>
                  <input
                    type="text"
                    name="pengembang"
                    value={formData.pengembang}
                    onChange={handleInputChange}
                    placeholder="Nama tim / pengembang"
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#188B9E]"
                  />
                </div>
              </div>

              {/* Upload Gambar & Preview */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Gambar Inovasi</label>
                <div className="space-y-3">
                  {imagePreview && (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}
                        className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full hover:bg-rose-600 transition shadow-md"
                        title="Hapus Gambar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-[#188B9E] hover:file:bg-cyan-100 cursor-pointer border rounded-xl p-1 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  rows="4"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  placeholder="Detail ringkas mengenai inovasi..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#188B9E]"
                ></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-slate-600 bg-slate-100 rounded-xl font-medium hover:bg-slate-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-[#188B9E] rounded-xl font-medium hover:bg-[#137282] transition shadow-sm"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Inovasi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaInovasi;