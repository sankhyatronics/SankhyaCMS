import './MenuGrid.css';
import '../Common/Common.css';

export interface MenuGridProps {
  children: React.ReactNode;
  columns: number;
  className?: string;
  gridClassName?: string;
}

export const MenuGrid: React.FC<MenuGridProps> = (props) => {
  const {
    children,
    columns = 3,
    className = '',
    gridClassName = ''
  } = props;

  const gridClasses = `menu-grid columns-${columns} ${gridClassName}`;

  return (
    <div className={`menu-grid-container ${className}`}>
      <div className={gridClasses}>
        {children}
      </div>
    </div>
  );
};

