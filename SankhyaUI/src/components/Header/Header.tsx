import React from 'react';
import './Header.css';
import '../Common/Common.css';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu';
import { useTouchDevice } from '../../hooks/useBreakpointTouch';
import { BaseProps } from '../Common/BaseComponent.interfaces';

export interface HeaderProps extends BaseProps {
  sticky?: boolean;
  mobileBreakpoint?: number;
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
    mobileBreakpoint = 768,
    logoHref,
    imageSrc,
    logoTarget = '_self',
    logoClassName = '',
    altText = 'Logo',
    inverted = false,
  } = props;

  const isMobile = useTouchDevice({ breakpoint: mobileBreakpoint });

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
              className="header-logo-img"
            />
          </a>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className={`header-right ${isMobile ? 'hidden' : 'flex'}`} >
        {/* Main Navigation (left side) */}
        <div className="header-nav">
          {menuBar}
        </div>
        {/* Utility Buttons (right side) */}
        {utilityButtons && utilityButtons.length > 0 && (
          <div className="header-utility">
            {utilityButtons}
          </div>
        )}
      </div>

      {/* Mobile: Hamburger Menu */}
      {isMobile && (
        <div className="header-mobile-wrapper md:hidden">
          {/* Utility buttons in mobile header (optional) */}
          {utilityButtons && utilityButtons.length > 0 && (
            <div className="header-mobile-utility">
              {utilityButtons}
            </div>
          )}

          {/* Hamburger Menu */}
          <div className="header-hamburger">
            <HamburgerMenu
              position="right"
              label="Navigation menu"
            >
              <div className="header-mobile-menu-content">
                {/* Main navigation in mobile menu */}
                {menuBar}

                {/* Utility buttons in mobile menu (optional) */}
                {utilityButtons && utilityButtons.length > 0 && (
                  <>
                    <div className="header-mobile-settings">
                      <h3 className="header-mobile-settings-title">
                        Settings
                      </h3>
                      {utilityButtons}
                    </div>
                  </>
                )}
              </div>
            </HamburgerMenu>
          </div>
        </div>
      )}
    </header>
  );
};
