import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Publik */}
      <Navbar />
      
      {/* Konten Halaman Publik (Home, Profil, dll) akan berganti di sini */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Footer Publik */}
      <Footer />
    </div>
  );
};

export default PublicLayout;