import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/SankhyaCMS";
import { registerComponent } from "@sankhyatronics/SankhyaCMS";
import { MenuGridItem } from "@sankhyatronics/SankhyaCMS";
import { useMenuGridItemConfig } from "@sankhyatronics/SankhyaCMS";
import { mockApi } from "./data/mockApiService";
// Register the component
registerComponent('MenuGridItem', MenuGridItem);

const meta: Meta<typeof DynamicRenderer> = {
  title: "Components/MenuGridItem",
  component: DynamicRenderer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default' }: { storyName?: string }) => {
  const { data, loading, error } = useMenuGridItemConfig(storyName, mockApi);

  if (loading) return <div className="bg-green-200">Loading...</div>;
  if (error) return <div className="bg-red-">Error: {error}</div>;

  return data ? <DynamicRenderer config={data} /> : null;
};


export const Default: Story = {
  render: () => <StoryData storyName="Default" />,
};

export const Compact: Story = {
  render: () => <StoryData storyName="Compact" />,
};

export const WithoutBadge: Story = {
  render: () => <StoryData storyName="WithoutBadge" />,
};
export const WithoutDescription: Story = {
  render: () => <StoryData storyName="WithoutDescription" />,
};
export const Minimal: Story = {
  render: () => <StoryData storyName="Minimal" />,
};
export const LongTitle: Story = {
  render: () => <StoryData storyName="LongTitle" />,
};
export const LongDescription: Story = {
  render: () => <StoryData storyName="LongDescription" />,
};
export const SpecialBadge: Story = {
  render: () => <StoryData storyName="SpecialBadge" />,
};
export const CustomColors: Story = {
  render: () => <StoryData storyName="CustomColors" />,
};
export const DisabledStyle: Story = {
  render: () => <StoryData storyName="DisabledStyle" />,
};
export const WithoutIcon: Story = {
  render: () => <StoryData storyName="WithoutIcon" />,
};
export const MultipleBadges: Story = {
  render: () => <StoryData storyName="MultipleBadges" />,
};
export const ExternalLink: Story = {
  render: () => <StoryData storyName="ExternalLink" />,
};
export const PremiumFeature: Story = {
  render: () => <StoryData storyName="PremiumFeature" />,
};


