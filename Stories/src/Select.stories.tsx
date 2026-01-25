import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownProvider } from "@sankhyatronics/sankhya-ui";
import { DynamicRenderer } from "@sankhyatronics/sankhya-ui";
import { registerComponent } from "@sankhyatronics/sankhya-ui";
import { Select } from "@sankhyatronics/sankhya-ui";
import { useSelectConfig } from "@sankhyatronics/sankhya-ui";
import { mockApi } from "./data/mockApiService";

registerComponent('Select', Select);

const DropdownProviderDecorator = (Story: any) => (
    <DropdownProvider>
        <Story />
    </DropdownProvider>
);

const meta: Meta<typeof DynamicRenderer> = {
    title: "Components/Select",
    component: DynamicRenderer,
    parameters: {
        layout: "centered",
    },
    decorators: [DropdownProviderDecorator],
    argTypes: {
        config: {
            control: 'object',
            description: 'IComponent configuration'
        }
    }
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default', dataTitle, ...props }: { storyName?: string;[key: string]: any }) => {
    const { data, loading, error } = useSelectConfig(dataTitle || storyName, mockApi);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    if (data) {
        data.data = { ...data.data, ...props };
    }

    return data ? <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={data} /></div> : null;
};

export const Default: Story = {
    render: (args) => <StoryData storyName="Default" dataTitle="Default" {...args} />,
};

export const WithIcons: Story = {
    render: (args) => <StoryData storyName="WithIcons" dataTitle="WithIcons" {...args} />,
};

export const PreSelected: Story = {
    render: (args) => <StoryData storyName="PreSelected" dataTitle="PreSelected" {...args} />,
};
export const Language: Story = {
    render: (args) => <StoryData storyName="Language" dataTitle="Language" {...args} />,
};
