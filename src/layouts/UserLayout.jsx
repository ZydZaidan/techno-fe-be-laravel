import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarUser from '../components/dashboard/SidebarUser';
import HeaderUser from '../components/dashboard/HeaderUser';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-poppins">
      <SidebarUser
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <HeaderUser
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 px-4 sm:px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;