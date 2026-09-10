import { useState } from "react";
import { Link } from "react-router-dom";

// IKON CUSTOM SVG
const MapPinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z" />
  </svg>
);

// const ShareIcon = ({ className }) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <circle cx="18" cy="5" r="3" />
//     <circle cx="6" cy="12" r="3" />
//     <circle cx="18" cy="19" r="3" />
//     <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
//     <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
//   </svg>
// );

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33Z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const SendIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const contactInfo = {
  address: "Menara PLN, Jl. Lingkar Luar Barat Duri Kosambi, Cengkareng, Jakarta Barat 11750",
  email: "bpm@itpln.ac.id",
  phone: "(021) 5440342 / 2210 ",
};

const mapsQuery = encodeURIComponent(
  "Institut Teknologi PLN, Jl. Lingkar Luar Barat Duri Kosambi, Cengkareng, Jakarta Barat 11750"
);
const mapsEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
const mapsLinkSrc = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white font-poppins text-[#092B52] pt-28 pb-16">
      
      {/* BREADCRUMB */}
      <section className="border-b border-gray-100 bg-white py-6 mb-8 text-left">
        <div className="layout-container">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
            <Link to="/" className="hover:underline">Beranda</Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#092B52]">Contact</span>
          </div>
          <h1 className="font-readex text-3xl md:text-4xl font-extrabold text-[#092B52]">
            Contact
          </h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-4 text-left">
        <div className="layout-container">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            
            {/* INFORMASI KONTAK & MAPS */}
            <div className="rounded-2xl bg-white p-6 md:p-8 border border-slate-100 shadow-sm">
              <h2 className="font-readex text-lg font-bold text-[#092B52] mb-6">
                Informasi Kontak
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <MapPinIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#092B52]">Alamat</p>
                    <p className="text-xs leading-relaxed text-slate-500 mt-0.5">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <MailIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#092B52]">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-xs leading-relaxed text-slate-500 hover:text-cyan-600 transition-colors mt-0.5 inline-block"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#092B52]">Telepon</p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-xs leading-relaxed text-slate-500 hover:text-cyan-600 transition-colors mt-0.5 inline-block"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* MEDIA SOSIAL */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs font-bold text-[#092B52] mb-3">Media Sosial</p>
                <div className="flex items-center gap-2.5">
                  {/* <a
                    href="#"
                    aria-label="Bagikan"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-[#092B52] hover:text-white transition-colors"
                  >
                    <ShareIcon className="h-4 w-4" />
                  </a> */}
                  <a
                    href="https://www.instagram.com/bpm.itpln/"
                    aria-label="Instagram"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-[#092B52] hover:text-white transition-colors"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@BuibItpln"
                    aria-label="YouTube"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-[#092B52] hover:text-white transition-colors"
                  >
                    <YoutubeIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* MAPS REAL-TIME */}
              <div className="relative mt-8 h-60 w-full overflow-hidden rounded-xl border border-slate-100">
                <iframe
                  title="Lokasi Technopark IT-PLN"
                  src={mapsEmbedSrc}
                  className="w-full border-0"
                  style={{ height: "calc(100% + 45px)", marginTop: "-45px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href={mapsLinkSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#092B52] shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <MapPinIcon className="h-3.5 w-3.5 text-cyan-600" />
                  Lihat di Google Maps
                </a>
              </div>
            </div>

            {/* FORM KIRIM PESAN */}
            <div className="rounded-2xl bg-white p-6 md:p-8 border border-slate-100 shadow-sm">
              <h2 className="font-readex text-lg font-bold text-[#092B52] mb-1">
                Kirim Pesan
              </h2>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Silakan isi formulir di bawah ini untuk mengirimkan pertanyaan atau masukan kepada kami.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#092B52] mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#092B52] placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#092B52] mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="alamat@email.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#092B52] placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-[#092B52] mb-1.5">
                    Subjek
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Topik pesan"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#092B52] placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#092B52] mb-1.5">
                    Pesan / Masukan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tuliskan pesan Anda di sini..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#092B52] placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-custom-yellow hover:opacity-90 px-5 py-3 text-xs font-bold text-[#092B52] transition shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  <SendIcon className="h-3.5 w-3.5" />
                  {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
                </button>

                {status === "sent" && (
                  <p className="text-center text-xs font-semibold text-emerald-600 pt-2">
                    Pesan berhasil dikirim. Terima kasih!
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;