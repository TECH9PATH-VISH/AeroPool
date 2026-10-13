import React from 'react';
import { PoolProvider, usePool } from './context/PoolContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { BookRidePage } from './pages/BookRidePage';
import { MatchesPage } from './pages/MatchesPage';
import { DashboardPage } from './pages/DashboardPage';
import { FareEstimatorPage } from './pages/FareEstimatorPage';
import { TerminalGuidePage } from './pages/TerminalGuidePage';

const AppContent = () => {
  const { activeTab } = usePool();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'book':
        return <BookRidePage />;
      case 'matches':
        return <MatchesPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'estimator':
        return <FareEstimatorPage />;
      case 'terminal-map':
        return <TerminalGuidePage />;
      default:
        return <BookRidePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderActivePage()}
      </main>

      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <PoolProvider>
      <AppContent />
    </PoolProvider>
  );
}
