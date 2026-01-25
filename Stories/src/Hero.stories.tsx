import type { Meta, StoryObj } from "@storybook/react-vite";
import { DynamicRenderer } from "@sankhyatronics/sankhya-ui";
import { registerComponent } from "@sankhyatronics/sankhya-ui";
import { useHeroConfig } from "@sankhyatronics/sankhya-ui";
import { Hero } from "@sankhyatronics/sankhya-ui";
import { mockApi } from "./data/mockApiService";
// Register all components
registerComponent('Hero', Hero);


const meta: Meta<typeof DynamicRenderer> = {
  title: "Components/Hero",
  component: DynamicRenderer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    focalPoint: {
      control: 'select',
      options: ['top', 'left', 'right', 'bottom', 'center'],
      description: 'Sets the focal point of the background image',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DynamicRenderer>;

const StoryData = ({ storyName = 'Default', dataTitle, ...props }: { storyName?: string;[key: string]: any }) => {
  const { data, loading, error } = useHeroConfig(dataTitle || storyName, mockApi);

  if (loading) return <div className="bg-green-200">Loading...</div>;
  if (error) return <div className="bg-red-">Error: {error}</div>;

  if (data) {
    // Merge props into the component data
    data.data = { ...data.data, ...props };
  }

  return data ? <div className="bg-primary min-h-64 overflow-hidden"><DynamicRenderer config={data} /></div> : null;
};

export const Default: Story = {
  render: (args) => <StoryData storyName="Default" dataTitle="Default" {...args} />,
  args: {
    focalPoint: 'center',
  } as any,
};

