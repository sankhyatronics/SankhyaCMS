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

const StoryData = ({ storyName = 'Default', dataTitle, ...props }: { storyName?: string;[key: string]: any }) => {
  const { data, loading, error } = useDropdownConfig(dataTitle || storyName, mockApi);

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

export const WithIconRight: Story = {
  render: (args) => <StoryData storyName="WithIconRight" dataTitle="WithIconRight" {...args} />,
};
export const WithLink: Story = {
  render: (args) => <StoryData storyName="WithLink" dataTitle="WithLink" {...args} />,
};
export const Compact: Story = {
  render: (args) => <StoryData storyName="Compact" dataTitle="Compact" {...args} />,
};
export const WithoutIcon: Story = {
  render: (args) => <StoryData storyName="WithoutIcon" dataTitle="WithoutIcon" {...args} />,
};
export const WithSingleColumnGrid: Story = {
  render: (args) => <StoryData storyName="WithSingleColumnGrid" dataTitle="WithSingleColumnGrid" {...args} />,
};
export const WithFourColumns: Story = {
  render: (args) => <StoryData storyName="WithFourColumns" dataTitle="WithFourColumns" {...args} />,
};
export const WithMenuItemChildren: Story = {
  render: (args) => <StoryData storyName="WithMenuItemChildren" dataTitle="WithMenuItemChildren" {...args} />,
};
export const Empty: Story = {
  render: (args) => <StoryData storyName="Empty" dataTitle="Empty" {...args} />,
};
export const WithCustomIconSize: Story = {
  render: (args) => <StoryData storyName="WithCustomIconSize" dataTitle="WithCustomIconSize" {...args} />,
};
