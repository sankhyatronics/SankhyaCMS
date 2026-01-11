import React from 'react';
import './Stats.css';

export interface StatItem {
    value: string;
    label: string;
    description?: string;
}

export interface StatsProps {
    stats: StatItem[];
    className?: string;
}

export const Stats: React.FC<StatsProps> = ({ stats, className = '' }) => {
    return (
        <section className={`stats-section ${className}`}>
            <div className="stats-container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
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
