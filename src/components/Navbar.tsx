import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logoGif from '../assets/logo.webp';
import ThemeToggle from './ThemeToggle';

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

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setActiveItem(label);
    
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
              className={`menu-item ${activeItem === item.label ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href, item.label)}
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
