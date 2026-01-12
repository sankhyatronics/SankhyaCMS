import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from 'react';
import './HamburgerMenu.css';
import '../Common/Common.css';

export interface HamburgerMenuProps {
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
  position?: 'left' | 'right';
  label?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  children,
  className = '',
  position = 'right',
  label = 'Toggle menu'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleContentClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    // Check if the clicked element is an anchor tag or contained within one
    if (target.closest('a')) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`hamburger-menu ${className}`} ref={menuRef}>
      <button
        className="hamburger-toggle"
        onClick={toggleMenu}
        aria-label={label}
        aria-expanded={isOpen}
      >
        <Icon
          icon={isOpen ? 'mdi:close' : 'mdi:menu'}
          width="24"
          height="24"
        />
      </button>

      {/* Overlay - only covers content area, button stays on top */}
      {isOpen && (
        <div
          className="hamburger-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu content */}
      <div
        className={`hamburger-content-container ${className} ${position} ${isOpen ? 'open' : ''}`}
        onClick={handleContentClick}
      >
        <div className="hamburger-content">
          {children}
        </div>
      </div>
    </div>
  );
};
