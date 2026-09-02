import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../components/dashboard/SidebarAdmin';
import HeaderAdmin from '../components/dashboard/HeaderAdmin';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-poppins">
      {/* Sidebar Admin (Dengan State Open/Close) */}
      <SidebarAdmin
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Header Admin (Dengan Trigger Toggle) */}
        <HeaderAdmin
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 px-4 sm:px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;