import { Icon } from '@iconify/react';
import { Dropdown } from '../Dropdown/Dropdown';
import './IconButton.css';
import '../Common/Common.css';

export interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
  badge?: string | number;
  active?: boolean;
  children?: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    icon,
    onClick,
    ariaLabel,
    className = '',
    badge,
    active = false,
    children
  } = props;

  if (children) {
    return (
      <Dropdown
        icon={icon}
        className={`utility-button ${active ? 'active' : ''} ${className}`}
        id={ariaLabel || icon} // Use ariaLabel as ID if available
      >
        {children}
      </Dropdown>
    );
  }

  return (
    <button
      className={`utility-button ${active ? 'active' : ''} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      <Icon icon={icon} className="icon-button-icon" />

      {badge && (
        <span className="icon-button-badge">
          {badge}
        </span>
      )}
    </button>
  );
};