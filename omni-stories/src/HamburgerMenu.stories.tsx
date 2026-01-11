import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/omniportal";
import { registerComponent } from "@sankhyatronics/omniportal";
import { HamburgerMenu } from "@sankhyatronics/omniportal";
import { useHamburgerMenuConfig } from "@sankhyatronics/omniportal";
import { mockApi } from "./data/mockApiService";
// Register components
registerComponent('HamburgerMenu', HamburgerMenu);

const meta: Meta<typeof DynamicRenderer> = {
  title: "Components/HamburgerMenu",
  component: DynamicRenderer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    config: {
      control: 'object',
      description: 'HamburgerMenu configuration in IComponent format'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default' }: { storyName?: string }) => {
  const { data, loading, error } = useHamburgerMenuConfig(storyName, mockApi);

  if (loading) return <div className="bg-green-200">Loading...</div>;
  if (error) return <div className="bg-red-">Error: {error}</div>;

  return data ? <DynamicRenderer config={data} /> : null;
};


export const Default: Story = {
  render: () => <StoryData storyName="Default" />,
};

export const LeftPosition: Story = {
  render: () => <StoryData storyName="LeftPosition" />,
};

export const WithComplexContent: Story = {
  render: () => <StoryData storyName="WithComplexContent" />,
};
