import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/omniportal";
import { registerComponent } from "@sankhyatronics/omniportal";
import { useFooterConfig } from "@sankhyatronics/omniportal";
import { Footer } from "@sankhyatronics/omniportal";
import { mockApi } from "./data/mockApiService";
// Register specific component
registerComponent('Footer', Footer);

const meta: Meta<typeof DynamicRenderer> = {
    title: "Components/Footer",
    component: DynamicRenderer,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default' }: { storyName?: string }) => {
    const { data, loading, error } = useFooterConfig(storyName, mockApi);

    if (loading) return <div className="bg-green-200">Loading...</div>;
    if (error) return <div className="bg-red-200">Error: {error}</div>;

    return data ? <DynamicRenderer config={data} /> : null;
};

export const Default: Story = {
    render: () => <StoryData storyName="Default" />,
};
