import React from 'react';
import './Stats.css';

export interface StatItem {
    value: string;
    label: string;
    description?: string;
}

import { BaseProps } from '../Common/BaseComponent.interfaces';

export interface StatsProps extends BaseProps {
    items: StatItem[];
}

export const Stats: React.FC<StatsProps> = ({ items, className = '' }) => {
    return (
        <section className={`stats-section ${className}`}>
            <div className="stats-container">
                <div className="stats-grid">
                    {items.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                            {stat.description && (
                                <span className="stat-description">{stat.description}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
