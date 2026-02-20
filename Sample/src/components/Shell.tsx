import React from 'react';
import { DropdownProvider, DynamicRenderer, useUser } from '@sankhyatronics/sankhya-ui';
import { Outlet } from 'react-router';
import { usePageData } from '../hooks/usePageData';

export const Shell: React.FC = () => {
    const { language, setLanguage, toggleTheme } = useUser();

    // Use hooks to fetch data
    const { data: headerData } = usePageData('header.json');
    const { data: footerData } = usePageData('footer.json');
    const { data: cookieConsentData } = usePageData('cookie-consent.json');

    const handlers = {
        onThemeChangeClick: () => {
            toggleTheme();
        },
        onLanguageChangeToEn: () => {
            setLanguage('en');
        },
        onLanguageChangeToDk: () => {
            setLanguage('dk');
        }
    };

    // Process Header Data
    const headerConfig = React.useMemo(() => {
        if (!headerData) return null;

        // Unwrap PageContent (PageSection[]) to get component config
        const configList = Array.isArray(headerData) ? headerData.map((section: any) => section.data) : [];

        // Clone to ensure new references
        const updatedConfig = JSON.parse(JSON.stringify(configList));

        // Inject current language as defaultValue and value for the language selector
        const findAndSetLanguage = (config: any) => {
            if (!config || typeof config !== 'object') return;

            if (Array.isArray(config)) {
                config.forEach(child => findAndSetLanguage(child));
                return;
            }

            // Check if this component is the language selector
            // We check id, data.id, or type to identify likely candidates
            if (config.id === 'select-language' || config.data?.id === 'select-lang' || config.type === 'Select') {
                if (config.id === 'select-language' || config.data?.id === 'select-lang') {
                    config.value = language;
                    config.defaultValue = language;
                    if (config.data) {
                        config.data.value = language;
                        config.data.defaultValue = language;
                    }
                }
            }

            // Recurse into children and items
            if (config.children) findAndSetLanguage(config.children);
            if (config.data?.children) findAndSetLanguage(config.data.children);
            if (config.data?.items) findAndSetLanguage(config.data.items);
        };

        if (updatedConfig) {
            updatedConfig.forEach((config: any) => findAndSetLanguage(config));
        }

        return updatedConfig;
    }, [headerData, language]);

    // Process Footer Data
    const footerConfig = React.useMemo(() => {
        if (!footerData) return null;
        const footerSection = Array.isArray(footerData) ? footerData[0] : null;
        return footerSection?.data || null;
    }, [footerData]);

    // Process Cookie Consent Data
    const cookieConsentConfig = React.useMemo(() => {
        if (!cookieConsentData) return null;
        const cookieSection = Array.isArray(cookieConsentData) ? cookieConsentData[0] : null;
        return cookieSection?.data || null;
    }, [cookieConsentData]);


    return (
        <div className="flex flex-col min-h-screen bg-primary">
            <DropdownProvider>
                <DynamicRenderer config={headerConfig} handlers={handlers} />
            </DropdownProvider>
            <main className="flex-1 w-full">
                <Outlet />
            </main>

            {footerConfig && (
                <DynamicRenderer config={footerConfig} />
            )}
            {cookieConsentConfig && (
                <DynamicRenderer config={cookieConsentConfig} />
            )}
        </div>
    );
};
