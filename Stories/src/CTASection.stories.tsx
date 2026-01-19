import type { Meta, StoryObj } from '@storybook/react';
import { DynamicRenderer, CTASection, registerComponent, useCTASectionConfig } from '@sankhyatronics/sankhya-ui';
import { mockApi } from './data/mockApiService';

registerComponent('CTASection', CTASection);

const meta: Meta<typeof DynamicRenderer> = {
    title: 'Components/CTASection',
    component: DynamicRenderer,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const StoryData = ({ storyName = 'Default', inverted = false }: { storyName?: string, inverted?: boolean }) => {
    const { data, loading, error } = useCTASectionConfig(storyName, mockApi);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!data) return null;

    // Add inverted prop if specified
    const config = {
        ...data,
        data: {
            ...data.data,
            inverted
        }
    };

    return <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={config} /></div>;
};

export const Default: Story = {
    render: () => <StoryData storyName="Default" />,
};

export const Inverted: Story = {
    render: () => <StoryData storyName="Default" inverted={true} />,
};

export const WithImage: Story = {
    render: () => <StoryData storyName="Default" />,
};
