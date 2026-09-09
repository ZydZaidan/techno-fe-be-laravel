import { useState, useEffect } from "react";
import API from "../../services/api";
import defaultImg from "../../assets/img/itpln.jpeg";

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

const categoryStyles = {
  Peresmian: "bg-[#D9F0FA] text-custom-blue",
  Startup: "bg-[#D7F7EA] text-[#16A77D]",
  Program: "bg-[#D9F0FA] text-custom-blue",
  Panduan: "bg-[#FFF4CF] text-[#C89A00]",
};

const Publikasi = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await API.get("/berita");
        if (res.data?.success) {
          const published = res.data.data.filter(
            (item) => item.status_publikasi === "Published"
          );
          setArticles(published);
        }
      } catch (err) {
        console.error("Gagal load artikel:", err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchArticles();
  }, []);

  // Artikel highlight diambil sebagai berita utama, jika tidak ada ambil artikel pertama
  const featured = articles.find((item) => Boolean(item.is_highlight)) || articles[0];
  const listArticles = articles.filter((item) => item.id !== featured?.id);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white font-readex text-[#092B52]">
      {/* BREADCRUMB */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-295 px-8 py-6">
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

      {/* ARTIKEL UNGGULAN (HIGHLIGHT / BERITA UTAMA) */}
      <section className="bg-[#F7F9FC] px-8 py-10">
        <div className="mx-auto max-w-295">
          {isLoading ? (
            <p className="text-center text-xs text-slate-400">Memuat artikel...</p>
          ) : featured ? (
            <div className="grid overflow-hidden rounded-xl bg-white shadow-sm md:grid-cols-2">
              <div className="h-55 w-full overflow-hidden md:h-full">
                <img
                  src={featured.gambar_url || defaultImg}
                  alt={featured.judul}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <span
                  className={`mb-3 w-fit rounded-full px-3 py-1 text-[9px] font-semibold ${
                    categoryStyles[featured.kategori] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {featured.kategori || "Berita"}
                </span>

                <div className="mb-2 flex items-center gap-1.5 text-[10px] text-gray-400">
                  <CalendarIcon className="h-[12px] w-[12px]" />
                  {formatDate(featured.created_at)}
                </div>

                <h2 className="font-poppins mb-3 text-[16px] font-bold leading-snug text-[#092B52]">
                  {featured.judul}
                </h2>

                <p className="mb-5 text-[11px] leading-[1.7] text-gray-500 line-clamp-3">
                  {featured.ringkasan || featured.konten}
                </p>

                <a
                  href={`/publikasi/${featured.id}`}
                  className="flex w-fit items-center gap-1.5 rounded-lg bg-custom-yellow px-4 py-2 text-[10px] font-semibold text-[#092B52] transition hover:opacity-90"
                >
                  Baca Selengkapnya
                  <ArrowRightIcon className="h-[12px] w-[12px]" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-center text-xs text-slate-400">Belum ada berita dipublikasikan.</p>
          )}
        </div>
      </section>

      {/* ARTIKEL TERBARU */}
      <section className="bg-white px-8 py-14">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="font-poppins mb-6 text-[18px] font-bold text-[#092B52]">
            Artikel Terbaru
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {listArticles.map((article) => (
              <div key={article.id} className="overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="h-[150px] w-full overflow-hidden">
                    <img
                      src={article.gambar_url || defaultImg}
                      alt={article.judul}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold ${
                          categoryStyles[article.kategori] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {article.kategori || "Berita"}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] text-gray-400">
                        <CalendarIcon className="h-[10px] w-[10px]" />
                        {formatDate(article.created_at)}
                      </span>
                    </div>

                    <h3 className="font-poppins mb-2 text-[12px] font-bold leading-snug text-[#092B52] line-clamp-2">
                      {article.judul}
                    </h3>

                    <p className="mb-4 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {article.ringkasan || article.konten}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <a
                    href={`/publikasi/${article.id}`}
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