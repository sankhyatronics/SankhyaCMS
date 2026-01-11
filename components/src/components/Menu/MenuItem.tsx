import { Icon } from '@iconify/react';
import { motion } from "motion/react";
import './MenuItem.css';
import '../Common/Common.css';

export interface MenuItemProps {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string | number;
  isActive?: boolean;
  className?: string;
  showDescription?: boolean;
  onClick?: () => void;
  target?: string;
  compact?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    title,
    href,
    description,
    icon,
    badge,
    isActive = false,
    className = '',
    showDescription = true,
    onClick,
    target = '_self',
    compact = false
  } = props;

  const menuItemClasses = [
    'menu-item',
    isActive ? 'active' : '',
    compact ? 'compact' : '',
    !description || !showDescription ? 'no-description' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.a
      href={href}
      target={target}
      onClick={onClick}
      className={menuItemClasses}
      whileHover={{ scale: 1.01, x: 4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.1 }}
    >
      {/* Icon */}
      {icon && (
        <motion.div
          className="menu-item-icon"
          whileHover={{ rotate: 5 }}
        >
          <Icon icon={icon} />
        </motion.div>
      )}

      {/* Content Container */}
      <div className="menu-item-content">
        {/* Title and Badge Row */}
        <div className="menu-item-header">
          <span className="menu-item-title">
            {title}
          </span>

          {/* Badge */}
          {badge && (
            <motion.span
              className="menu-item-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {badge}
            </motion.span>
          )}
        </div>

        {/* Description */}
        {description && showDescription && (
          <motion.p
            className="menu-item-description"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.a>
  );
};