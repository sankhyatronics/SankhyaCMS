import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/sankhya-ui";
import { registerComponent } from "@sankhyatronics/sankhya-ui";
import { MenuGridItem } from "@sankhyatronics/sankhya-ui";
import { useMenuGridItemConfig } from "@sankhyatronics/sankhya-ui";
import { mockApi } from "./data/mockApiService";
// Register the component
registerComponent('MenuGridItem', MenuGridItem);

const meta: Meta<typeof DynamicRenderer> = {
  title: "Components/MenuGridItem",
  component: DynamicRenderer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default', dataTitle, ...props }: { storyName?: string;[key: string]: any }) => {
  const { data, loading, error } = useMenuGridItemConfig(dataTitle || storyName, mockApi);

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

export const Compact: Story = {
  render: (args) => <StoryData storyName="Compact" dataTitle="Compact" {...args} />,
};

export const WithoutBadge: Story = {
  render: (args) => <StoryData storyName="WithoutBadge" dataTitle="WithoutBadge" {...args} />,
};
export const WithoutDescription: Story = {
  render: (args) => <StoryData storyName="WithoutDescription" dataTitle="WithoutDescription" {...args} />,
};
export const Minimal: Story = {
  render: (args) => <StoryData storyName="Minimal" dataTitle="Minimal" {...args} />,
};
export const LongTitle: Story = {
  render: (args) => <StoryData storyName="LongTitle" dataTitle="LongTitle" {...args} />,
};
export const LongDescription: Story = {
  render: (args) => <StoryData storyName="LongDescription" dataTitle="LongDescription" {...args} />,
};
export const SpecialBadge: Story = {
  render: (args) => <StoryData storyName="SpecialBadge" dataTitle="SpecialBadge" {...args} />,
};
export const CustomColors: Story = {
  render: (args) => <StoryData storyName="CustomColors" dataTitle="CustomColors" {...args} />,
};
export const DisabledStyle: Story = {
  render: (args) => <StoryData storyName="DisabledStyle" dataTitle="DisabledStyle" {...args} />,
};
export const WithoutIcon: Story = {
  render: (args) => <StoryData storyName="WithoutIcon" dataTitle="WithoutIcon" {...args} />,
};
export const MultipleBadges: Story = {
  render: (args) => <StoryData storyName="MultipleBadges" dataTitle="MultipleBadges" {...args} />,
};
export const ExternalLink: Story = {
  render: (args) => <StoryData storyName="ExternalLink" dataTitle="ExternalLink" {...args} />,
};
export const PremiumFeature: Story = {
  render: (args) => <StoryData storyName="PremiumFeature" dataTitle="PremiumFeature" {...args} />,
};


