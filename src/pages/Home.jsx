import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 font-sans text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
        🏠 Halaman Home Technopark
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Yeay! Routing sukses. Coba tes klik tombol di bawah buat pindah halaman.
      </p>
      
      {/* Tombol buat ngetes fitur Link dari React Router */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/inovasi" 
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          🚀 Ke Halaman Inovasi
        </Link>
        <Link 
          to="/login" 
          className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-900 transition-all"
        >
          🔐 Tes Halaman Login
        </Link>
      </div>
    </div>
  );
};

export default Home;