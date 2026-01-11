import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useTouchDevice } from '../../hooks/useBreakpointTouch';
import { useDropdownContext } from '../../contexts/DropdownContext';
import './Dropdown.css';
import '../Common/Common.css';

export interface DropdownProps {
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
  itemGroupClassName?: string;
  itemClassName?: string;
  title?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  iconSize?: string;
  iconColor?: string;
  href?: string;
  id?: string;
  target?: string;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    title,
    icon,
    iconPosition = 'left',
    iconSize = '1.2rem',
    iconColor = 'currentColor',
    className = '',
    itemGroupClassName = '',
    children,
    href,
    id = title || icon || 'dropdown',
    target = '_self'
  } = props;

  const isTouchDevice = useTouchDevice({ breakpoint: 768 });
  const { activeDropdown, setActiveDropdown } = useDropdownContext();
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = activeDropdown === id;
  const shouldShow = isTouchDevice ? isActive : (isActive || isHovered);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsHovered(false);
        if (activeDropdown === id) {
          setActiveDropdown(null);
        }
      }
    };

    if (shouldShow && !isTouchDevice) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shouldShow, isTouchDevice, activeDropdown, id, setActiveDropdown]);

  const handleTitleClick = (e: React.MouseEvent) => {
    if (isTouchDevice) {
      e.preventDefault();
      setActiveDropdown(isActive ? null : id);
    }

    if (href && isTouchDevice && !isActive) {
      e.preventDefault();
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
      setActiveDropdown(id);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setTimeout(() => {
        const isOverDropdown = dropdownRef.current?.matches(':hover');
        const isOverMenu = menuRef.current?.matches(':hover');

        if (!isOverDropdown && !isOverMenu) {
          setIsHovered(false);
          setActiveDropdown(null);
        }
      }, 100);
    }
  };

  const handleDropdownMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
      setActiveDropdown(id);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
      setActiveDropdown(null);
    }
  };

  return (
    <div
      ref={menuRef}
      className="menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title/Button */}
      {(title || icon) && (
        <>
          {href ? (
            <a
              href={href}
              onClick={handleTitleClick}
              className={`menu-title ${className} ${isActive ? 'active' : ''}`}
              target={target}
              aria-haspopup={!!children}
              aria-expanded={shouldShow}
            >
              {icon && iconPosition === 'left' && (
                <Icon
                  icon={icon}
                  style={{ width: iconSize, height: iconSize, color: iconColor }}
                  className="icon-left"
                />
              )}
              {title && <span>{title}</span>}
              {icon && iconPosition === 'right' && (
                <Icon
                  icon={icon}
                  style={{ width: iconSize, height: iconSize, color: iconColor }}
                  className="icon-right"
                />
              )}
              {children && <span className='arrow'>{shouldShow ? '▲' : '▼'}</span>}
            </a>
          ) : (
            <button
              onClick={handleTitleClick}
              className={`menu-title ${className} ${isActive ? 'active' : ''}`}
              type="button"
              aria-haspopup="true"
              aria-expanded={shouldShow}
            >
              {icon && iconPosition === 'left' && (
                <Icon
                  icon={icon}
                  style={{ width: iconSize, height: iconSize, color: iconColor }}
                  className="icon-left"
                />
              )}
              {title && <span>{title}</span>}
              {icon && iconPosition === 'right' && (
                <Icon
                  icon={icon}
                  style={{ width: iconSize, height: iconSize, color: iconColor }}
                  className="icon-right"
                />
              )}
              {children && <span className='arrow'>{shouldShow ? '▲' : '▼'}</span>}
            </button>
          )}
        </>
      )}

      {/* Render children */}
      <div
        ref={dropdownRef}
        className={`menu-dropdown ${itemGroupClassName} ${shouldShow ? 'show' : ''}`}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};