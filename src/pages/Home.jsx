import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // <--- Import Navbar buatan kita
import Footer from '../components/Footer';
const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 🧭 Panggil Navbar di sini */}
      <Navbar />

      {/* 🚀 Hero Section (Isi Utama Halaman Home) */}
      <main className="flex-grow flex items-center justify-center text-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Selamat Datang di <span className="text-blue-600">Technopark IT-PLN</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Pusat inovasi, inkubasi startup, dan pengelolaan Hak Kekayaan Intelektual (HKI) berbasis digital.
          </p>
          
          {/* Tombol Aksi Cepat */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/inovasi" 
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Jelajahi Inovasi
            </Link>
            <Link 
              to="/inkubasi" 
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-sm border border-slate-200 hover:bg-slate-100 transition-all"
            >
              Daftar Inkubasi
            </Link>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Home;