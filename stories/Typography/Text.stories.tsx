import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../../src/components/Typography';

const meta: Meta<typeof Text> = {
  title: 'Components/Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text component for body text and paragraphs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
      description: 'Font size',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error'],
      description: 'Color variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is the default text component. It supports multiple sizes, weights, and color variants to fit your design needs.',
    size: 'base',
    weight: 'normal',
    variant: 'primary',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-3 max-w-lg">
      <Text size="sm">Small text - perfect for captions and secondary information.</Text>
      <Text size="base">Base text - the default size for most content.</Text>
      <Text size="lg">Large text - great for emphasis and important content.</Text>
      <Text size="xl">Extra large text - for standout content.</Text>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3 max-w-lg">
      <Text variant="primary">Primary text - main content color</Text>
      <Text variant="secondary">Secondary text - supporting information</Text>
      <Text variant="tertiary">Tertiary text - less important details</Text>
      <Text variant="success">Success text - positive messages</Text>
      <Text variant="warning">Warning text - attention needed</Text>
      <Text variant="error">Error text - problems or issues</Text>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: 'Interactive text - Use the controls below to experiment with different styles!',
    size: 'base',
    weight: 'normal',
    variant: 'primary',
  },
}; 