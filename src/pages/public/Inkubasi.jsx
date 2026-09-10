import { Link, useNavigate } from "react-router-dom";

const Inkubasi = () => {
  const navigate = useNavigate();

  // Handler saat tombol "Daftar Sekarang" diklik
  const handleDaftarClick = () => {
    const userStr = sessionStorage.getItem("user");

    if (!userStr) {
      navigate("/login", { state: { redirectTo: "/user/inkubasi/pengajuan" } });
      return;
    }

    const user = JSON.parse(userStr);
    const role = user.role;

    if (role === "user" || role === "tenant") {
      navigate("/user/inkubasi/pengajuan");
    } else if (role === "admin" || role === "administrator") {
      alert("Akun Admin tidak dapat mendaftarkan inkubasi tenant. Silakan gunakan akun tenant/user.");
      navigate("/admin/dashboard");
    } else if (role === "verifikator") {
      alert("Akun Verifikator memiliki akses evaluasi, bukan untuk pendaftaran tenant.");
      navigate("/verifikator/dashboard");
    } else if (role === "reviewer") {
      alert("Akun Reviewer bertugas mereview proposal, bukan mendaftar.");
      navigate("/reviewer/dashboard");
    } else {
      alert("Role Anda tidak diizinkan mengakses pendaftaran inkubasi.");
    }
  };

  // Data Tahapan Inkubasi
  const incubationSteps = [
    {
      id: "1",
      number: "1",
      title: "Pra-Inkubasi",
      desc: "Validasi ide bisnis, pembentukan tim yang solid, dan penyusunan model bisnis awal yang terukur.",
      iconBg: "bg-cyan-50 text-cyan-600",
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
      iconBg: "bg-cyan-100 text-[#092B52]",
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
      iconBg: "bg-[#092B52] text-white",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  // Data Mentor Expert
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
    <div className="min-h-screen bg-white font-poppins text-[#092B52] pt-28 pb-16 text-left">
      
      {/* BREADCRUMB */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="layout-container">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
            <Link to="/" className="hover:underline">Beranda</Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#092B52]">Inkubasi</span>
          </div>
          <h1 className="font-readex text-3xl md:text-4xl font-extrabold text-[#092B52]">
            Inkubasi
          </h1>
        </div>
      </section>

      {/* 🚀 1. SECTION TAHAPAN INKUBASI */}
      <section className="w-full bg-[#f8fafc] py-16 md:py-20">
        <div className="layout-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#092B52] mb-3">
              Tahapan Inkubasi
            </h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {incubationSteps.map((step) => (
              <div
                key={step.id}
                className="relative bg-white p-8 rounded-3xl shadow-xs border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between items-start text-left group overflow-hidden"
              >
                <span className="absolute top-2 right-6 font-readex text-7xl font-extrabold text-slate-100 select-none group-hover:text-slate-200 transition-colors">
                  {step.number}
                </span>

                <div className="relative z-10 w-full">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-xs ${step.iconBg}`}>
                    {step.icon}
                  </div>

                  <h3 className="font-readex text-xl font-bold text-[#092B52] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 2. SECTION BANNER CTA KE INOVASI (PENGGANTI SHOWCASE) */}
      <section className="w-full bg-white py-12 border-y border-slate-100">
        <div className="layout-container">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-md">
            
            {/* Hiasan background visual */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-xl text-left z-10">
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest block mb-2">
                Output Program Inkubasi
              </span>
              <h3 className="font-readex text-2xl md:text-3xl font-extrabold text-white mb-3 leading-snug">
                Penasaran Dengan Produk Hasil Inkubasi Kami?
              </h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Jelajahi berbagai produk, dApp, startup, dan hasil riset inovatif ciptaan tenant serta alumni program inkubasi technopark.
              </p>
            </div>

            <div className="z-10 w-full md:w-auto shrink-0">
              <Link
                to="/inovasi"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs md:text-sm rounded-full transition-all duration-300 shadow-sm hover:shadow-cyan-400/20 group"
              >
                Lihat Galeri Inovasi
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

          </div>
        </div>
      </section>

      {/* 🚀 3. SECTION JARINGAN MENTOR EXPERT */}
      <section className="w-full bg-[#f8fafc] py-16">
        <div className="layout-container">
          <div className="bg-gradient-to-b from-[#eef7ff] to-[#e4f0fc] rounded-3xl p-8 md:p-12 border border-blue-100/60 shadow-xs text-center">
            <div className="max-w-xl mx-auto mb-12">
              <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#092B52] mb-2">
                Jaringan Mentor Expert
              </h2>
              <p className="text-slate-500 text-xs md:text-sm">
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
                  <h4 className="font-readex text-sm md:text-base font-bold text-[#092B52]">
                    {mentor.name}
                  </h4>
                  <p className="text-xs text-cyan-600 font-semibold mt-0.5">
                    {mentor.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 4. SECTION CTA BANNER DAFTAR */}
      <section className="w-full bg-[#f8fafc] pb-16">
        <div className="layout-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-200 via-blue-100 to-teal-100 p-8 md:p-14 border border-cyan-100/50 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-left">
              <h2 className="font-readex text-2xl md:text-4xl font-extrabold text-[#0b2447] leading-tight mb-3">
                Punya Ide Bisnis Brilian? Mari Wujudkan Bersama Kami.
              </h2>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Pendaftaran Batch 5 telah dibuka. Bergabunglah dengan ekosistem
                inovasi terbaik.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <button
                onClick={handleDaftarClick}
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0b2447] text-white font-bold rounded-full hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg text-xs md:text-sm cursor-pointer"
              >
                Daftar Sekarang
                <svg
                  className="w-4 h-4"
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

    </div>
  );
};

export default Inkubasi;