import type { Meta, StoryObj } from '@storybook/react-vite';
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

const StoryData = ({ storyName = 'Default', dataTitle, inverted = false, ...props }: { storyName?: string, dataTitle?: string, inverted?: boolean;[key: string]: any }) => {
    const { data, loading, error } = useCTASectionConfig(dataTitle || storyName, mockApi);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!data) return null;

    // Add inverted prop if specified
    const config = {
        ...data,
        data: {
            ...data.data,
            ...props,
            inverted
        }
    };

    return <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={config} /></div>;
};

export const Default: Story = {
    render: (args) => <StoryData storyName="Default" dataTitle="Default" {...args} />,
};

export const Inverted: Story = {
    render: (args) => <StoryData storyName="Default" dataTitle="Default" inverted={true} {...args} />,
};

export const WithImage: Story = {
    render: (args) => <StoryData storyName="Default" dataTitle="Default" {...args} />,
};
