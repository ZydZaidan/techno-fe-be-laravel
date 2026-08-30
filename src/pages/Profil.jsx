import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import demoday2 from "../assets/img/demoday-2.jpeg";
import pakHaris from "../assets/img/pak-haris.jpeg";
import pakHengki from "../assets/img/pak-hengki.jpeg";
import kakChacha from "../assets/img/kak-chacha.jpeg";
import lpgSafeSense from "../assets/img/lpg.jpeg";
import smartMcbGuardian from "../assets/img/smartmcb.jpeg";
import hematin from "../assets/img/hematin.jpeg";


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

// ================= DATA TIM (biar gampang nambah/edit tanpa ubah JSX) =================
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

// ================= DATA PRODUK INOVASI UNGGULAN =================
// Sumber: produk hasil pendampingan Inkubasi Bisnis BPM ITPLN
const facilities = [
  {
    title: "LPG-SafeSense",
    description: "Alat pemantau keamanan dan energi untuk tabung LPG, mendeteksi kebocoran gas secara real-time.",
    image: lpgSafeSense,
  },
  {
    title: "Smart MCB Guardian",
    description: "Alat pintar untuk memantau kondisi instalasi listrik serta mendeteksi dan mencegah risiko korsleting sejak dini.",
    image: smartMcbGuardian,
  },
  {
    title: "HEMATIN",
    description: "Smart energy saving device untuk memantau dan mengendalikan penggunaan energi listrik secara real-time.",
    image: hematin,
  },
];

// ================= DATA FOKUS PENGEMBANGAN =================
// Sumber: 3 pilar Layanan BPM ITPLN (Profil Unit Kerja BPM)
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
    <div className="min-h-screen bg-white font-readex text-[#092B52]">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= JUDUL / BREADCRUMB ================= */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1180px] px-8 py-6">
          <div className="mb-1 flex items-center gap-1 text-[10px] text-gray-500">
            <span>Beranda</span>
            <span>&gt;</span>
            <span className="font-semibold text-[#092B52]">Profil</span>
          </div>

          <h1 className="font-poppins text-[25px] font-bold text-[#092B52]">
            Profil Technopark
          </h1>
        </div>
      </section>

      {/* ================= PROFIL TECHNOPARK ================= */}
      <section className="bg-white px-8 py-10">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-2">
          {/* GAMBAR */}
          <div className="mx-auto w-full max-w-[470px] overflow-hidden rounded-xl shadow-sm">
            <img
              src={demoday2}
              alt="Demo Day Technopark"
              className="h-auto w-full object-contain"
            />
          </div>

          {/* DESKRIPSI */}
          <div>
            <h2 className="font-poppins mb-3 text-[19px] font-bold text-[#092B52]">
              Membangun Ekosistem Inovasi
            </h2>

            <p className="mb-3 text-[11px] leading-[1.7] text-gray-600">
              BPM ITPLN adalah unit strategis di bawah Institut Teknologi PLN yang berdedikasi
              penuh untuk memfasilitasi hilirisasi hasil karya sivitas akademika agar manfaatnya
              dapat dirasakan langsung oleh masyarakat dan industri. Kehadiran BPM
              dilatarbelakangi oleh tingginya potensi riset di lingkungan kampus yang
              membutuhkan wadah pengelolaan terpadu.
            </p>

            <p className="mb-3 text-[11px] leading-[1.7] text-gray-600">
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
      </section>

      {/* ================= FOKUS PENGEMBANGAN ================= */}
      <section className="bg-[#EEF3FF] px-8 py-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-9 text-center">
            <h2 className="font-poppins text-[20px] font-bold text-[#092B52]">
              Fokus Pengembangan
            </h2>
            <p className="mx-auto mt-2 max-w-[550px] text-[10px] leading-5 text-gray-600">
              Area strategis yang menjadi pilar utama dalam pengembangan inovasi di Technopark
              IT-PLN.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className={`rounded-xl border-t-[2px] ${area.borderColor} bg-white px-5 py-5 text-center shadow-sm`}
              >
                <div className={`mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full ${area.iconBg} ${area.iconColor}`}>
                  <area.icon className="h-[18px] w-[18px]" />
                </div>
                <h3 className="font-poppins mb-2 text-[16px] font-bold text-[#092B52]">
                  {area.title}
                </h3>
                <p className="text-left text-[10px] leading-[1.6] text-gray-500" style={{ textAlign: "justify" }}>
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FASILITAS UNGGULAN ================= */}
      <section className="bg-white px-8 py-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-9 text-center">
            <h2 className="font-poppins text-[20px] font-bold text-[#092B52]">
              Produk Inovasi Unggulan
            </h2>
            <p className="mx-auto mt-2 max-w-[550px] text-[10px] leading-5 text-gray-600">
              Karya hasil pendampingan Inkubasi Bisnis yang telah tervalidasi dan siap
              dikomersialisasikan.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {facilities.map((facility) => (
              <div key={facility.title} className="group relative h-[260px] overflow-hidden rounded-xl shadow-sm">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092B52]/85 via-[#092B52]/10 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="font-poppins text-[13px] font-bold">{facility.title}</h3>
                  <p className="mt-1 text-[10px] leading-[1.5] text-gray-100">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIM PENGGERAK INOVASI ================= */}
      <section className="bg-[#EEF3FF] px-8 py-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-9 text-center">
            <h2 className="font-poppins text-[20px] font-bold text-[#092B52]">
              Tim Penggerak Inovasi
            </h2>
            <p className="mx-auto mt-2 max-w-[550px] text-[10px] leading-5 text-gray-600">
              Para profesional yang berdedikasi untuk mendukung perjalanan inovasi Anda.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-xl bg-white px-6 py-7 text-center shadow-sm">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                />
                <h3 className="font-poppins mt-4 text-[13px] font-bold text-[#092B52]">
                  {member.name}
                </h3>
                <p className="mt-1 text-[10px] text-gray-500">{member.role}</p>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue transition hover:bg-custom-blue hover:text-white"
                  >
                    <MailIcon className="h-[14px] w-[14px]" />
                  </a>
                  <a
                    href="#"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue transition hover:bg-custom-blue hover:text-white"
                  >
                    <LinkIcon className="h-[14px] w-[14px]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default Profil;