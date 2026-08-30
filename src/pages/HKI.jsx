import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Dummy Data Statistik HKI
const statsData = [
  { id: 1, count: "42", label: "Total Paten", color: "border-cyan-400", iconBg: "bg-cyan-100 text-cyan-500" },
  { id: 2, count: "156", label: "Hak Cipta Terdaftar", color: "border-amber-400", iconBg: "bg-amber-100 text-amber-500" },
  { id: 3, count: "28", label: "Merek Dagang", color: "border-teal-400", iconBg: "bg-teal-100 text-teal-500" },
  { id: 4, count: "15", label: "Desain Industri", color: "border-amber-300", iconBg: "bg-amber-100 text-amber-500" },
];

// Dummy Data Fasilitasi HKI
const fasilitasiData = [
  {
    id: 1,
    title: "Hak Cipta",
    desc: "Perlindungan karya tulis, seni, dan perangkat lunak.",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Paten",
    desc: "Fasilitasi drafting dan pendaftaran invensi teknologi.",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "Merek",
    desc: "Pendaftaran nama produk, logo, dan identitas usaha.",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    title: "Desain Industri",
    desc: "Perlindungan estetika bentuk dan konfigurasi produk.",
    iconBg: "bg-blue-100 text-blue-600",
  },
];

// Dummy Data Direktori HKI
const initialDirektoriData = [
  {
    id: 1,
    judul: "Sistem Monitoring Emisi Karbon Berbasis IoT",
    jenis: "PATEN",
    jenisBg: "bg-cyan-400 text-white",
    tahun: "2023",
    status: "Granted",
    statusColor: "bg-teal-500",
  },
  {
    id: 2,
    judul: "Modul Pembelajaran Interaktif Dasar Pemrograman Python",
    jenis: "HAK CIPTA",
    jenisBg: "bg-amber-400 text-white",
    tahun: "2023",
    status: "Terdaftar",
    statusColor: "bg-teal-500",
  },
  {
    id: 3,
    judul: "EcoCharge: Stasiun Pengisian Daya Tenaga Surya Portabel",
    jenis: "DESAIN",
    jenisBg: "bg-slate-700 text-white",
    tahun: "2024",
    status: "Proses",
    statusColor: "bg-amber-400",
  },
  {
    id: 4,
    judul: "Logo 'EnergiKu' Aplikasi Manajemen Listrik Pintar",
    jenis: "MEREK",
    jenisBg: "bg-slate-800 text-white",
    tahun: "2024",
    status: "Terdaftar",
    statusColor: "bg-teal-500",
  },
];

const HKI = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDirektori = initialDirektoriData.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-poppins text-[#092B52] pt-28 md:pt-32">
      <Navbar />

      {/* ================= TOP BANNER CTA CARD ================= */}
      <section className="layout-container mx-auto px-6 w-full mb-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-100 via-sky-200 to-teal-100 p-8 md:p-12 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="font-readex text-2xl md:text-3xl font-extrabold text-[#092B52] mb-3">
              Fasilitasi Kekayaan Intelektual
            </h1>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Pendaftaran Batch 5 telah dibuka. Bergabunglah dengan ekosistem inovasi terbaik dan lindungi karya intelektual Anda.
            </p>
          </div>

          <a
            href="https://haki.usahakerjasama.id/login.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#051D38] hover:bg-[#092B52] text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-md shrink-0"
          >
            <span>Ajukan HKI</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ================= STATISTIK COUNTER CARDS ================= */}
      <section className="layout-container mx-auto px-6 w-full mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border-t-4 ${stat.color} border-x border-b border-slate-100 text-center flex flex-col items-center justify-center`}
            >
              <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="font-readex text-3xl font-bold text-[#092B52] mb-1">{stat.count}</span>
              <span className="text-slate-500 text-xs font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FASILITASI KEKAYAAN INTELEKTUAL ================= */}
      <section className="bg-blue-50/60 py-16 mb-16">
        <div className="layout-container mx-auto px-6 w-full">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-readex text-2xl md:text-3xl font-bold text-[#092B52] mb-2">
              Fasilitasi Kekayaan Intelektual
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Dukungan penuh untuk melindungi ide dan inovasi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fasilitasiData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center mb-4`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-readex text-base font-bold text-[#092B52] mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">{item.desc}</p>
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <span>Selengkapnya</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DIREKTORI PUBLIK HKI ================= */}
      <section className="layout-container mx-auto px-6 w-full pb-24">
        {/* Header Section & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-readex text-xl md:text-2xl font-bold text-[#092B52] mb-1">
              Direktori Publik HKI
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Daftar kekayaan intelektual yang telah difasilitasi.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Cari paten/ciptaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-700 focus:outline-none focus:border-cyan-500 transition-colors shadow-xs"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Table Direktori */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-4 px-6 w-16 text-center">No</th>
                  <th className="py-4 px-6">Judul Ciptaan / Paten</th>
                  <th className="py-4 px-6 text-center">Jenis HKI</th>
                  <th className="py-4 px-6 text-center">Tahun</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredDirektori.length > 0 ? (
                  filteredDirektori.map((row, index) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 text-center font-medium text-slate-400">{index + 1}</td>
                      <td className="py-4 px-6 font-semibold text-[#092B52]">{row.judul}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full ${row.jenisBg}`}>
                          {row.jenis}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-slate-500 font-medium">{row.tahun}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                          <span className={`w-2 h-2 rounded-full ${row.statusColor}`}></span>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      Data HKI tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Button Lihat Semua Direktori */}
        <div className="text-center">
          <button className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors shadow-xs">
            Lihat Semua Direktori
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HKI;