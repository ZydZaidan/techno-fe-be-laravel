import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarVerifikator from '../components/dashboard/SidebarVerifikator';
import HeaderVerifikator from '../components/dashboard/HeaderVerifikator';

const VerifikatorLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-poppins">
      <SidebarVerifikator
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <HeaderVerifikator
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 px-4 sm:px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VerifikatorLayout;