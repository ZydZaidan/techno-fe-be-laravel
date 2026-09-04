import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarReviewer from '../components/dashboard/SidebarReviewer';
import HeaderReviewer from '../components/dashboard/HeaderReviewer';

const ReviewerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-poppins">
      <SidebarReviewer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <HeaderReviewer
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 px-4 sm:px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ReviewerLayout;