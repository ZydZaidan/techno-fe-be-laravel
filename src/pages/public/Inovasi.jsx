import { useState, useEffect, useMemo } from "react";
import { getInovasiAPI, getImageUrl } from "../../services/api";
import { Link } from "react-router-dom";

const Inovasi = () => {
  const [inovasiData, setInovasiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    const fetchInovasi = async () => {
      try {
        const response = await getInovasiAPI();
        if (response.data.success) {
          setInovasiData(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data inovasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInovasi();
  }, []);

  // Ambil daftar kategori unik secara dinamis berdasarkan data di DB
  const dynamicCategories = useMemo(() => {
    const categoriesSet = new Set();
    inovasiData.forEach((item) => {
      if (item.kategori && item.kategori.trim() !== "") {
        categoriesSet.add(item.kategori.trim());
      }
    });
    return ["Semua", ...Array.from(categoriesSet)];
  }, [inovasiData]);

  // Filter berdasarkan data dari DB
  const filteredInovasi = inovasiData.filter((item) => {
    const matchesCategory =
      activeCategory === "Semua" ||
      item.kategori?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      item.judul?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white font-poppins text-[#092B52] pt-28 pb-16">
      
      {/* BREADCRUMB */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="layout-container">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
            <Link to="/" className="hover:underline">Beranda</Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#092B52]">Inovasi</span>
          </div>
          <h1 className="font-readex text-3xl md:text-4xl font-extrabold text-[#092B52]">
            Inovasi
          </h1>
        </div>
      </section>

      {/* SEARCH & FILTER BAR */}
      <section className="relative z-10 pt-8 pb-4">
        <div className="layout-container">
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-900/5 p-4 sm:p-5 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Input Search */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Cari inovasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Dropdown Filter Kategori Dinamis */}
            <div className="relative w-full sm:w-60">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs md:text-sm text-slate-700 font-medium focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
              >
                {dynamicCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "Semua" ? "Semua Kategori" : cat}
                  </option>
                ))}
              </select>
              <svg
                className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* GRID CARDS INOVASI */}
      <section className="py-8">
        <div className="layout-container">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-xs md:text-sm font-medium animate-pulse">Memuat data inovasi...</p>
            </div>
          ) : filteredInovasi.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredInovasi.map((item) => (
                <Link
                  key={item.id}
                  to={`/inovasi/${item.id}`}
                  className="group relative h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-end bg-slate-800"
                >
                  {/* Image Background Full */}
                  <img
                    src={getImageUrl(item.gambar_url)}
                    alt={item.judul}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x800?text=No+Image";
                    }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e35]/95 via-[#0c1e35]/60 to-transparent"></div>

                  {/* Content Overlay */}
                  <div className="relative z-10 p-6 flex flex-col justify-end text-left">
                    {/* Badge Category */}
                    <div className="mb-3">
                      <span className="inline-block text-[8px] font-bold uppercase tracking-wider text-black bg-[#22d3ee] px-2.5 py-1 rounded-md shadow-sm">
                        {item.kategori || "INOVASI"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-readex text-base font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {item.judul}
                    </h3>

                    {/* Desc */}
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-3">
                      {item.deskripsi}
                    </p>

                    {/* Pengembang */}
                    {item.pengembang && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        Oleh: {item.pengembang}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs md:text-sm">Tidak ada inovasi yang ditemukan.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Inovasi;