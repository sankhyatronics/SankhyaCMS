import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/SankhyaCMS";
import { registerComponent } from "@sankhyatronics/SankhyaCMS";
import { MenuGrid } from "@sankhyatronics/SankhyaCMS";
import { MenuGridItem } from "@sankhyatronics/SankhyaCMS";
import { useMenuGridConfig } from "@sankhyatronics/SankhyaCMS";
import { mockApi } from "./data/mockApiService";

// Register components
registerComponent('MenuGrid', MenuGrid);
registerComponent('MenuGridItem', MenuGridItem);

const meta: Meta<typeof DynamicRenderer> = {
  title: "Components/MenuGrid",
  component: DynamicRenderer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    config: {
      control: 'object',
      description: 'MenuGrid configuration in IComponent format'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default' }: { storyName?: string }) => {
  const { data, loading, error } = useMenuGridConfig(storyName, mockApi);

  if (loading) return <div className="bg-green-200">Loading...</div>;
  if (error) return <div className="bg-red-">Error: {error}</div>;

  return data ? <DynamicRenderer config={data} /> : null;
};

export const Default: Story = {
  render: () => <StoryData storyName="Default" />,
};

export const TwoColumns: Story = {
  render: () => <StoryData storyName="TwoColumns" />,
};


export const FourColumns: Story = {
  render: () => <StoryData storyName="FourColumns" />,
};
export const SingleColumn: Story = {
  render: () => <StoryData storyName="SingleColumn" />,
};
export const ManyItems: Story = {
  render: () => <StoryData storyName="ManyItems" />,
};
export const Compact: Story = {
  render: () => <StoryData storyName="Compact" />,
};
export const WithMixedContent: Story = {
  render: () => <StoryData storyName="WithMixedContent" />,
};
export const Empty: Story = {
  render: () => <StoryData storyName="Empty" />,
};
export const ResponsiveTest: Story = {
  render: () => <StoryData storyName="ResponsiveTest" />,
};
