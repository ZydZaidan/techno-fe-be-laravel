import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API, { getImageUrl } from "../../services/api";
import defaultImg from "../../assets/img/itpln.jpeg";

const ArrowLeftIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
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

const DetailPublikasi = () => {
  const { id } = useParams(); // Mengambil ID dari URL (/publikasi/:id)
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        // NEMBAK API GET /berita/:id
        const res = await API.get(`/berita/${id}`);
        if (res.data?.success) {
          setArticle(res.data.data);
        }
      } catch (err) {
        console.error("Gagal memuat detail artikel:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      void fetchDetail();
    }
  }, [id]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-poppins pt-28 pb-16 flex items-center justify-center">
        <p className="text-xs text-slate-400">Memuat berita...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white font-poppins pt-28 pb-16 flex flex-col items-center justify-center gap-4">
        <p className="text-xs text-slate-400">Artikel tidak ditemukan.</p>
        <Link
          to="/publikasi"
          className="inline-flex items-center gap-2 rounded-xl bg-custom-blue px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Kembali ke Publikasi
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-poppins text-[#092B52] pt-28 pb-16 text-left">
      <div className="layout-container max-w-4xl mx-auto space-y-6">
        <div>
          <Link
            to="/publikasi"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-semibold text-[#092B52] transition-colors"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            <span>Kembali ke Publikasi</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-bold rounded-full">
            {article.kategori || "Berita"}
          </span>
          {Boolean(article.is_highlight) && (
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
              Highlight
            </span>
          )}
        </div>

        <h1 className="font-readex text-2xl md:text-4xl font-extrabold leading-snug text-[#092B52]">
          {article.judul}
        </h1>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>
            {article.created_at
              ? new Date(article.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </span>
        </div>

        <div className="w-full h-72 md:h-105 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-xs">
          <img
            src={getImageUrl(article.gambar_url)}
            alt={article.judul}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = defaultImg; }}
          />
        </div>

        <div className="text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line pt-6 border-t border-slate-100">
          {article.isi_artikel || article.konten}
        </div>
      </div>
    </div>
  );
};

export default DetailPublikasi;