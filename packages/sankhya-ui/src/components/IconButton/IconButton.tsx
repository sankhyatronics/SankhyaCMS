import { Icon } from '@iconify/react';
import '../Select/Select.css';

export interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    icon,
    onClick,
    ariaLabel,
    className = '',
  } = props;

  return (
    <button
      className={`select-option ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      <Icon icon={icon} className="icon-button-icon" />
    </button>
  );
};