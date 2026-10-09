import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router';
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

  const isLogoInternal = logoHref && logoHref.startsWith('/') && logoTarget === '_self';

  const LogoContent = (
    <img
      src={imageSrc}
      alt={altText}
    />
  );

  return (
    <header className={`header ${sticky ? 'header-sticky' : ''} ${inverted ? 'theme-inverted' : ''} ${className}`}>
      {/* Logo */}
      <div className="header-logo-wrapper">
        {imageSrc && (
          isLogoInternal ? (
            <Link
              to={logoHref}
              className={`${logoClassName} hover-lift`}
              aria-label="Home"
            >
              {LogoContent}
            </Link>
          ) : (
            <a
              href={logoHref || '#'}
              target={logoTarget}
              className={`${logoClassName} hover-lift`}
              aria-label="Home"
            >
              {LogoContent}
            </a>
          )
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
