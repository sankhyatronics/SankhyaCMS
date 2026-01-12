import { default as React } from 'react';
export interface StatItem {
    value: string;
    label: string;
    description?: string;
}
export interface StatsProps {
    stats: StatItem[];
    className?: string;
}
export declare const Stats: React.FC<StatsProps>;
