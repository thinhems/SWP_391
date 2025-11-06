import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { ModelsProvider } from '../../contexts/ModelsContext';
import { StationsProvider } from '../../contexts/StationsContext';

export default function HomeTemplate() {
  return (
    <ModelsProvider>
      <StationsProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </StationsProvider>
    </ModelsProvider>
  );
}