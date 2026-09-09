import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';
import defaultImg from '../../assets/img/itpln.jpeg';

const DetailPublikasi = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await API.get(`/berita/${id}`);
        if (res.data?.success) {
          setArticle(res.data.data);
        }
      } catch (err) {
        console.error('Gagal memuat detail artikel:', err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchDetail();
  }, [id]);

  if (isLoading) return <div className="p-10 text-center text-xs text-slate-400">Memuat berita...</div>;
  if (!article) return <div className="p-10 text-center text-xs text-slate-400">Artikel tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-white font-readex text-[#092B52] py-10 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link to="/publikasi" className="text-xs text-custom-blue hover:underline">
          &larr; Kembali ke Publikasi
        </Link>
        <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">
          {article.kategori}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-poppins">{article.judul}</h1>
        <p className="text-xs text-slate-400">
          {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <img
          src={article.gambar_url || defaultImg}
          alt={article.judul}
          className="w-full h-80 object-cover rounded-2xl shadow-sm"
        />
        <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-line pt-4 border-t">
          {article.konten}
        </div>
      </div>
    </div>
  );
};

export default DetailPublikasi;