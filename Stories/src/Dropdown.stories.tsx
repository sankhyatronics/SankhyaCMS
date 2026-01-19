import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownProvider } from "@sankhyatronics/sankhya-ui";
import { DynamicRenderer } from "@sankhyatronics/sankhya-ui";
import { registerComponent } from "@sankhyatronics/sankhya-ui";
import { Dropdown } from "@sankhyatronics/sankhya-ui";
import { useDropdownConfig } from "@sankhyatronics/sankhya-ui";
import { mockApi } from "./data/mockApiService";
registerComponent('Dropdown', Dropdown);

const DropdownProviderDecorator = (Story: any) => (
  <DropdownProvider>
    <Story />
  </DropdownProvider>
);

const meta: Meta<typeof DynamicRenderer> = {
  title: "Components/Dropdown",
  component: DynamicRenderer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [DropdownProviderDecorator],
  argTypes: {
    config: {
      control: 'object',
      description: 'IComponent configuration'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default' }: { storyName?: string }) => {
  const { data, loading, error } = useDropdownConfig(storyName, mockApi);

  if (loading) return <div className="bg-green-200">Loading...</div>;
  if (error) return <div className="bg-red-">Error: {error}</div>;

  return data ? <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={data} /></div> : null;
};


export const Default: Story = {
  render: () => <StoryData storyName="Default" />,
};

export const WithIconRight: Story = {
  render: () => <StoryData storyName="WithIconRight" />,
};
export const WithLink: Story = {
  render: () => <StoryData storyName="WithLink" />,
};
export const Compact: Story = {
  render: () => <StoryData storyName="Compact" />,
};
export const WithoutIcon: Story = {
  render: () => <StoryData storyName="WithoutIcon" />,
};
export const WithSingleColumnGrid: Story = {
  render: () => <StoryData storyName="WithSingleColumnGrid" />,
};
export const WithFourColumns: Story = {
  render: () => <StoryData storyName="WithFourColumns" />,
};
export const WithMenuItemChildren: Story = {
  render: () => <StoryData storyName="WithMenuItemChildren" />,
};
export const Empty: Story = {
  render: () => <StoryData storyName="Empty" />,
};
export const WithCustomIconSize: Story = {
  render: () => <StoryData storyName="WithCustomIconSize" />,
};
