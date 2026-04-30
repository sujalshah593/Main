import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import MobileNav from '../components/MobileNav.jsx';

export default function MainLayout() {
  return (
    <>
      <div className="global-bg-dots" />
      <div className="global-blob blob-a" />
      <div className="global-blob blob-b" />
      
      <div className="flex min-h-screen flex-col bg-transparent md:flex-row relative z-10 w-full overflow-hidden">
        <MobileNav />
        <Sidebar />
        <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
