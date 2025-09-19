import './App.css'
import { useState } from 'react'
import { Orb, Navbar, HomeSection, CountdownSection, EventsSection, PrizesSection, FooterSection, ErrorBoundary, RegistrationModal, Toast } from './components'
import { ThemeProvider } from './contexts/ThemeContext'
import { useTheme } from './hooks/useTheme'

function AppContent() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedEvent, setPreselectedEvent] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const openModal = (event?: string) => {
    setPreselectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPreselectedEvent(undefined);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="app">
      <ErrorBoundary>
        {theme === 'dark' && (
          <Orb
            hoverIntensity={0.1}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        )}
        <Navbar onRegisterClick={() => openModal()} />
        <HomeSection onRegisterClick={() => openModal()} />
        <CountdownSection />
        <EventsSection onRegisterClick={openModal} />
        <PrizesSection />
        <FooterSection onRegisterClick={() => openModal()} />
        <RegistrationModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          preselectedEvent={preselectedEvent}
          onShowToast={showToast}
        />
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </ErrorBoundary>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
