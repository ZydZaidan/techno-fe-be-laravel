import { useState } from "react";


// ================= IKON CUSTOM (SVG polos, tanpa library tambahan) =================
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

const ShareIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

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

// ================= DATA KONTAK (ubah di sini sesuai kebutuhan) =================
const contactInfo = {
  address:
    "Menara PLN, Jl. Lingkar Luar Barat Duri Kosambi, Cengkareng, Jakarta Barat 11750",
  email: "bpm@itpln.ac.id",
  phone: "021-5440342",
};

// Query lokasi untuk Google Maps embed (real-time, tanpa API key)
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
  const [status, setStatus] = useState(null); // null | "sending" | "sent"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // TODO: ganti bagian ini dengan pemanggilan API/backend kamu
    // contoh: fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white font-readex text-[#092B52]">
      {/* ================= JUDUL / BREADCRUMB ================= */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1180px] px-8 py-6">
          <div className="mb-1 flex items-center gap-1 text-[10px] text-gray-500">
            <span>Beranda</span>
            <span>&gt;</span>
            <span className="font-semibold text-[#092B52]">Contact</span>
          </div>

          <h1 className="font-poppins text-[25px] font-bold text-[#092B52]">
            Contact
          </h1>
        </div>
      </section>

      {/* ================= KONTEN ================= */}
      <section className="bg-[#F7F9FC] px-8 py-10">
        <div className="mx-auto grid max-w-[1180px] items-start gap-6 lg:grid-cols-2">
          {/* ================= INFORMASI KONTAK + MAPS ================= */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-poppins mb-5 text-[15px] font-bold text-[#092B52]">
              Informasi Kontak
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue">
                  <MapPinIcon className="h-[14px] w-[14px]" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold text-[#092B52]">Alamat</p>
                  <p className="text-[10px] leading-[1.6] text-gray-500">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue">
                  <MailIcon className="h-[14px] w-[14px]" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold text-[#092B52]">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-[10px] leading-[1.6] text-gray-500 hover:text-custom-blue"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue">
                  <PhoneIcon className="h-[14px] w-[14px]" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold text-[#092B52]">Telepon</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-[10px] leading-[1.6] text-gray-500 hover:text-custom-blue"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* MEDIA SOSIAL */}
            <div className="mt-6">
              <p className="mb-2 text-[10px] font-semibold text-[#092B52]">Media Sosial</p>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  aria-label="Bagikan"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue transition hover:bg-custom-blue hover:text-white"
                >
                  <ShareIcon className="h-[14px] w-[14px]" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue transition hover:bg-custom-blue hover:text-white"
                >
                  <InstagramIcon className="h-[14px] w-[14px]" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D9F0FA] text-custom-blue transition hover:bg-custom-blue hover:text-white"
                >
                  <YoutubeIcon className="h-[14px] w-[14px]" />
                </a>
              </div>
            </div>

            {/* MAPS REAL-TIME (Google Maps embed, tanpa API key) */}
            {/* Bagian atas iframe di-crop karena Google otomatis menampilkan
                link "Open in Maps" bawaan di pojok kiri atas — kita pakai
                tombol "Lihat di Google Maps" kita sendiri di bawah, jadi
                yang bawaan disembunyikan supaya tidak dobel. */}
            <div className="relative mt-6 h-[220px] w-full overflow-hidden rounded-xl">
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
                className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-white px-3 py-1.5 text-[10px] font-semibold text-[#092B52] shadow-sm transition hover:bg-gray-50"
              >
                <MapPinIcon className="h-[12px] w-[12px] text-custom-blue" />
                Lihat di Google Maps
              </a>
            </div>
          </div>

          {/* ================= FORM KIRIM PESAN ================= */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-poppins mb-1 text-[15px] font-bold text-[#092B52]">
              Kirim Pesan
            </h2>
            <p className="mb-5 text-[10px] leading-[1.6] text-gray-500">
              Silakan isi formulir di bawah ini untuk mengirimkan pertanyaan atau
              masukan kepada kami.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-[10px] font-semibold text-[#092B52]">
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
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[11px] text-[#092B52] placeholder:text-gray-400 focus:border-custom-blue focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-[10px] font-semibold text-[#092B52]">
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
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[11px] text-[#092B52] placeholder:text-gray-400 focus:border-custom-blue focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-1 block text-[10px] font-semibold text-[#092B52]">
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
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[11px] text-[#092B52] placeholder:text-gray-400 focus:border-custom-blue focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-[10px] font-semibold text-[#092B52]">
                  Pesan/Masukan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tuliskan pesan Anda di sini..."
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-[11px] text-[#092B52] placeholder:text-gray-400 focus:border-custom-blue focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-custom-yellow px-4 py-2.5 text-[11px] font-semibold text-[#092B52] transition hover:opacity-90 disabled:opacity-60"
              >
                <SendIcon className="h-[14px] w-[14px]" />
                {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
              </button>

              {status === "sent" && (
                <p className="text-center text-[10px] font-medium text-[#16A77D]">
                  Pesan berhasil dikirim. Terima kasih!
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;