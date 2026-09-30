import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-custom-blue text-white font-poppins border-t-2 border-custom-yellow">
      {/* Container Utama */}
      <div className="layout-container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Kolom 1: Brand & Deskripsi (Lebar: 4 grid) */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-wider font-readex text-white">
              TECHNOPARK
            </h2>
            <p className="text-slate-200 text-sm leading-relaxed max-w-sm">
Ekosistem terintegrasi IT-PLN untuk mengakselerasi inkubasi bisnis, legalitas HKI, dan kontribusi nyata melalui pengabdian masyarakat            </p>
          </div>

          {/* Kolom 2: Navigasi Utama (Lebar: 3 grid) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-custom-yellow font-bold text-sm tracking-wide">
              Navigasi Utama
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-200">
              <li>
                <Link to="/" className="hover:text-custom-yellow transition-colors duration-300">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/profil" className="hover:text-custom-yellow transition-colors duration-300">
                  Tentang Kami
                </Link>
              </li>
          
              <li>
                <Link to="/inkubasi" className="hover:text-custom-yellow transition-colors duration-300">
                  Program Inkubasi
                </Link>
              </li>
              <li>
                <Link to="/inovasi" className="hover:text-custom-yellow transition-colors duration-300">
                  Portofolio Produk
                </Link>
              </li>
              <li>
                <Link to="/publikasi" className="hover:text-custom-yellow transition-colors duration-300">
                  Artikel & Blog
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-custom-yellow transition-colors duration-300">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Kami (Lebar: 5 grid) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-custom-yellow font-bold text-sm tracking-wide">
              Kontak Kami
            </h3>
            <ul className="space-y-3 text-sm text-slate-200">
              
              {/* Alamat */}
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-tight">
                  Menara PLN, Jl. Lingkar Luar Barat, Duri Kosambi, Cengkareng, Jakarta Barat 11750
                </span>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:bpm@itpln.ac.id" className="hover:text-custom-yellow transition-colors duration-300">
                  bpm@itpln.ac.id
                </a>
              </li>

              {/* Telepon */}
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(021) 5440342 / 2210</span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Line & Copyright Bottom */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-300">
        <p>© 2024 BPM IT-PLN. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;