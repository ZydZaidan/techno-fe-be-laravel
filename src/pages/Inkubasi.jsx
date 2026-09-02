import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Inkubasi = () => {
  const navigate = useNavigate();

  // Handler saat tombol "Daftar Sekarang" diklik
  const handleDaftarClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/pengajuan-inkubasi");
    } else {
      // Jika belum login, redirect ke login
      navigate("/login");
    }
  };

  // 📦 Data Dummy Tahapan Inkubasi
  const incubationSteps = [
    {
      id: "1",
      number: "1",
      title: "Pra-Inkubasi",
      desc: "Validasi ide bisnis, pembentukan tim yang solid, dan penyusunan model bisnis awal yang terukur.",
      iconBg: "bg-cyan-50 text-custom-cyan",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
    {
      id: "2",
      number: "2",
      title: "Inkubasi",
      desc: "Pengembangan MVP, mentoring intensif, legalitas usaha, dan persiapan penetrasi pasar.",
      iconBg: "bg-cyan-100 text-custom-blue",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: "3",
      number: "3",
      title: "Akselerasi",
      desc: "Scaling up bisnis, akses pendanaan lanjutan, ekspansi pasar, dan kemitraan strategis.",
      iconBg: "bg-custom-blue text-white",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  // 📦 Data Dummy Startup & Tenant
  const tenants = [
    {
      id: 1,
      name: "VoltGrid Solutions",
      category: "Energy Tech",
      batch: "Batch 4",
      desc: "Platform manajemen efisiensi energi terintegrasi IoT untuk industri.",
      img: "/src/assets/img/showcase-1.jpg",
    },
    {
      id: 2,
      name: "AgriSmart AI",
      category: "AgriTech",
      batch: "Batch 4",
      desc: "Aplikasi deteksi hama dan rekomendasi pupuk presisi berbasis AI.",
      img: "/src/assets/img/showcase-2.jpg",
    },
    {
      id: 3,
      name: "LearnLoop",
      category: "EdTech",
      batch: "Batch 3",
      desc: "Sistem manajemen pembelajaran gamifikasi untuk perguruan tinggi.",
      img: "/src/assets/img/showcase-3.jpg",
    },
    {
      id: 4,
      name: "EcoCharge Grid",
      category: "CleanTech",
      batch: "Batch 3",
      desc: "Jaringan swap baterai motor listrik cerdas tenaga surya.",
      img: "/src/assets/img/showcase-4.jpg",
    },
  ];

  // 📦 Data Dummy Mentor Expert
  const mentors = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "VC & Network Funding",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    },
    {
      id: 2,
      name: "Dian Lestari",
      role: "Digital Marketing",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dian",
    },
    {
      id: 3,
      name: "Ario Wibowo",
      role: "Product & Tech",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ario",
    },
    {
      id: 4,
      name: "Rudi Hermawan",
      role: "Legal & Hak Cipta",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi",
    },
    {
      id: 5,
      name: "Siti Rahmah",
      role: "Business Strategy",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-poppins pt-24">
      <Navbar />

      {/* 🚀 1. SECTION TAHAPAN INKUBASI */}
      <section className="w-full bg-[#f8fafc] py-20">
        <div className="layout-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-readex text-3xl md:text-4xl font-extrabold text-[#1c3250] mb-3">
              Tahapan Inkubasi
            </h2>
            <div className="w-16 h-1 bg-custom-cyan mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {incubationSteps.map((step) => (
              <div
                key={step.id}
                className="relative bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between items-start text-left group overflow-hidden"
              >
                <span className="absolute top-2 right-6 font-readex text-7xl font-extrabold text-slate-100 select-none group-hover:text-slate-200 transition-colors">
                  {step.number}
                </span>

                <div className="relative z-10 w-full">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-sm ${step.iconBg}`}>
                    {step.icon}
                  </div>

                  <h3 className="font-readex text-xl font-bold text-[#1c3250] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 2. SECTION STARTUP & TENANT KAMI */}
      <section className="w-full bg-[#f8fafc] py-20">
        <div className="layout-container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-readex text-3xl md:text-4xl font-extrabold text-[#1c3250] mb-2">
                Startup & Tenant Kami
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                Inovasi nyata karya mahasiswa dan alumni technopark.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tenants.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col group"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-cyan-400 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.batch}
                  </span>
                </div>

                <div className="p-6 flex flex-col grow justify-between text-left">
                  <div>
                    <h3 className="font-readex text-lg font-bold text-[#1c3250] mb-2 group-hover:text-custom-cyan transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 3. SECTION JARINGAN MENTOR EXPERT */}
      <section className="w-full bg-[#f8fafc] py-16">
        <div className="layout-container">
          <div className="bg-linear-to-b from-[#eef7ff] to-[#e4f0fc] rounded-3xl p-10 md:p-14 border border-blue-100/60 shadow-sm text-center">
            <div className="max-w-xl mx-auto mb-12">
              <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#1c3250] mb-2">
                Jaringan Mentor Expert
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                Didampingi oleh praktisi industri dan akademisi terkemuka.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="flex flex-col items-center group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-3 bg-white group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={mentor.img}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-readex text-sm md:text-base font-bold text-[#1c3250]">
                    {mentor.name}
                  </h4>
                  <p className="text-xs text-custom-cyan font-medium mt-0.5">
                    {mentor.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 4. SECTION CTA BANNER */}
      <section className="w-full bg-[#f8fafc] py-16 mb-12">
        <div className="layout-container">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-cyan-200 via-blue-100 to-teal-100 p-10 md:p-16 border border-cyan-100/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-left">
              <h2 className="font-readex text-3xl md:text-4xl font-black text-[#0b2447] leading-tight mb-4">
                Punya Ide Bisnis Brilian? Mari Wujudkan Bersama Kami.
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Pendaftaran Batch 5 telah dibuka. Bergabunglah dengan ekosistem
                inovasi terbaik.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={handleDaftarClick}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#0b2447] text-white font-bold rounded-full hover:bg-custom-blue transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base cursor-pointer"
              >
                Daftar Sekarang
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Inkubasi;