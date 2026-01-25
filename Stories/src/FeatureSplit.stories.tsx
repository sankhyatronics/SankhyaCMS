import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/sankhya-ui";
import { registerComponent } from "@sankhyatronics/sankhya-ui";
import { useFeatureSplitConfig } from "@sankhyatronics/sankhya-ui";
import { FeatureSplit } from "@sankhyatronics/sankhya-ui";
import { mockApi } from "./data/mockApiService";
// Register specific component
registerComponent('FeatureSplit', FeatureSplit);

const meta: Meta<typeof DynamicRenderer> = {
    title: "Components/FeatureSplit",
    component: DynamicRenderer,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default', dataTitle, ...props }: { storyName?: string;[key: string]: any }) => {
    const { data, loading, error } = useFeatureSplitConfig(dataTitle || storyName, mockApi);

    if (loading) return <div className="bg-green-200">Loading...</div>;
    if (error) return <div className="bg-red-200">Error: {error}</div>;

    if (data) {
        data.data = { ...data.data, ...props };
    }

    return data ? <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={data} /></div> : null;
};

export const Default: Story = {
    render: (args) => <StoryData storyName="Default" dataTitle="Default" {...args} />,
};

export const ImageLeft: Story = {
    render: (args) => <StoryData storyName="ImageLeft" dataTitle="ImageLeft" {...args} />,
};
