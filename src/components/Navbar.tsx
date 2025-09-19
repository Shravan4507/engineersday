import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logoGif from '../assets/logo.webp';
import ThemeToggle from './ThemeToggle';
import { isRegistrationOpen } from '../config/eventConfig';

interface NavbarProps {
  brandName?: string;
  menuItems?: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
  onRegisterClick?: () => void;
}

export default function Navbar({ 
  menuItems = [
    { label: "Home", href: "#home", active: true },
    { label: "Events", href: "#events" },
    { label: "Prizes", href: "#prizes" },
    { label: "Register", href: "#register" }
  ],
  onRegisterClick
}: NavbarProps) {
  const [activeItem, setActiveItem] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegistrationOpenState, setIsRegistrationOpenState] = useState(true);

  useEffect(() => {
    const updateRegistrationStatus = () => {
      setIsRegistrationOpenState(isRegistrationOpen());
    };

    // Update immediately
    updateRegistrationStatus();

    // Update every minute
    const interval = setInterval(updateRegistrationStatus, 60000);

    const handleScroll = () => {
      const sections = ['home', 'events', 'prizes', 'register'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          const sectionName = sections[i].charAt(0).toUpperCase() + sections[i].slice(1);
          if (sectionName === 'Home') setActiveItem('Home');
          else if (sectionName === 'Events') setActiveItem('Events');
          else if (sectionName === 'Prizes') setActiveItem('Prizes');
          else if (sectionName === 'Register') setActiveItem('Register');
          break;
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    
    // If Register is clicked and registration is closed, don't do anything
    if (label === 'Register' && !isRegistrationOpenState) {
      return;
    }
    
    setActiveItem(label);
    
    // Close mobile menu when item is clicked
    setIsMobileMenuOpen(false);
    
    if (label === 'Register') {
      onRegisterClick?.();
      return;
    }
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="#" className="brand-link" onClick={handleLogoClick}>
            <img src={logoGif} alt="Logo" className="logo-gif" />
          </a>
        </div>
        
        <div className="navbar-center">
          <h1 className="navbar-title">Engineers' Day</h1>
        </div>
        
        <div className="navbar-menu">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`menu-item ${activeItem === item.label ? 'active' : ''} ${item.label === 'Register' && !isRegistrationOpenState ? 'disabled' : ''}`}
              onClick={(e) => handleNavClick(e, item.href, item.label)}
              style={item.label === 'Register' && !isRegistrationOpenState ? { 
                opacity: 0.6, 
                cursor: 'not-allowed'
              } : {}}
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`mobile-menu-item ${activeItem === item.label ? 'active' : ''} ${item.label === 'Register' && !isRegistrationOpenState ? 'disabled' : ''}`}
              onClick={(e) => handleNavClick(e, item.href, item.label)}
              style={item.label === 'Register' && !isRegistrationOpenState ? { 
                opacity: 0.6, 
                cursor: 'not-allowed'
              } : {}}
            >
              {item.label}
            </a>
          ))}
          <div className="mobile-theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
