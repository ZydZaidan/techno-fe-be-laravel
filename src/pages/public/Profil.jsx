import demoday2 from "../../assets/img/demoday-2.jpeg";
import pakHaris from "../../assets/img/pak-haris.jpeg";
import pakHengki from "../../assets/img/pak-hengki.jpeg";
import kakChacha from "../../assets/img/kak-chacha.jpeg";
// import lpgSafeSense from "../../assets/img/lpg.jpeg";
// import smartMcbGuardian from "../../assets/img/smartmcb.jpeg";
// import hematin from "../../assets/img/hematin.jpeg";
import { Link } from "react-router-dom";

const MailIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const LinkIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 17H7a5 5 0 0 1 0-10h2" />
    <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldCheckIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const RocketIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

// DATA TIM
const teamMembers = [
  {
    name: "Pak Haris",
    role: "Direktur Technopark",
    photo: pakHaris,
    email: "haris@itpln.ac.id",
  },
  {
    name: "Pak Hengki",
    role: "Spesialis HKI",
    photo: pakHengki,
    email: "hengki@itpln.ac.id",
  },
  {
    name: "Kak Chacha",
    role: "Kemitraan Industri",
    photo: kakChacha,
    email: "chacha@itpln.ac.id",
  },
];

// DATA PRODUK INOVASI UNGGULAN
// const facilities = [
//   {
//     title: "LPG-SafeSense",
//     description: "Alat pemantau keamanan dan energi untuk tabung LPG, mendeteksi kebocoran gas secara real-time.",
//     image: lpgSafeSense,
//   },
//   {
//     title: "Smart MCB Guardian",
//     description: "Alat pintar untuk memantau kondisi instalasi listrik serta mendeteksi dan mencegah risiko korsleting sejak dini.",
//     image: smartMcbGuardian,
//   },
//   {
//     title: "HEMATIN",
//     description: "Smart energy saving device untuk memantau dan mengendalikan penggunaan energi listrik secara real-time.",
//     image: hematin,
//   },
// ];

// DATA FOKUS PENGEMBANGAN
const focusAreas = [
  {
    title: "Pengabdian Masyarakat",
    description: "Penerapan Teknologi Tepat Guna, Desa Binaan, dan pemberdayaan UMKM untuk menjawab kebutuhan nyata masyarakat.",
    icon: UsersIcon,
    borderColor: "border-[#20C997]",
    iconBg: "bg-[#D7F7EA]",
    iconColor: "text-[#16A77D]",
  },
  {
    title: "Hak Kekayaan Intelektual",
    description: "Pendampingan penuh dari drafting hingga penerbitan sertifikat resmi DJKI untuk melindungi karya inovasi.",
    icon: ShieldCheckIcon,
    borderColor: "border-custom-cyan",
    iconBg: "bg-[#D9F0FA]",
    iconColor: "text-custom-blue",
  },
  {
    title: "Inkubasi Bisnis & Inovasi",
    description: "Mengawal purwarupa hingga Demo Day bersama mitra industri agar produk siap dikomersialisasikan.",
    icon: RocketIcon,
    borderColor: "border-custom-yellow",
    iconBg: "bg-[#FFF4CF]",
    iconColor: "text-[#C89A00]",
  },
];

const Profil = () => {
  return (
    <div className="min-h-screen bg-white font-poppins text-[#092B52] pt-28 pb-16">
      
      {/* BREADCRUMB SECTION */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="layout-container">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
            <Link to="/" className="hover:underline">Beranda</Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#092B52]">Profil</span>
          </div>

          <h1 className="font-readex text-3xl md:text-4xl font-extrabold text-[#092B52]">
            Profil Technopark
          </h1>
        </div>
      </section>

      {/* PROFIL TECHNOPARK SECTION */}
      <section className="bg-white py-14">
        <div className="layout-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            
            {/* GAMBAR */}
            <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-2xl shadow-md">
              <img
                src={demoday2}
                alt="Demo Day Technopark"
                className="h-auto w-full object-cover"
              />
            </div>

            {/* DESKRIPSI */}
            <div>
              <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#092B52] mb-4">
                Membangun Ekosistem Inovasi
              </h2>

              <p className="mb-4 text-sm md:text-base leading-relaxed text-slate-600">
                BPM ITPLN adalah unit strategis di bawah Institut Teknologi PLN yang berdedikasi
                penuh untuk memfasilitasi hilirisasi hasil karya sivitas akademika agar manfaatnya
                dapat dirasakan langsung oleh masyarakat dan industri. Kehadiran BPM
                dilatarbelakangi oleh tingginya potensi riset di lingkungan kampus yang
                membutuhkan wadah pengelolaan terpadu.
              </p>

              <p className="text-sm md:text-base leading-relaxed text-slate-600">
                Oleh karena itu, BPM mengambil peran sentral dalam mengawal tiga pilar utama:
                pelaksanaan program Pengabdian kepada Masyarakat (PKM) yang terukur dan solutif,
                fasilitasi dan perlindungan Hak Kekayaan Intelektual (HKI) guna mengamankan aset
                akademik, serta penyediaan layanan Inkubasi Bisnis untuk mendampingi rintisan
                usaha (startup) agar siap bersaing di pasar. Melalui ketiga pilar ini, kami hadir
                untuk mengubah gagasan riset menjadi solusi nyata yang memiliki dampak komersial
                dan sosial positif bagi negeri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOKUS PENGEMBANGAN SECTION */}
      <section className="bg-[#EEF3FF] py-20">
        <div className="layout-container">
          <div className="mb-12 text-center">
            <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#092B52]">
              Fokus Pengembangan
            </h2>
            <p className="mx-auto mt-2 max-w-[600px] text-xs md:text-sm text-slate-600">
              Area strategis yang menjadi pilar utama dalam pengembangan inovasi di Technopark
              IT-PLN.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className={`rounded-2xl border-t-4 ${area.borderColor} bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${area.iconBg} ${area.iconColor}`}>
                  <area.icon className="h-6 w-6" />
                </div>
                <h3 className="font-readex mb-3 text-lg font-bold text-[#092B52]">
                  {area.title}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-slate-500">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FASILITAS UNGGULAN SECTION */}
      {/* <section className="bg-white py-20">
        <div className="layout-container">
          <div className="mb-12 text-center">
            <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#092B52]">
              Produk Inovasi Unggulan
            </h2>
            <p className="mx-auto mt-2 max-w-[600px] text-xs md:text-sm text-slate-600">
              Karya hasil pendampingan Inkubasi Bisnis yang telah tervalidasi dan siap
              dikomersialisasikan.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {facilities.map((facility) => (
              <div key={facility.title} className="group relative h-80 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092B52]/90 via-[#092B52]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-readex text-lg font-bold">{facility.title}</h3>
                  <p className="mt-2 text-xs md:text-sm leading-relaxed text-slate-200">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* TIM PENGGERAK INOVASI SECTION */}
      <section className=" py-20">
        <div className="layout-container">
          <div className="mb-12 text-center">
            <h2 className="font-readex text-2xl md:text-3xl font-extrabold text-[#092B52]">
              Tim Penggerak Inovasi
            </h2>
            <p className="mx-auto mt-2 max-w-[600px] text-xs md:text-sm text-slate-600">
              Para profesional yang berdedikasi untuk mendukung perjalanan inovasi Anda.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-2xl bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mx-auto h-24 w-24 rounded-full object-cover shadow-inner"
                />
                <h3 className="font-readex mt-5 text-lg font-bold text-[#092B52]">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs md:text-sm text-slate-500">{member.role}</p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue transition hover:bg-custom-blue hover:text-white"
                  >
                    <MailIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue transition hover:bg-custom-blue hover:text-white"
                  >
                    <LinkIcon className="h-4 w-4" />
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

export default Profil;