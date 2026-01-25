import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/sankhya-ui";
import { registerComponent } from "@sankhyatronics/sankhya-ui";
import { MenuGrid } from "@sankhyatronics/sankhya-ui";
import { MenuGridItem } from "@sankhyatronics/sankhya-ui";
import { useMenuGridConfig } from "@sankhyatronics/sankhya-ui";
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
  argTypes: {
    config: {
      control: 'object',
      description: 'MenuGrid configuration in IComponent format'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default', dataTitle, ...props }: { storyName?: string;[key: string]: any }) => {
  const { data, loading, error } = useMenuGridConfig(dataTitle || storyName, mockApi);

  if (loading) return <div className="bg-green-200">Loading...</div>;
  if (error) return <div className="bg-red-">Error: {error}</div>;

  if (data) {
    data.data = { ...data.data, ...props };
  }

  return data ? <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={data} /></div> : null;
};

export const Default: Story = {
  render: (args) => <StoryData storyName="Default" dataTitle="Default" {...args} />,
};

export const TwoColumns: Story = {
  render: (args) => <StoryData storyName="TwoColumns" dataTitle="TwoColumns" {...args} />,
};


export const FourColumns: Story = {
  render: (args) => <StoryData storyName="FourColumns" dataTitle="FourColumns" {...args} />,
};
export const SingleColumn: Story = {
  render: (args) => <StoryData storyName="SingleColumn" dataTitle="SingleColumn" {...args} />,
};
export const ManyItems: Story = {
  render: (args) => <StoryData storyName="ManyItems" dataTitle="ManyItems" {...args} />,
};
export const Compact: Story = {
  render: (args) => <StoryData storyName="Compact" dataTitle="Compact" {...args} />,
};
export const WithMixedContent: Story = {
  render: (args) => <StoryData storyName="WithMixedContent" dataTitle="WithMixedContent" {...args} />,
};
export const Empty: Story = {
  render: (args) => <StoryData storyName="Empty" dataTitle="Empty" {...args} />,
};
export const ResponsiveTest: Story = {
  render: (args) => <StoryData storyName="ResponsiveTest" dataTitle="ResponsiveTest" {...args} />,
};
