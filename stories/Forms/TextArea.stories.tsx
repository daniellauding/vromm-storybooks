import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '../../src/components/Forms/TextArea';

const meta = {
  title: 'Components/Forms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message here...',
    helperText: 'Please provide a detailed message.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <TextArea
        label="Default variant"
        placeholder="Enter text..."
        variant="default"
        helperText="This is the default variant"
      />
      <TextArea
        label="Filled variant"
        placeholder="Enter text..."
        variant="filled"
        helperText="This is the filled variant"
      />
      <TextArea
        label="Outline variant"
        placeholder="Enter text..."
        variant="outline"
        helperText="This is the outline variant"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <TextArea
        label="Small size"
        placeholder="Enter text..."
        size="sm"
        helperText="Small textarea size"
      />
      <TextArea
        label="Medium size"
        placeholder="Enter text..."
        size="md"
        helperText="Medium textarea size (default)"
      />
      <TextArea
        label="Large size"
        placeholder="Enter text..."
        size="lg"
        helperText="Large textarea size"
      />
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <TextArea
        label="No resize"
        placeholder="Enter text..."
        resize="none"
        helperText="This textarea cannot be resized"
      />
      <TextArea
        label="Vertical resize"
        placeholder="Enter text..."
        resize="vertical"
        helperText="This textarea can be resized vertically"
      />
      <TextArea
        label="Horizontal resize"
        placeholder="Enter text..."
        resize="horizontal"
        helperText="This textarea can be resized horizontally"
      />
      <TextArea
        label="Both resize"
        placeholder="Enter text..."
        resize="both"
        helperText="This textarea can be resized in both directions"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <TextArea
        label="Normal state"
        placeholder="Enter text..."
        helperText="This is a normal textarea"
      />
      <TextArea
        label="Error state"
        placeholder="Enter text..."
        error={true}
        helperText="This field is required"
      />
      <TextArea
        label="Disabled state"
        placeholder="Enter text..."
        disabled={true}
        helperText="This textarea is disabled"
      />
      <TextArea
        label="Disabled with value"
        placeholder="Enter text..."
        disabled={true}
        value="This is some disabled text that cannot be edited."
        helperText="This textarea is disabled with a value"
      />
    </div>
  ),
};

export const RowsAndCols: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <TextArea
        label="Default rows (4)"
        placeholder="Enter text..."
        helperText="Default textarea with 4 rows"
      />
      <TextArea
        label="2 rows"
        placeholder="Enter text..."
        rows={2}
        helperText="Short textarea with 2 rows"
      />
      <TextArea
        label="8 rows"
        placeholder="Enter text..."
        rows={8}
        helperText="Tall textarea with 8 rows"
      />
    </div>
  ),
};

export const WithMaxLength: Story = {
  args: {
    label: 'Limited message',
    placeholder: 'Enter your message (max 100 characters)...',
    maxLength: 100,
    helperText: 'This textarea has a 100 character limit.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Required field',
    placeholder: 'Please enter a message...',
    error: true,
    helperText: 'This field is required and cannot be empty.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled textarea',
    placeholder: 'This textarea is disabled',
    disabled: true,
    helperText: 'This textarea cannot be modified',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Pre-filled textarea',
    value: 'This is some pre-filled text that demonstrates how the textarea looks with content.',
    helperText: 'Textarea with a pre-filled value',
  },
}; 