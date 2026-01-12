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
  tags: ["autodocs"],
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
  const { data, loading, error } = useHeaderConfig(storyName, mockApi);

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

  return data ? <DynamicRenderer config={data} handlers={handlers} /> : null;
};

export const Default: Story = {
  render: () => <StoryData storyName="Default" />,
};

export const Sticky: Story = {
  render: () => <StoryData storyName="Sticky" />,
};

export const Minimal: Story = {
  render: () => <StoryData storyName="Minimal" />,
};

export const WithMultipleDropdowns: Story = {
  render: () => <StoryData storyName="WithMultipleDropdowns" />,
};

export const WithNoMenu: Story = {
  render: () => <StoryData storyName="WithNoMenu" />,
};

export const WithManyUtilityButtons: Story = {
  render: () => <StoryData storyName="WithManyUtilityButtons" />,
};

export const WithCTAs: Story = {
  render: () => <StoryData storyName="WithCTAs" />,
};


