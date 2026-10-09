import React from 'react';
import { useUser } from '../../contexts/UserContext';
import './CookieConsent.css';
import '../Common/Common.css';

export interface CookieConsentProps {
    message?: React.ReactNode;
    acceptButtonText?: string;
    refuseButtonText?: string;
    onAccept?: () => void;
    onRefuse?: () => void;
    privacyPolicyLink?: string;
    privacyPolicyText?: string;
    storageKey?: string;
    className?: string;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
    message,
    acceptButtonText = 'Accept',
    refuseButtonText = 'Refuse',
    onAccept,
    onRefuse,
    privacyPolicyLink,
    privacyPolicyText = 'Privacy Policy',
    className = '',
}) => {
    const { cookieConsent, setCookieConsent } = useUser();

    // Determine visibility based on whether a choice has been made in context
    const isVisible = cookieConsent === null;

    const handleAccept = () => {
        setCookieConsent('accepted');
        if (onAccept) onAccept();
    };

    const handleRefuse = () => {
        setCookieConsent('refused');
        if (onRefuse) onRefuse();
    };

    if (!isVisible) return null;

    return (
        <div className={`cookie-consent-container ${className}`}>
            <div className="cookie-consent-content">
                <p className="cookie-consent-message">
                    {message || (
                        <>
                            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                            {privacyPolicyLink && (
                                <a href={privacyPolicyLink} className="cookie-consent-link" target="_blank" rel="noopener noreferrer">
                                    {privacyPolicyText}
                                </a>
                            )}
                        </>
                    )}
                </p>
            </div>
            <div className="cookie-consent-actions">
                <button onClick={handleRefuse} className="cookie-consent-btn cookie-consent-btn-refuse">
                    {refuseButtonText}
                </button>
                <button onClick={handleAccept} className="cookie-consent-btn cookie-consent-btn-accept">
                    {acceptButtonText}
                </button>
            </div>
        </div>
    );
};
