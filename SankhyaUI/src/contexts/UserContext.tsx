import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'dk' | 'de';
export type CookieConsentStatus = 'accepted' | 'refused' | null;

interface UserContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    theme: string;
    setTheme: (theme: string) => void;
    toggleTheme: () => void;
    cookieConsent: CookieConsentStatus;
    setCookieConsent: (status: CookieConsentStatus) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export interface UserProviderProps {
    children: React.ReactNode;
    defaultLanguage?: Language;
    defaultTheme?: string;
    storageKeyPrefix?: string;
}

export const UserProvider: React.FC<UserProviderProps> = ({
    children,
    defaultLanguage = 'en',
    defaultTheme = 'light',
    storageKeyPrefix = 'app-'
}) => {
    // Language State
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window === 'undefined') return defaultLanguage;
        const saved = localStorage.getItem(`${storageKeyPrefix}language`);
        return (saved as Language) || defaultLanguage;
    });

    // Theme State
    const [theme, setThemeState] = useState<string>(() => {
        if (typeof window === 'undefined') return defaultTheme;
        const saved = localStorage.getItem(`${storageKeyPrefix}theme`);
        return (saved as string) || defaultTheme;
    });

    // Cookie Consent State
    const [cookieConsent, setCookieConsentState] = useState<CookieConsentStatus>(() => {
        if (typeof window === 'undefined') return null;
        const saved = localStorage.getItem('sankhya_ui_cookie_consent');
        return (saved as CookieConsentStatus) || null;
    });

    // Persist Language
    useEffect(() => {
        localStorage.setItem(`${storageKeyPrefix}language`, language);
    }, [language, storageKeyPrefix]);

    // Persist and Apply Theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(`${storageKeyPrefix}theme`, theme);
    }, [theme, storageKeyPrefix]);

    // Persist Cookie Consent
    useEffect(() => {
        if (cookieConsent) {
            localStorage.setItem('sankhya_ui_cookie_consent', cookieConsent);
        }
    }, [cookieConsent]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const setTheme = (newTheme: string) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        // Updated theme list: 4 light-based, 4 dark-based
        const themes = [
            'light', 'dark', 'lavender', 'slate', 'fire', 'jungle', 'ocean', 'desert'
        ];
        const currentThemeIndex = themes.indexOf(theme || 'light');
        const newTheme = themes[(currentThemeIndex + 1) % themes.length];
        setThemeState(newTheme);
    };

    const setCookieConsent = (status: CookieConsentStatus) => {
        setCookieConsentState(status);
    };

    return (
        <UserContext.Provider value={{
            language,
            setLanguage,
            theme,
            setTheme,
            toggleTheme,
            cookieConsent,
            setCookieConsent
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
