import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import defaultImg from "../../assets/img/itpln.jpeg";

const BASE_URL = "http://localhost:5000";

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

  const getImageUrl = (url) => {
    if (!url) return defaultImg;
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
  };

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
    <div className="min-h-screen bg-white font-poppins text-[#092B52] pt-28 pb-16">
      
      {/* BREADCRUMB */}
      <section className="border-b border-gray-100 bg-white py-6 mb-8">
        <div className="layout-container">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
            <Link to="/" className="hover:underline">Beranda</Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#092B52]">Publikasi</span>
          </div>
          <h1 className="font-readex text-3xl md:text-4xl font-extrabold text-[#092B52]">
            Berita
          </h1>
        </div>
      </section>

      {/* ARTIKEL UNGGULAN */}
      <section className=" py-12 mb-12 border-b border-gray-100 bg-white">
        <div className="layout-container">
          {isLoading ? (
            <p className="text-center text-xs text-slate-400 py-8">Memuat artikel...</p>
          ) : featured ? (
            <div className="grid overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-2 border border-slate-100">
              <div className="h-60 w-full overflow-hidden md:h-auto">
                <img
                  src={getImageUrl(featured.gambar_url)}
                  alt={featured.judul}
                  onError={(e) => { e.target.src = defaultImg; }}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8 text-left">
                <span
                  className={`mb-3 w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    categoryStyles[featured.kategori] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {featured.kategori || "Berita"}
                </span>

                <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {formatDate(featured.created_at)}
                </div>

                <h2 className="font-readex mb-3 text-lg md:text-xl font-bold leading-snug text-[#092B52]">
                  {featured.judul}
                </h2>

                <p className="mb-6 text-xs md:text-sm leading-relaxed text-slate-500 line-clamp-3">
                  {featured.ringkasan || featured.isi_artikel || featured.konten}
                </p>

                <Link
                  to={`/publikasi/${featured.id}`}
                  className="flex w-fit items-center gap-2 rounded-xl bg-custom-yellow px-5 py-2.5 text-xs font-bold text-[#092B52] transition hover:opacity-90 shadow-xs"
                >
                  Baca Selengkapnya
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-center text-xs text-slate-400 py-8">Belum ada berita dipublikasikan.</p>
          )}
        </div>
      </section>

      {/* ARTIKEL TERBARU */}
      <section className="py-4">
        <div className="layout-container">
          <h2 className="font-readex mb-6 text-xl md:text-2xl font-bold text-[#092B52] text-left">
            Artikel Terbaru
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {listArticles.map((article) => (
              <div key={article.id} className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between text-left hover:shadow-md transition-shadow">
                <div>
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={getImageUrl(article.gambar_url)}
                      alt={article.judul}
                      onError={(e) => { e.target.src = defaultImg; }}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          categoryStyles[article.kategori] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {article.kategori || "Berita"}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-400">
                        <CalendarIcon className="h-3 w-3" />
                        {formatDate(article.created_at)}
                      </span>
                    </div>

                    <h3 className="font-readex mb-2 text-sm font-bold leading-snug text-[#092B52] line-clamp-2">
                      {article.judul}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {article.ringkasan || article.isi_artikel || article.konten}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/publikasi/${article.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-custom-blue hover:underline"
                  >
                    Baca Selengkapnya
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
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