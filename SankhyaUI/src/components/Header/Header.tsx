import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './Header.css';
import '../Common/Common.css';
import { BaseProps } from '../Common/BaseComponent.interfaces';

export interface HeaderProps extends BaseProps {
  sticky?: boolean;
  logoHref?: string;
  logoTarget?: string;
  logoClassName?: string;
  imageSrc?: string;
  altText?: string;
  menuBar?: React.ReactNode[];
  utilityButtons?: React.ReactNode[];
}

export const Header: React.FC<HeaderProps> = (props) => {
  const {
    menuBar,
    utilityButtons,
    sticky = false,
    className = '',
    logoHref,
    imageSrc,
    logoTarget = '_self',
    logoClassName = '',
    altText = 'Logo',
    inverted = false,
  } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`header ${sticky ? 'header-sticky' : ''} ${inverted ? 'theme-inverted' : ''} ${className}`}>
      {/* Logo */}
      <div className="header-logo-wrapper">
        {imageSrc && (
          <a
            href={logoHref || '#'}
            target={logoTarget}
            className={`${logoClassName} hover-lift`}
            aria-label="Home"
          >
            <img
              src={imageSrc}
              alt={altText}
            />
          </a>
        )}
      </div>

      {/* Nav Toggle (Mobile only via CSS) */}
      <button
        className="header-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation"
      >
        <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} />
      </button>

      {/* Navigation Layer (Single Render) */}
      <div 
        className={`header-nav-container ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Main Navigation */}
        <div className="header-nav">
          {menuBar}
        </div>

        {/* Utility Buttons */}
        {utilityButtons && utilityButtons.length > 0 && (
          <div className="header-utility">
            {utilityButtons}
          </div>
        )}
      </div>
    </header>
  );
};
