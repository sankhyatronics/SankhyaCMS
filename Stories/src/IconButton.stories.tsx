import type { Meta, StoryObj } from '@storybook/react';
import { IconButton, registerComponent } from '@sankhyatronics/sankhya-ui';
registerComponent('IconButton', IconButton);

const meta: Meta<typeof IconButton> = {
    title: 'Internal/IconButton',
    component: IconButton,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: 'mdi:account',
        label: 'User Profile',
    },
};

export const Large: Story = {
    args: {
        icon: 'mdi:heart',
        label: 'Favorite',
        size: 32,
    },
};

export const CustomColor: Story = {
    args: {
        icon: 'mdi:bell',
        label: 'Notifications',
        color: '#ff0000',
    },
};
