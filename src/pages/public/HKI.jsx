import { Link } from "react-router-dom";

// Data Statis untuk Counter & Cards Fasilitasi
const statsData = [
  { id: 1, count: "120+", label: "HKI Terdaftar", color: "border-teal-400", iconBg: "bg-teal-50 text-teal-600" },
  { id: 2, count: "45+", label: "Paten Granted", color: "border-sky-400", iconBg: "bg-sky-50 text-sky-600" },
  { id: 3, count: "75+", label: "Hak Cipta", color: "border-indigo-400", iconBg: "bg-indigo-50 text-indigo-600" },
  { id: 4, count: "15+", label: "Merek Dagang", color: "border-amber-400", iconBg: "bg-amber-50 text-amber-600" },
];

const fasilitasiData = [
  { id: 1, title: "Konsultasi HKI", desc: "Layanan pendampingan dan konsultasi draf dokumen Kekayaan Intelektual.", iconBg: "bg-sky-50 text-sky-600" },
  { id: 2, title: "Pendaftaran Paten", desc: "Bantuan proses pendaftaran paten invensi hingga status granted.", iconBg: "bg-teal-50 text-teal-600" },
  { id: 3, title: "Hak Cipta & Merek", desc: "Perlindungan karya cipta, desain industri, serta merek komersial.", iconBg: "bg-indigo-50 text-indigo-600" },
  { id: 4, title: "Valuasi & Komersialisasi", desc: "Pendampingan penilaian aset KI dan akselerasi ke pasar komersial.", iconBg: "bg-amber-50 text-amber-600" },
];

const HKI = () => {
  return (
    <div className="min-h-screen bg-white font-poppins text-[#092B52] pt-28 pb-16">
      
      {/* BREADCRUMB */}
      <section className="border-b border-gray-100 bg-white py-6 mb-8">
        <div className="layout-container">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
            <Link to="/" className="hover:underline">Beranda</Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#092B52]">HKI</span>
          </div>
          <h1 className="font-readex text-3xl md:text-4xl font-extrabold text-[#092B52]">
            HKI
          </h1>
        </div>
      </section>

      {/* ================= TOP BANNER CTA CARD ================= */}
      <section className="py-4 mb-8">
        <div className="layout-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-100 via-sky-200 to-teal-100 p-8 md:p-12 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl text-left">
              <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#092B52] mb-3">
                Fasilitasi Kekayaan Intelektual
              </h2>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Pendaftaran Batch 5 telah dibuka. Bergabunglah dengan ekosistem inovasi terbaik dan lindungi karya intelektual Anda.
              </p>
            </div>

            <a
              href="https://haki.usahakerjasama.id/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#051D38] hover:bg-[#092B52] text-white font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full transition-all duration-200 shadow-md shrink-0"
            >
              <span>Ajukan HKI</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ================= STATISTIK COUNTER CARDS ================= */}
      <section className="py-4 mb-12">
        <div className="layout-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {statsData.map((stat) => (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-x border-b border-slate-100 text-center flex flex-col items-center justify-center"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="font-readex text-2xl md:text-3xl font-bold text-[#092B52] mb-1">{stat.count}</span>
                <span className="text-slate-500 text-xs font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FASILITASI KEKAYAAN INTELEKTUAL ================= */}
      <section className="bg-[#f8fafc] py-16 mb-16 border-y border-slate-100">
        <div className="layout-container">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#092B52] mb-2">
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
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-left"
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
                  {/* <span>Selengkapnya</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg> */}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HKI;