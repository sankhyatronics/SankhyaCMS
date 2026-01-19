import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/sankhya-ui";
import { registerComponent } from "@sankhyatronics/sankhya-ui";
import { useItemsAccordionConfig } from "@sankhyatronics/sankhya-ui";
import { ItemsAccordion } from "@sankhyatronics/sankhya-ui";
import { mockApi } from "./data/mockApiService";
// Register specific component
registerComponent('ItemsAccordion', ItemsAccordion);


const meta: Meta<typeof DynamicRenderer> = {
    title: "Components/ItemsAccordion",
    component: DynamicRenderer,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default' }: { storyName?: string }) => {
    const { data, loading, error } = useItemsAccordionConfig(storyName, mockApi);

    if (loading) return <div className="bg-green-200">Loading...</div>;
    if (error) return <div className="bg-red-200">Error: {error}</div>;

    return data ? <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={data} /></div> : null;
};

export const Default: Story = {
    render: () => <StoryData storyName="Default" />,
};
