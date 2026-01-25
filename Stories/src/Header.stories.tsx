import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownProvider } from "@sankhyatronics/sankhya-ui";
import { DynamicRenderer } from "@sankhyatronics/sankhya-ui";
import { registerComponent } from "@sankhyatronics/sankhya-ui";
import { Header } from "@sankhyatronics/sankhya-ui";
import { useHeaderConfig } from "@sankhyatronics/sankhya-ui";
import { mockApi } from "./data/mockApiService";
// Register all components
registerComponent('Header', Header);

const DropdownProviderDecorator = (Story: any) => (
  <DropdownProvider>
    <Story />
  </DropdownProvider>
);

const meta: Meta<typeof DynamicRenderer> = {
  title: "Components/Header",
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
  const { data, loading, error } = useHeaderConfig(dataTitle || storyName, mockApi);

  const handlers = {
    onCartClick: () => alert('Cart clicked!'),
    onLoginClick: () => alert('Login clicked!'),
    onNotificationClick: () => alert('Notification clicked!'),
    onMessageClick: () => alert('Message clicked!'),
    onSettingsClick: () => alert('Settings clicked!'),
    onHelpClick: () => alert('Help clicked!'),
    onSignUpClick: () => alert('Sign Up clicked!')
  };

  if (loading) return <div className="bg-green-200">Loading...</div>;
  if (error) return <div className="bg-red-">Error: {error}</div>;

  if (data) {
    data.data = { ...data.data, ...props };
  }

  return data ? <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={data} handlers={handlers} /></div> : null;
};

export const Default: Story = {
  render: (args) => <StoryData storyName="Default" dataTitle="Default" {...args} />,
};

export const Sticky: Story = {
  render: (args) => <StoryData storyName="Sticky" dataTitle="Sticky" {...args} />,
};

export const Minimal: Story = {
  render: (args) => <StoryData storyName="Minimal" dataTitle="Minimal" {...args} />,
};

export const WithMultipleDropdowns: Story = {
  render: (args) => <StoryData storyName="WithMultipleDropdowns" dataTitle="WithMultipleDropdowns" {...args} />,
};

export const WithNoMenu: Story = {
  render: (args) => <StoryData storyName="WithNoMenu" dataTitle="WithNoMenu" {...args} />,
};

export const WithManyUtilityButtons: Story = {
  render: (args) => <StoryData storyName="WithManyUtilityButtons" dataTitle="WithManyUtilityButtons" {...args} />,
};

export const WithCTAs: Story = {
  render: (args) => <StoryData storyName="WithCTAs" dataTitle="WithCTAs" {...args} />,
};


