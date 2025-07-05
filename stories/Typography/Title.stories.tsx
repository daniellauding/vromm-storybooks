import type { Meta, StoryObj } from '@storybook/react';
import { Title } from '../../src/components/Typography/Title';

const meta: Meta<typeof Title> = {
  title: 'Typography/Title',
  component: Title,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Title component for headings and titles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Heading level (h1-h6)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
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
    children: 'Welcome to Vromm Design System',
    level: 1,
    size: '4xl',
    weight: 'semibold',
    variant: 'primary',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Title size="xl">Large Title - xl</Title>
      <Title size="2xl">2X Large Title - 2xl</Title>
      <Title size="3xl">3X Large Title - 3xl</Title>
      <Title size="4xl">4X Large Title - 4xl</Title>
      <Title size="5xl">5X Large Title - 5xl</Title>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <Title variant="primary">Primary Title</Title>
      <Title variant="secondary">Secondary Title</Title>
      <Title variant="success">Success Title</Title>
      <Title variant="warning">Warning Title</Title>
      <Title variant="error">Error Title</Title>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Title - Try changing the controls below!',
    level: 1,
    size: '3xl',
    weight: 'semibold',
    variant: 'primary',
  },
}; 