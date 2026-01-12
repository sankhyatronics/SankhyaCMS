import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@sankhyatronics/sankhya-ui';

const meta: Meta<typeof Card> = {
    title: 'Internal/Card',
    component: Card,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>Card Title</h3>
                <p style={{ margin: 0 }}>This is a simple card component used internally by many sections.</p>
            </div>
        ),
    },
};

export const Hoverable: Story = {
    args: {
        ...Default.args,
        hoverable: true,
    },
};

export const ElevationLow: Story = {
    args: {
        ...Default.args,
        elevation: 'sm',
    },
};

export const ElevationHigh: Story = {
    args: {
        ...Default.args,
        elevation: 'lg',
    },
};

export const Inverted: Story = {
    args: {
        children: (
            <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>Inverted Card</h3>
                <p style={{ margin: 0 }}>The card inherits theme styles when inverted.</p>
            </div>
        ),
        className: 'theme-inverted',
    },
};
