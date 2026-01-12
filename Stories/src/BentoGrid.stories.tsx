import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/SankhyaCMS";
import { registerComponent } from "@sankhyatronics/SankhyaCMS";
import { useBentoGridConfig } from "@sankhyatronics/SankhyaCMS";
import { BentoGrid } from "@sankhyatronics/SankhyaCMS";
import { mockApi } from "./data/mockApiService";
// Register specific component
registerComponent('BentoGrid', BentoGrid);

const meta: Meta<typeof DynamicRenderer> = {
    title: "Components/BentoGrid",
    component: DynamicRenderer,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default' }: { storyName?: string }) => {
    const { data, loading, error } = useBentoGridConfig(storyName, mockApi);

    if (loading) return <div className="bg-green-200">Loading...</div>;
    if (error) return <div className="bg-red-200">Error: {error}</div>;

    return data ? <DynamicRenderer config={data} /> : null;
};

export const Default: Story = {
    render: () => <StoryData storyName="Default" />,
};
