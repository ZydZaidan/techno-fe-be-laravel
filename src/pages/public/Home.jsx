import { Link } from "react-router-dom";
import { useRef, useState } from "react";


const Home = () => {
  const scrollRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

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
    const walk = (x - startX) * 1.8; // Angka 1.8 menentukan kecepatan drag/geser
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  // 📦 Data Dummy 7 
  const showcaseData = [
    {
      id: 1,
      tag: "TENANT",
      title: "Smart Energy Hub",
      desc: "Solusi manajemen energi IoT untuk efisiensi listrik kampus.",
      img: "/src/assets/img/showcase-1.jpg", 
      tagBg: "bg-cyan-400 text-slate-900",
    },
    {
      id: 2,
      tag: "TENANT",
      title: "EduConnect App",
      desc: "Platform kolaborasi mahasiswa dan dosen berbasis gamifikasi.",
      img: "/src/assets/img/showcase-2.jpg",
      tagBg: "bg-cyan-400 text-slate-900",
    },
    {
      id: 3,
      tag: "ALUMNI",
      title: "SolarBot Clean",
      desc: "Robot pembersih panel surya otomatis untuk efisiensi maksimal.",
      img: "/src/assets/img/showcase-3.jpg",
      tagBg: "bg-amber-400 text-slate-900",
    },
    {
      id: 4,
      tag: "RESEARCH",
      title: "EV Charging Grid",
      desc: "Stasiun pengisian daya cepat kendaraan listrik terintegrasi solar.",
      img: "/src/assets/img/showcase-4.jpg",
      tagBg: "bg-emerald-400 text-slate-900",
    },
    {
      id: 5,
      tag: "TENANT",
      title: "Microgrid Monitor",
      desc: "Sistem monitoring jaringan listrik pintar secara real-time.",
      img: "/src/assets/img/showcase-5.jpg",
      tagBg: "bg-cyan-400 text-slate-900",
    },
    {
      id: 6,
      tag: "ALUMNI",
      title: "WindTurbine AI",
      desc: "Prediksi kecerdasan buatan untuk perawatan turbin angin.",
      img: "/src/assets/img/showcase-6.jpg",
      tagBg: "bg-amber-400 text-slate-900",
    },
    {
      id: 7,
      tag: "RESEARCH",
      title: "BioEnergy Generator",
      desc: "Pembangkit listrik ramah lingkungan berbasis limbah organik.",
      img: "/src/assets/img/showcase-7.jpg",
      tagBg: "bg-emerald-400 text-slate-900",
    },
  ];
  const partners = [
    { id: 1, name: 'Mitra 1', logo: '/src/assets/img/partner-1.png' },
    { id: 2, name: 'Mitra 2', logo: '/src/assets/img/partner-2.png' },
  ];

  // Data Dummy Kabar Terbaru (Blog/News)
  const latestNews = [
    {
      id: 1,
      category: 'EVENT',
      title: 'Pitching Day Batch 4: Mahasiswa Hadirkan Solusi Energi...',
      desc: 'Sebanyak 15 tim tenant mempresentasikan ide bisnis inovatif mereka di hadapan para investor dan panel ahli...',
      img: '/src/assets/img/news-1.jpg',
      link: '/blog/pitching-day-batch-4',
    },
    {
      id: 2,
      category: 'WORKSHOP',
      title: 'Workshop Strategi Paten untuk Inovasi Hardware',
      desc: 'Technopark memfasilitasi workshop intensif mengenai perlindungan HKI bagi inovator teknologi keras.',
      img: '/src/assets/img/news-2.jpg',
      link: '/blog/workshop-strategi-paten',
    },
    {
      id: 3,
      category: 'FASILITAS',
      title: 'Peresmian Ruang Kolaborasi Baru untuk Tenant Inkubator',
      desc: 'Meningkatkan kapasitas pendampingan, Technopark membuka sayap gedung baru dengan fasilitas lab IoT.',
      img: '/src/assets/img/news-3.jpg',
      link: '/blog/peresmian-ruang-kolaborasi',
    },
  ];
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-poppins">

      <section className="relative w-full min-h-screen flex items-center pt-32 pb-20">
        {/* Background Image & Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/img/hero-img.svg')" }} // Siapin fotonya!
        >
          {/* Layer warna gradient biru ke turquoise biar mirip desain */}
          <div className="absolute inset-0 bg-linear-to-r from-[#031B33] via-[#093C5C]/90 to-[#1B799E]/80"></div>
        </div>

        {/* Konten Text Hero */}
        <div className="relative z-10 layout-container mx-auto px-6 w-full">
          <div className="max-w-3xl text-white">
            <h1 className="font-readex text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Akselerasi Inovasi, <br />
              Bangun Bisnis{" "}
              <span className="text-custom-yellow">Masa Depan</span>
            </h1>
            <p className="text-slate-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
              Technopark IT-PLN adalah wadah eksperimental dan profesional untuk
              mencetak technopreneur handal, memfasilitasi HKI, dan
              mengembangkan inovasi teknologi energi.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/inovasi"
                className="px-8 py-3.5 bg-custom-yellow text-slate-900 font-bold rounded-full hover:bg-custom-yellow-light transition-colors text-center"
              >
                Pelajari Lebih Lanjut
              </Link>
              <Link
                to="/inkubasi"
                className="px-8 py-3.5 border-2 border-custom-yellow text-custom-yellow font-bold rounded-full hover:bg-custom-yellow hover:text-slate-900 transition-all duration-300 text-center"
              >
                Buat Pengajuan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-28 ">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative w-full h-100 sm:h-125">
              <img
                src="/src/assets/img/hero-img.svg"
                alt="Fasilitas Gedung Technopark"
                className="absolute top-0 left-0 w-3/4 h-75 sm:h-100 object-cover rounded-3xl shadow-lg"
              />
              <img
                src="/src/assets/img/about1.svg"
                alt="Tim Diskusi Startup"
                className="absolute bottom-0 right-0 w-2/3 h-62.5 sm:h-75 object-cover rounded-3xl shadow-2xl border-8 border-white"
              />
            </div>

            {/* Area Kanan: Konten Teks */}
            <div className="pl-0 lg:pl-10">
              <h2 className="font-readex text-3xl md:text-4xl font-extrabold text-[#1c3250] mb-3 uppercase tracking-wider">
                About Our Technopark
              </h2>
              <h3 className="text-lg text-slate-500 mb-6 font-medium">
                Empowering the Next Generation of Innovators
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-[15px]">
                At Technopark IT-PLN, we believe in the transformative power of
                innovation and the boundless potential within every individual.
                Established to foster intellectual curiosity and academic
                excellence, we create a vibrant ecosystem for startups.
              </p>
              <Link
                to="/profil"
                className="inline-flex items-center gap-2 text-custom-cyan font-semibold hover:text-custom-blue transition-colors group"
              >
                View Our Program
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
      {/* FLOATING STAT CARD */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 w-full -mt-16 md:-mt-12 mb-20">
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

          {/* Item 3: Publikasi */}
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
      {/* SECTION DUKUNGAN INOVATOR */}
      <section className="w-full bg-[#f8fafc] py-24">
        <div className="layout-container">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-readex text-3xl md:text-4xl font-extrabold text-[#1c3250] mb-3">
              Dukungan Inovator
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              Kami siapkan ruang, mentor, hingga perlindungan hukum biar lo bisa
              fokus berkarya.
            </p>
          </div>

          {/* Grid 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Inkubasi Bisnis */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-start text-left">
              <div>
                {/* Icon Circle (Biru Muda) */}
                <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-custom-cyan"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0M12 12h.01"
                    />
                    {/* Icon Rocket/Inkubasi */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-readex text-xl font-bold text-[#1c3250] mb-3">
                  Inkubasi Bisnis
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Program intensif bimbingan startup dari tahap ide hingga siap
                  pasar bersama mentor ahli.
                </p>
              </div>
            </div>

            {/* Card 2: Fasilitasi HKI */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-start text-left">
              <div>
                {/* Icon Circle (Kuning Muda) */}
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* Icon Gavel/Palu HKI */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 18h12l3-18H3zm3 0V4a2 2 0 012-2h8a2 2 0 012 2v2"
                    />
                  </svg>
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

            {/* Card 3: Co-Working Space */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-start text-left">
              <div>
                {/* Icon Circle (Biru Tua Muda) */}
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-[#1c3250]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* Icon Users/Co-Working */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
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
      <section className="w-full bg-[#f8fafc] py-24 select-none">
        <div className="layout-container">
          {/* Header Section */}
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

          {/* 🚀 DRAGGABLE CAROUSEL CONTAINER */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 transition-all duration-150 ${
              isMouseDown ? "cursor-grabbing scale-[0.99]" : "cursor-grab"
            }`}
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE & Edge */,
            }}
          >
            {/* Sembunyikan Scrollbar Chrome, Safari & Opera */}
            <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>

            {showcaseData.map((item) => (
              <div
                key={item.id}
                className="relative min-w-70 sm:min-w-[320px] h-110 rounded-3xl overflow-hidden shadow-lg group shrink-0"
              >
                {/* Image Background */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable="false" // Biar gambarnya gak ke-drag bawaan browser
                />

                {/* Gradient Overlay dari Gelap ke Transparan (mirip acuan) */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0b2447] via-[#0b2447]/60 to-transparent"></div>

                {/* Card Content (Teks di Bagian Bawah) */}
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white z-10">
                  <span
                    className={`inline-block text-[10px] font-bold px-3 py-1 rounded-md tracking-wider mb-3 uppercase ${item.tagBg}`}
                  >
                    {item.tag}
                  </span>

                  <h3 className="font-readex text-2xl font-bold mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 🤝 1. SECTION MITRA KOLABORASI */}
      <section className="w-full bg-[#f8fafc] py-20 border-b border-slate-100">
        <div className="layout-container">
          
          {/* Header Mitra */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#1c3250] mb-2">
              Mitra Kolaborasi
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Dipercaya oleh industri dan institusi terkemuka.
            </p>
          </div>

          {/* Grid Logo Cards */}
          <div className="flex flex-wrap items-center justify-center gap-6 max-w-5xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center mx-12 "
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-28 w-auto object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 📰 2. SECTION KABAR TERBARU */}
      <section className="w-full bg-[#f8fafc] py-24">
        <div className="layout-container">
          
          {/* Header Kabar Terbaru */}
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
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Grid 3 Cards News */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <div key={news.id} className="flex flex-col group">
                {/* Gambar Artikel dengan Border-Radius Lebar */}
                <div className="relative w-full h-56 rounded-3xl overflow-hidden mb-5">
                  <img
                    src={news.img}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Artikel */}
                <div className="flex flex-col grow items-start text-left">
                  {/* Category Tag */}
                  <span className="text-[11px] font-bold text-custom-cyan tracking-wider uppercase mb-2">
                    {news.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-readex text-xl font-bold text-[#1c3250] mb-3 leading-snug group-hover:text-custom-cyan transition-colors line-clamp-2">
                    {news.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {news.desc}
                  </p>

                  {/* Read More Link */}
                  <Link
                    to={news.link}
                    className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#1c3250] hover:text-custom-cyan transition-colors group/btn"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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

export default Home;
