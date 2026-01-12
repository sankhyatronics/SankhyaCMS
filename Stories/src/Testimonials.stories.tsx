import type { Meta, StoryObj } from '@storybook/react';
import { DynamicRenderer, Testimonials, registerComponent, useTestimonialsConfig } from '@sankhyatronics/sankhya-ui';
import { mockApi } from './data/mockApiService';

registerComponent('Testimonials', Testimonials);

const meta: Meta<typeof DynamicRenderer> = {
    title: 'Components/Testimonials',
    component: DynamicRenderer,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const StoryData = ({ storyName = 'Default', inverted = false }: { storyName?: string, inverted?: boolean }) => {
    const { data, loading, error } = useTestimonialsConfig(storyName, mockApi);

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

    return <DynamicRenderer config={config} />;
};

export const Default: Story = {
    render: () => <StoryData storyName="Default" />,
};

export const Inverted: Story = {
    render: () => <StoryData storyName="Default" inverted={true} />,
};
