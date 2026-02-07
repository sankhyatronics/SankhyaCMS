import React from 'react';
import { Footer, DropdownProvider, DynamicRenderer, useUser, CookieConsent } from '@sankhyatronics/sankhya-ui';
import { Outlet } from 'react-router';
import { fetchLocalContent } from '@sankhyatronics/sankhya-ui';

export const Shell: React.FC = () => {
    const [headerConfig, setHeaderConfig] = React.useState<any>(null);
    const [footerProps, setFooterProps] = React.useState<any>(null);
    const [cookieConsentProps, setCookieConsentProps] = React.useState<any>(null);
    const { language, setLanguage, toggleTheme } = useUser();

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



    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const header = await fetchLocalContent('header.json', { lang: language });
                const footer = await fetchLocalContent('footer.json', { lang: language });
                const cookieConsent = await fetchLocalContent('cookie-consent.json', { lang: language });

                // Unwrap PageContent (PageSection[]) to get component config/props
                const headerConfig = Array.isArray(header) ? header.map((section: any) => section.data) : [];

                // For Footer and CookieConsent, we expect a single section/component
                const footerSection = Array.isArray(footer) ? footer[0] : null;
                const footerProps = footerSection?.data?.data || null;

                const cookieConsentSection = Array.isArray(cookieConsent) ? cookieConsent[0] : null;
                const cookieConsentProps = cookieConsentSection?.data?.data || null;

                // Clone to ensure new references (though we just extracted them, so they are new refs from the fetch result)
                const updatedHeaderConfig = JSON.parse(JSON.stringify(headerConfig));
                const updatedFooterProps = footerProps ? JSON.parse(JSON.stringify(footerProps)) : null;
                const updatedCookieConsentProps = cookieConsentProps ? JSON.parse(JSON.stringify(cookieConsentProps)) : null;

                // Inject current language as defaultValue and value for the language selector
                const findAndSetLanguage = (config: any) => {
                    if (!config || typeof config !== 'object') return;

                    if (Array.isArray(config)) {
                        config.forEach(child => findAndSetLanguage(child));
                        return;
                    }

                    // Check if this component is the language selector
                    if (config.id === 'select-language' || config.data?.id === 'select-lang' || config.type === 'Select') {
                        // Double check if it's the language selection one by checking options if possible
                        // const isLangSelect = config.data?.options?.some((opt: any) => opt.value === 'en' || opt.value === 'dk');
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

                // Apply language injection to Header config
                if (updatedHeaderConfig) {
                    updatedHeaderConfig.forEach((config: any) => findAndSetLanguage(config));
                }

                setHeaderConfig(updatedHeaderConfig);
                setFooterProps(updatedFooterProps);
                setCookieConsentProps(updatedCookieConsentProps);
            } catch (e) {
                console.error("Failed to load shell data", e);
            }
        };
        fetchData();
    }, [language]);

    return (
        <div className="flex flex-col min-h-screen bg-primary">
            <DropdownProvider>
                <DynamicRenderer config={headerConfig} handlers={handlers} />
            </DropdownProvider>
            <main className="flex-1 w-full">
                <Outlet />
            </main>

            {footerProps && (
                <Footer
                    {...footerProps}
                />
            )}
            {cookieConsentProps && (
                <CookieConsent
                    {...cookieConsentProps}
                />
            )}
        </div>
    );
};
