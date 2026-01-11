import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/omniportal";
import { registerComponent } from "@sankhyatronics/omniportal";
import { useHeroConfig } from "@sankhyatronics/omniportal";
import { Hero } from "@sankhyatronics/omniportal";
import { mockApi } from "./data/mockApiService";
// Register all components
registerComponent('Hero', Hero);


const meta: Meta<typeof DynamicRenderer> = {
  title: "Components/Hero",
  component: DynamicRenderer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default' }: { storyName?: string }) => {
  const { data, loading, error } = useHeroConfig(storyName, mockApi);

  if (loading) return <div className="bg-green-200">Loading...</div>;
  if (error) return <div className="bg-red-">Error: {error}</div>;

  return data ? <DynamicRenderer config={data} /> : null;
};

export const Default: Story = {
  render: () => <StoryData storyName="Default" />,
};

