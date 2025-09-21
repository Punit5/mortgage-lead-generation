import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExitIntentPopup from './components/ExitIntentPopup';
import { useExitIntent } from './hooks/useExitIntent';
import Homepage from './pages/Homepage';
import PreApprovalPage from './pages/PreApprovalPage';
import RefinancePage from './pages/RefinancePage';
import FirstTimeBuyerPage from './pages/FirstTimeBuyerPage';
import ThankYouPage from './pages/ThankYouPage';

function AppContent() {
  const { showExitIntent, closeExitIntent } = useExitIntent();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pre-approval" element={<PreApprovalPage />} />
          <Route path="/refinance" element={<RefinancePage />} />
          <Route path="/first-time-buyer" element={<FirstTimeBuyerPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </main>
      <Footer />
      <ExitIntentPopup isVisible={showExitIntent} onClose={closeExitIntent} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
