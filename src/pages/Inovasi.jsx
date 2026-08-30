import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Dummy Data Inovasi (Sesuaikan foto & data dengan aset lokalmu)
const initialInovasiData = [
  {
    id: 1,
    tag: "Smart Energy",
    title: "Sistem Grid Surya Cerdas",
    desc: "Optimasi distribusi energi surya menggunakan algoritma AI untuk efisiensi maksimal pada skala mikro-grid.",
    author: "Tim Alpha PLN",
    img: "/src/assets/img/showcase-1.jpg",
    buttonBg: "bg-custom-yellow text-slate-900 hover:bg-custom-yellow-light",
  },
  {
    id: 2,
    tag: "IoT",
    title: "Sensor Pemantauan Pipa IoT",
    desc: "Sistem peringatan dini kebocoran gas berbasis IoT dengan dashboard real-time.",
    author: "Lab Elektro IT-PLN",
    img: "/src/assets/img/showcase-4.jpg",
    buttonBg: "bg-custom-cyan text-white hover:bg-custom-blue",
  },
  {
    id: 3,
    tag: "Aplikasi",
    title: "Aplikasi Pantau Energi",
    desc: "Aplikasi mobile untuk memantau dan mengelola konsumsi daya rumah tangga secara interaktif dan gamifikasi.",
    author: "Startup SyncEnergy",
    img: "/src/assets/img/showcase-2.jpg",
    buttonBg: "bg-custom-yellow text-slate-900 hover:bg-custom-yellow-light",
  },
  {
    id: 4,
    tag: "Aplikasi",
    title: "Aplikasi Pantau Energi",
    desc: "Aplikasi mobile untuk memantau dan mengelola konsumsi daya rumah tangga secara interaktif dan gamifikasi.",
    author: "Startup SyncEnergy",
    img: "/src/assets/img/showcase-2.jpg",
    buttonBg: "bg-custom-yellow text-slate-900 hover:bg-custom-yellow-light",
  },
  {
    id: 5,
    tag: "Aplikasi",
    title: "Aplikasi Pantau Energi",
    desc: "Aplikasi mobile untuk memantau dan mengelola konsumsi daya rumah tangga secara interaktif dan gamifikasi.",
    author: "Startup SyncEnergy",
    img: "/src/assets/img/showcase-2.jpg",
    buttonBg: "bg-custom-yellow text-slate-900 hover:bg-custom-yellow-light",
  },
  {
    id: 6,
    tag: "Aplikasi",
    title: "Aplikasi Pantau Energi",
    desc: "Aplikasi mobile untuk memantau dan mengelola konsumsi daya rumah tangga secara interaktif dan gamifikasi.",
    author: "Startup SyncEnergy",
    img: "/src/assets/img/showcase-2.jpg",
    buttonBg: "bg-custom-yellow text-slate-900 hover:bg-custom-yellow-light",
  },
];

const categories = ["Semua", "Smart Energy", "IoT", "Aplikasi"];

const Inovasi = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Filter Dummy Sederhana di FE
  const filteredInovasi = initialInovasiData.filter((item) => {
    const matchesCategory =
      activeCategory === "Semua" || item.tag.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-poppins text-[#092B52] pt-28 md:pt-32">
      <Navbar />


      {/* ================= SEARCH & FILTER BAR ================= */}
      <section className="relative z-10 layout-container mx-auto px-6 w-full pt-4 mb-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 p-4 sm:p-5 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Input Search */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Cari inovasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-slate-800 focus:outline-none focus:border-custom-cyan transition-colors"
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

          {/* Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-custom-yellow text-slate-900 shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ================= GRID CARDS INOVASI ================= */}
      <section className="layout-container pb-24">
        {filteredInovasi.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredInovasi.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow justify-between">
                  <div>
                    {/* Badge Category */}
                    <span className="inline-block text-[11px] font-semibold text-custom-cyan bg-cyan-50 px-3 py-1 rounded-full mb-3">
                      {item.tag}
                    </span>

                    {/* Title */}
                    <h3 className="font-readex text-lg font-bold text-[#1c3250] mb-2 leading-snug">
                      {item.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">
                      {item.desc}
                    </p>

                    {/* Author / Tim */}
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-6">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{item.author}</span>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <Link
                      to={`/inovasi/${item.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1c3250] hover:text-custom-cyan transition-colors group"
                    >
                      Detail
                      <svg
                        className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>

                    <button className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${item.buttonBg}`}>
                      Kolaborasi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-sm">Tidak ada inovasi yang ditemukan.</p>
          </div>
        )}

        {/* Load More Button */}
        <div className="mt-14 text-center">
          <button className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition-colors">
            Muat Lainnya
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Inovasi;