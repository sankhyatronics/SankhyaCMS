import React from 'react';
import { Link } from 'react-router';
import './Footer.css';
import { Icon } from '@iconify/react';
import { BaseProps } from '../Common/BaseComponent.interfaces';

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterProps extends BaseProps {
    imageSrc?: string;
    companyName?: string;
    description?: string;
    columns: FooterColumn[];
    socialLinks?: { icon: string; href: string }[];
    copyright?: string;
    inverted?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
    imageSrc,
    companyName,
    description,
    columns,
    socialLinks,
    copyright,
    inverted = false,
    className = '',
}) => {
    const footerClasses = `footer ${inverted ? 'theme-inverted' : ''} ${className}`.trim();

    const renderLogo = () => {
        if (!imageSrc && !companyName) return null;

        return (
            <div className="footer-logo-container">
                {imageSrc && (
                    <img src={imageSrc} alt={companyName || 'Logo'} className="footer-logo-img" />
                )}
                {companyName && <span className="footer-company-name">{companyName}</span>}
            </div>
        );
    };

    return (
        <footer className={footerClasses}>
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">{renderLogo()}</div>
                        {description && <p className="footer-description">{description}</p>}
                        {socialLinks && (
                            <div className="footer-social">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="footer-social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon icon={social.icon} width="24" height="24" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {columns.map((col, index) => (
                        <div key={index} className="footer-column">
                            <h4 className="footer-column-title">{col.title}</h4>
                            <div className="footer-links">
                                {col.links.map((link, linkIndex) => (
                                    link.href.startsWith('http') ? (
                                        <a key={linkIndex} href={link.href} className="footer-link" target="_blank" rel="noopener noreferrer">
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link key={linkIndex} to={link.href} className="footer-link">
                                            {link.label}
                                        </Link>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        {copyright || `© ${new Date().getFullYear()} Company Name. All rights reserved.`}
                    </div>
                    <div className="footer-legal">
                        {/* Optional legal links could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

