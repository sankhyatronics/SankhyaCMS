import type { Meta, StoryObj } from '@storybook/react-vite';
import { CookieConsent, UserProvider, useUser, DynamicRenderer, registerComponent, useCookieConsentConfig } from '@sankhyatronics/sankhya-ui';
import { mockApi } from './data/mockApiService';
import React from 'react';

registerComponent('CookieConsent', CookieConsent);

const meta: Meta<typeof DynamicRenderer> = {
    title: 'Components/CookieConsent',
    component: DynamicRenderer,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <UserProvider>
                <ResetConsentWrapper>
                    <Story />
                </ResetConsentWrapper>
            </UserProvider>
        ),
    ],
};

const ResetConsentWrapper = ({ children }: { children: React.ReactNode }) => {
    const { setCookieConsent, cookieConsent } = useUser();

    return (
        <div>
            {children}
            {cookieConsent && (
                <div style={{ padding: '20px', borderTop: '1px solid #ccc', marginTop: '50px' }}>
                    <p>Current Status: <strong>{cookieConsent}</strong></p>
                    <button
                        onClick={() => {
                            setCookieConsent(null);
                            localStorage.removeItem('sankhya_ui_cookie_consent');
                        }}
                        style={{
                            padding: '8px 16px',
                            background: '#f0f0f0',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Reset Consent
                    </button>
                    <p style={{ fontSize: '0.8em', color: '#666', marginTop: '10px' }}>
                        (This button is for Storybook visualization only)
                    </p>
                </div>
            )}
        </div>
    );
};

export default meta;
type Story = StoryObj<typeof meta>;

const StoryData = ({ storyName = 'Default', dataTitle, ...props }: { storyName?: string, dataTitle?: string;[key: string]: any }) => {
    const { data, loading, error } = useCookieConsentConfig(dataTitle || storyName, mockApi);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!data) return null;

    const config = {
        ...data,
        data: {
            ...data.data,
            ...props
        }
    };
    return data ? <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={data} /></div> : null;
};

export const Default: Story = {
    render: (args) => <StoryData storyName="Default" dataTitle="Default" {...args} />,
};

export const CustomMessage: Story = {
    render: (args) => <StoryData storyName="CustomMessage" dataTitle="CustomMessage" {...args} />,
};

export const MobileView: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    render: (args) => <StoryData storyName="MobileView" dataTitle="MobileView" {...args} />,
};
