import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function HomeTemplate() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}