import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import API from "../../services/api";
import HeroImg from "../../assets/img/hero-img.svg";
import aboutImg1 from "../../assets/img/about1.svg";
import aboutImg2 from "../../assets/img/about2.png";
import partner1 from "../../assets/img/partner-1.png";
import partner2 from "../../assets/img/partner-2.png";
import GroupsIcon from "@mui/icons-material/Groups";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import CopyrightRoundedIcon from "@mui/icons-material/CopyrightRounded";

// 1. TARUH DATA SLIDE DI LUAR KOMPONEN (Hemat Memori & Bersih)
const heroSlides = [
  {
    id: 1,
    titlePrefix: "Akselerasi Teknologi ",
    titleHighlight: "Masa Depan",
    description:
      "Technopark IT-PLN adalah pusat pengembangan teknologi dan inovasi yang mendukung lahirnya technopreneur, memfasilitasi HKI, dan menghadirkan solusi energi masa depan.",
    image: HeroImg,
    primaryBtn: { text: "Pelajari Lebih Lanjut", link: "/profil" },
    secondaryBtn: { text: "Buat Pengajuan", link: "/inkubasi" },
  },
  {
    id: 2,
    titlePrefix: "Inkubasi Bisnis & ",
    titleHighlight: "Akselerasi Startup",
    description:
      "Mendampingi inovator dari tahap purwarupa (prototype) hingga siap komersialisasi dan terhubung langsung dengan ekosistem industri.",
    image: aboutImg2,
    primaryBtn: { text: "Daftar Inkubasi", link: "/inkubasi" },
    secondaryBtn: { text: "Lihat Program", link: "/profil" },
  },
  {
    id: 3,
    titlePrefix: "Fasilitasi & Legalitas ",
    titleHighlight: "Kekayaan Intelektual",
    description:
      "Pendampingan resmi pendaftaran Paten dan Hak Cipta (HKI) untuk mengamankan karya riset sivitas akademika agar bernilai komersial.",
    image: aboutImg1,
    primaryBtn: { text: "Fasilitasi HKI", link: "/hki" },
    secondaryBtn: { text: "Hubungi Kami", link: "/contact" },
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide dengan reset otomatis saat user klik dot
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const scrollRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const [latestNews, setLatestNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  const [showcaseData, setShowcaseData] = useState([]);
  const [isLoadingShowcase, setIsLoadingShowcase] = useState(true);

  // Helper untuk normalisasi URL gambar dari backend
  const getImageUrl = (imagePath, fallback) => {
    if (!imagePath) return fallback;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const baseURL = API.defaults.baseURL || "http://localhost:5000";
    const cleanBaseURL = baseURL
      .replace(/\/api\/techno\/?$/, "")
      .replace(/\/api\/?$/, "");
    return `${cleanBaseURL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  // Helper styling badge tag untuk Showcase
  const getTagBg = (tag) => {
    const formattedTag = tag?.toUpperCase() || "";
    if (formattedTag.includes("ALUMNI")) return "bg-amber-400 text-slate-900";
    if (formattedTag.includes("RESEARCH"))
      return "bg-emerald-400 text-slate-900";
    return "bg-cyan-400 text-slate-900"; // Default TENANT
  };

  // 🔴 FETCH DATA DARI API
useEffect(() => {
    const fetchData = async () => {
      // Fetch berita terbaru
      try {
        setIsLoadingNews(true);
        const res = await API.get("/berita?limit=3");
        if (res.data?.success) {
          setLatestNews(res.data.data.slice(0, 3));
        } else if (Array.isArray(res.data)) {
          setLatestNews(res.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Gagal mengambil berita terbaru:", error);
      } finally {
        setIsLoadingNews(false);
      }

      // Fetch showcase inovasi (dibatasi 7 inovasi terbaru)
      try {
        setIsLoadingShowcase(true);
        const resInovasi = await API.get("/inovasi");
        let rawData = [];
        
        if (resInovasi.data?.success) {
          rawData = resInovasi.data.data;
        } else if (Array.isArray(resInovasi.data)) {
          rawData = resInovasi.data;
        }

        // Ambil maksimal 7 item terbaru
        setShowcaseData(rawData.slice(0, 7));
      } catch (error) {
        console.error("Gagal mengambil data showcase inovasi:", error);
      } finally {
        setIsLoadingShowcase(false);
      }
    };

    fetchData();
  }, []);

  // 🖱️ Handler untuk fitur Drag Scroll
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const partners = [
    { id: 1, name: "Mitra 1", logo: partner1 },
    { id: 2, name: "Mitra 2", logo: partner2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-poppins">
      {/* HERO SECTION SLIDER OTOMATIS */}
      <section className="relative w-full min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        
        {/* BACKGROUND SLIDER DENGAN EFEK CROSSFADE */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* OVERLAY GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#031B33] via-[#093C5C]/90 to-[#1B799E]/80"></div>
          </div>
        ))}

        {/* KONTEN TEKS & TOMBOL (BERUBAH DINAMIS MENGIKUTI SLIDE) */}
        <div className="relative z-10 layout-container w-full">
          <div className="max-w-3xl text-white">
            
            {/* Key dipasang ke currentSlide agar ada efek animasi halus saat teks berganti */}
            <div key={currentSlide} className="transition-all duration-700 ease-out animate-fadeIn">
              <h1 className="font-readex text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                {heroSlides[currentSlide].titlePrefix}
                <span className="text-custom-yellow">
                  {heroSlides[currentSlide].titleHighlight}
                </span>
              </h1>

              <p className="text-slate-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl min-h-[84px]">
                {heroSlides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to={heroSlides[currentSlide].primaryBtn.link}
                  className="px-8 py-3.5 bg-custom-yellow text-slate-900 font-bold rounded-full hover:bg-custom-yellow-light transition-colors text-center"
                >
                  {heroSlides[currentSlide].primaryBtn.text}
                </Link>
                <Link
                  to={heroSlides[currentSlide].secondaryBtn.link}
                  className="px-8 py-3.5 border-2 border-custom-yellow text-custom-yellow font-bold rounded-full hover:bg-custom-yellow hover:text-slate-900 transition-all duration-300 text-center"
                >
                  {heroSlides[currentSlide].secondaryBtn.text}
                </Link>
              </div>
            </div>

            {/* INDIKATOR BULLET / DOTS DI BAWAH HERO */}
            <div className="flex items-center gap-3 mt-12">
              {heroSlides.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => setCurrentSlide(dotIndex)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    dotIndex === currentSlide
                      ? "w-8 bg-custom-yellow"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Pindah ke slide ${dotIndex + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="w-full bg-white py-28">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative w-full h-100 sm:h-125">
              <img
                src={aboutImg2}
                alt="Fasilitas Gedung Technopark"
                className="absolute top-0 left-0 w-3/4 h-75 sm:h-100 object-cover rounded-3xl shadow-lg"
              />
              <img
                src={aboutImg1}
                alt="Tim Diskusi Startup"
                className="absolute bottom-0 right-0 w-2/3 h-62.5 sm:h-75 object-cover rounded-3xl shadow-2xl border-8 border-white"
              />
            </div>

            <div className="pl-0 lg:pl-10">
              <h2 className="font-readex text-3xl md:text-4xl font-extrabold text-[#1c3250] mb-3 uppercase tracking-wider">
                 Tentang Technopark Kami
              </h2>
              <h3 className="text-lg text-slate-500 mb-6 font-medium">
                 Mendorong Lahirnya Generasi Inovator Baru
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-[15px]">
                 Technopark IT-PLN dibangun untuk mendukung mahasiswa dan peneliti
              mengembangkan ide menjadi karya nyata. Dari riset di kampus, kami
              membuka ruang eksperimen, pendampingan bisnis, hingga perlindungan
              HKI, sehingga inovasi yang lahir di sini bisa terus tumbuh dan
              memberi dampak.
              </p>
              <Link
                to="/profil"
                className="inline-flex items-center gap-2 text-custom-cyan font-semibold hover:text-custom-blue transition-colors group"
              >
                Lihat Profil Lengkap
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION (Diubah menggunakan layout-container agar sejajar) */}
      <section className="relative z-20 layout-container w-full -mt-16 md:-mt-12 mb-20">
        <div className="bg-slate-50 rounded-lg shadow-xl shadow-slate-900/10 py-2 px-6 lg:py-8 flex flex-col md:flex-row items-center justify-between divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-200 border border-slate-100">
          <div className="flex flex-col items-center justify-center flex-1 py-4 md:py-0 w-full hover:-translate-y-1 transition-transform duration-300">
            <h2 className="font-readex text-4xl md:text-4xl ls font-bold text-slate-900 mb-2">
              50+
            </h2>
            <p className="text-xs md:text-sm font-bold text-slate-500 tracking-widest uppercase">
              Hak Cipta
            </p>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 py-4 md:py-0 w-full hover:-translate-y-1 transition-transform duration-300">
            <h2 className="font-readex text-4xl md:text-4xl ls font-bold text-slate-900 mb-2">
              20+
            </h2>
            <p className="text-xs md:text-sm font-bold text-slate-500 tracking-widest uppercase">
              Penelitian
            </p>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 py-4 md:py-0 w-full hover:-translate-y-1 transition-transform duration-300">
            <h2 className="font-readex text-4xl md:text-4xl font-bold text-slate-900 mb-2">
              15+
            </h2>
            <p className="text-xs md:text-sm font-bold text-slate-500 tracking-widest uppercase">
              Publikasi
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full bg-[#f8fafc] py-24">
        <div className="layout-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-readex text-3xl md:text-4xl font-extrabold text-[#1c3250] mb-3">
              Dukungan Inovator
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              Kami siapkan ruang, mentor, hingga perlindungan hukum biar lo bisa
              fokus berkarya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-start text-left">
              <div>
                 <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center mb-6">
                  {/* MUI Icon diganti di sini */}
                  <RocketLaunchRoundedIcon className="w-7! h-7! text-custom-cyan" />
                </div>
                <h3 className="font-readex text-xl font-bold text-[#1c3250] mb-3">
                  Inkubasi Bisnis
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                   Kami sediakan ruang kerja, pendampingan mentor, hingga perlindungan
            hukum agar kamu bisa fokus mengembangkan karya.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-start text-left">
              <div>
                <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center mb-6">
                  {/* MUI Icon diganti di sini */}
                  <CopyrightRoundedIcon className="w-7! h-7! text-custom-cyan" />
                </div>
                <h3 className="font-readex text-xl font-bold text-[#1c3250] mb-3">
                  Fasilitasi HKI
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Bantuan pendaftaran Hak Kekayaan Intelektual untuk melindungi
                  inovasi dan karya Anda.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-start text-left">
              <div>
                <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center mb-6">
                  {/* MUI Icon diganti di sini */}
                  <GroupsIcon className="w-7! h-7! text-custom-cyan" />
                </div>
                <h3 className="font-readex text-xl font-bold text-[#1c3250] mb-3">
                  Co-Working Space
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Fasilitas ruang kerja modern dan kolaboratif dengan internet
                  berkecepatan tinggi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section className="w-full bg-[#f8fafc] py-24 select-none">
        <div className="layout-container">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-readex text-3xl md:text-4xl font-extrabold text-[#1c3250] mb-2">
                Showcase Inovasi
              </h2>
              <p className="text-slate-500 text-base">
                Karya terbaik dari talenta Technopark.
              </p>
            </div>

            <Link
              to="/inovasi"
              className="inline-flex items-center gap-1.5 text-custom-cyan font-semibold hover:text-custom-blue transition-colors text-sm md:text-base group whitespace-nowrap"
            >
              Lihat Semua
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 transition-all duration-150 ${
              isMouseDown ? "cursor-grabbing scale-[0.99]" : "cursor-grab"
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

            {isLoadingShowcase ? (
              <div className="w-full text-center py-10 text-slate-400">
                Memuat showcase inovasi...
              </div>
            ) : showcaseData.length > 0 ? (
              showcaseData.map((item) => (
                <div
                  key={item.id}
                  className="relative min-w-70 sm:min-w-[320px] h-110 rounded-3xl overflow-hidden shadow-lg group shrink-0"
                >
                  <img
                    src={getImageUrl(
                      item.gambar_url || item.img,
                      "/src/assets/img/placeholder.jpg",
                    )}
                    alt={item.judul || item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0b2447] via-[#0b2447]/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white z-10">
                    <span
                      className={`inline-block text-[8px] font-bold px-3 py-1 rounded-md tracking-wider mb-3 uppercase ${getTagBg(item.kategori || item.tag)}`}
                    >
                      {item.kategori || item.tag || "TENANT"}
                    </span>
                    <h3 className="font-readex text-base font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {item.judul || item.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-3">
                      {item.deskripsi || item.desc}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10 text-slate-400">
                Belum ada inovasi dipublikasikan.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="w-full bg-[#f8fafc] py-20 border-b border-slate-100">
        <div className="layout-container">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#1c3250] mb-2">
              Mitra Kolaborasi
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Dipercaya oleh industri dan institusi terkemuka.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 max-w-5xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center mx-12"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-28 w-auto object-contain "
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KABAR TERBARU SECTION */}
      <section className="w-full bg-[#f8fafc] py-24">
        <div className="layout-container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-readex text-3xl md:text-4xl font-extrabold text-[#1c3250] mb-2">
                Kabar Terbaru
              </h2>
              <p className="text-slate-500 text-base">
                Update inovasi dan kegiatan Technopark.
              </p>
            </div>

            <Link
              to="/publikasi"
              className="inline-flex items-center gap-1.5 text-custom-cyan font-semibold hover:text-custom-blue transition-colors text-sm md:text-base group whitespace-nowrap"
            >
              Lihat Semua
              <svg
                className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoadingNews ? (
              <div className="col-span-3 text-center py-10 text-slate-400">
                Memuat berita terbaru...
              </div>
            ) : latestNews.length > 0 ? (
              latestNews.map((news) => (
                <div key={news.id} className="flex flex-col group">
                  <div className="relative w-full h-56 rounded-3xl overflow-hidden mb-5 bg-slate-200">
                    <img
                      src={getImageUrl(
                        news.gambar_url || news.gambar,
                        "/src/assets/img/placeholder.jpg",
                      )}
                      alt={news.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col grow items-start text-left">
                    <span className="text-[11px] font-bold text-custom-cyan tracking-wider uppercase mb-2">
                      {news.kategori || "BERITA"}
                    </span>
                    <h3 className="font-readex text-xl font-bold text-[#1c3250] mb-3 leading-snug group-hover:text-custom-cyan transition-colors line-clamp-2">
                      {news.judul}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {news.ringkasan || news.konten || news.isi_artikel}
                    </p>
                    <Link
                      to={`/publikasi/${news.id}`}
                      className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#1c3250] hover:text-custom-cyan transition-colors group/btn"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 text-slate-400">
                Belum ada berita dipublikasikan.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
