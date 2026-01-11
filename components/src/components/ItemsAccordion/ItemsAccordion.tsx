import React, { useState, useRef } from 'react';
import './ItemsAccordion.css';
import { Icon } from '@iconify/react';

export interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

export interface ItemsAccordionProps {
    title?: string;
    subtitle?: string;
    items: AccordionItem[];
    className?: string;
    allowMultiple?: boolean;
}

export const ItemsAccordion: React.FC<ItemsAccordionProps> = ({
    title,
    subtitle,
    items,
    className = '',
    allowMultiple = false,
}) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const toggleItem = (id: string) => {
        setOpenItems((prev) => {
            const newSet = new Set(allowMultiple ? prev : []);
            if (prev.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <section className={`accordion-section ${className}`}>
            <div className="accordion-container">
                {(title || subtitle) && (
                    <div className="accordion-header-section">
                        {title && <h2 className="accordion-title">{title}</h2>}
                        {subtitle && <p className="accordion-subtitle">{subtitle}</p>}
                    </div>
                )}

                <div className="accordion-list">
                    {items.map((item) => {
                        const isOpen = openItems.has(item.id);
                        return (
                            <div key={item.id} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                                <button
                                    className="accordion-trigger"
                                    onClick={() => toggleItem(item.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`content-${item.id}`}
                                >
                                    <span className="accordion-item-title">{item.title}</span>
                                    <Icon
                                        icon="mdi:chevron-down"
                                        width="24"
                                        height="24"
                                        className={`accordion-icon ${isOpen ? 'rotate' : ''}`}
                                    />
                                </button>
                                <div
                                    id={`content-${item.id}`}
                                    className="accordion-content"
                                    style={{
                                        height: isOpen
                                            ? contentRefs.current[item.id]?.scrollHeight
                                            : 0,
                                    }}
                                >
                                    <div
                                        ref={(el) => { contentRefs.current[item.id] = el; }}
                                        className="accordion-content-inner"
                                    >
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

