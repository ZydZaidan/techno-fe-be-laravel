import itpln1 from "../../assets/img/itpln.jpeg";
import itpln2 from "../../assets/img/itpln2.jpeg";
import itpln3 from "../../assets/img/itpln3.jpeg";
import itpln4 from "../../assets/img/itpln4.jpeg";

// ================= IKON CUSTOM (SVG polos, tanpa library tambahan) =================
const ArrowRightIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ================= WARNA BADGE PER KATEGORI =================
const categoryStyles = {
  Peresmian: "bg-[#D9F0FA] text-custom-blue",
  Startup: "bg-[#D7F7EA] text-[#16A77D]",
  Program: "bg-[#D9F0FA] text-custom-blue",
  Panduan: "bg-[#FFF4CF] text-[#C89A00]",
};

// ================= DATA ARTIKEL UNGGULAN =================
const featuredArticle = {
  category: "Peresmian",
  date: "3 September 2024",
  title: "Peresmian Gedung Inkubator Baru: Lompatan Inovasi Technopark IT-PLN",
  excerpt:
    "Fasilitas baru ini menjadi wujud komitmen kampus dalam mendukung ekosistem inovasi dan mendampingi startup mahasiswa hingga siap bersaing di industri.",
  image: itpln1,
  link: "#",
};

// ================= DATA ARTIKEL TERBARU =================
const articles = [
  {
    category: "Startup",
    date: "28 Agustus 2024",
    title: "Startup Pitching Day 2024: Menuai Investor Baru",
    image: itpln2,
    link: "#",
  },
  {
    category: "Program",
    date: "20 Agustus 2024",
    title: "Program Akselerasi Batch 3 Resmi Dimulai",
    image: itpln3,
    link: "#",
  },
  {
    category: "Panduan",
    date: "15 Agustus 2024",
    title: "Panduan Menyusun Proposal Hak Kekayaan Intelektual (HKI)",
    image: itpln4,
    link: "#",
  },
];

const Publikasi = () => {
  return (
    <div className="min-h-screen bg-white font-readex text-[#092B52]">
  

      {/* ================= JUDUL / BREADCRUMB ================= */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1180px] px-8 py-6">
          <div className="mb-1 flex items-center gap-1 text-[10px] text-gray-500">
            <span>Beranda</span>
            <span>&gt;</span>
            <span className="font-semibold text-[#092B52]">Publikasi</span>
          </div>

          <h1 className="font-poppins text-[25px] font-bold text-[#092B52]">
            Berita dan Pengumuman
          </h1>
        </div>
      </section>

      {/* ================= ARTIKEL UNGGULAN ================= */}
      <section className="bg-[#F7F9FC] px-8 py-10">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid overflow-hidden rounded-xl bg-white shadow-sm md:grid-cols-2">
            <div className="h-[220px] w-full overflow-hidden md:h-full">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6">
              <span
                className={`mb-3 w-fit rounded-full px-3 py-1 text-[9px] font-semibold ${
                  categoryStyles[featuredArticle.category]
                }`}
              >
                {featuredArticle.category}
              </span>

              <div className="mb-2 flex items-center gap-1.5 text-[10px] text-gray-400">
                <CalendarIcon className="h-[12px] w-[12px]" />
                {featuredArticle.date}
              </div>

              <h2 className="font-poppins mb-3 text-[16px] font-bold leading-snug text-[#092B52]">
                {featuredArticle.title}
              </h2>

              <p className="mb-5 text-[11px] leading-[1.7] text-gray-500">
                {featuredArticle.excerpt}
              </p>

              <a
                href={featuredArticle.link}
                className="flex w-fit items-center gap-1.5 rounded-lg bg-custom-yellow px-4 py-2 text-[10px] font-semibold text-[#092B52] transition hover:opacity-90"
              >
                Baca Selengkapnya
                <ArrowRightIcon className="h-[12px] w-[12px]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARTIKEL TERBARU ================= */}
      <section className="bg-white px-8 py-14">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="font-poppins mb-6 text-[18px] font-bold text-[#092B52]">
            Artikel Terbaru
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {articles.map((article) => (
              <div key={article.title} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="h-[150px] w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold ${
                        categoryStyles[article.category]
                      }`}
                    >
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-gray-400">
                      <CalendarIcon className="h-[10px] w-[10px]" />
                      {article.date}
                    </span>
                  </div>

                  <h3 className="font-poppins mb-3 text-[12px] font-bold leading-snug text-[#092B52]">
                    {article.title}
                  </h3>

                  <a
                    href={article.link}
                    className="flex items-center gap-1 text-[10px] font-semibold text-custom-blue hover:underline"
                  >
                    Baca Selengkapnya
                    <ArrowRightIcon className="h-[10px] w-[10px]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Publikasi;