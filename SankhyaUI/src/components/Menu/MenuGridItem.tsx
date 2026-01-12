import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import { motion } from "motion/react";
import './MenuGridItem.css';
import '../Common/Common.css';

export interface MenuGridItemProps {
  title: string;
  description?: string;
  href: string;
  icon?: string;
  badge?: string;
  compact?: boolean;
  showDescription?: boolean;
  className?: string;
}

export const MenuGridItem: React.FC<MenuGridItemProps> = (props) => {
  const {
    title,
    description,
    href,
    icon,
    badge,
    compact = false,
    showDescription = true,
    className = '',
    // children
  } = props;

  const itemClasses = `menu-grid-item ${compact ? 'compact' : 'regular'} ${className}`;

  return (
    <motion.div
      className={`${itemClasses} hover-lift`} /* Added hover-lift from Common.css */
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {href.startsWith('http') ? (
        <a href={href} className="menu-grid-link" target="_blank" rel="noopener noreferrer">
          {/* Badge */}
          {badge && (
            <motion.span
              className="menu-grid-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {badge}
            </motion.span>
          )}

          {/* Icon and Title in one line */}
          <div className="menu-grid-header">
            {icon && (
              <motion.div
                className="menu-grid-icon"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Icon icon={icon} />
              </motion.div>
            )}

            <span className="menu-grid-title text-truncate">
              {title}
            </span>
          </div>

          {/* Description below */}
          {description && showDescription && (
            <span className="menu-grid-description">
              {description}
            </span>
          )}
        </a>
      ) : (
        <Link to={href} className="menu-grid-link">
          {/* Badge */}
          {badge && (
            <motion.span
              className="menu-grid-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {badge}
            </motion.span>
          )}

          {/* Icon and Title in one line */}
          <div className="menu-grid-header">
            {icon && (
              <motion.div
                className="menu-grid-icon"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Icon icon={icon} />
              </motion.div>
            )}

            <span className="menu-grid-title text-truncate">
              {title}
            </span>
          </div>

          {/* Description below */}
          {description && showDescription && (
            <span className="menu-grid-description">
              {description}
            </span>
          )}
        </Link>
      )}
    </motion.div>
  );
};

