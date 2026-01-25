import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/sankhya-ui";
import { registerComponent } from "@sankhyatronics/sankhya-ui";
import { useCarouselConfig } from "@sankhyatronics/sankhya-ui";
import { Carousel, Hero } from "@sankhyatronics/sankhya-ui";
import { mockApi } from "./data/mockApiService";

// Register components
registerComponent('Carousel', Carousel);
registerComponent('Hero', Hero); // Hero is needed as child

const meta: Meta<typeof DynamicRenderer> = {
    title: "Components/Carousel",
    component: DynamicRenderer,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Using Hero', dataTitle, ...props }: { storyName?: string;[key: string]: any }) => {
    const { data, loading, error } = useCarouselConfig(dataTitle, mockApi);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    if (data) {
        data.data = { ...data.data, ...props };
    }

    return data ? <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={data} /></div> : null;
};

export const UsingHero: Story = {
    render: (args) => <StoryData storyName="Using Hero" dataTitle="UsingHero" {...args} />,
};

export const UsingCTASection: Story = {
    render: (args) => <StoryData storyName="Using CTASection" dataTitle="UsingCTASection" {...args} />,
};
