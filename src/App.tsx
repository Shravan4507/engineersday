import './App.css'
import { useState } from 'react'
import { Orb, Navbar, HomeSection, CountdownSection, EventsSection, PrizesSection, FooterSection, ErrorBoundary, RegistrationModal, Toast } from './components'
import FirebaseTest from './components/FirebaseTest'
import { ThemeProvider } from './contexts/ThemeContext'
import { useTheme } from './hooks/useTheme'

function AppContent() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedEvent, setPreselectedEvent] = useState<string | undefined>(undefined);
  const [showFirebaseTest, setShowFirebaseTest] = useState(false);
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
        
        {/* Firebase Test Button - Only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => setShowFirebaseTest(true)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            🔥 Test Firebase
          </button>
        )}
        
        {showFirebaseTest && (
          <FirebaseTest onClose={() => setShowFirebaseTest(false)} />
        )}
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
