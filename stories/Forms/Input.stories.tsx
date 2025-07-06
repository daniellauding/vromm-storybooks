import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../src/components/Forms/Input';
import { QuickIcon } from '../../src/components/Icon';

const meta = {
  title: 'Components/Forms/Input',
  component: Input,
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
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email',
    helperText: 'We\'ll never share your email with anyone else.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Input
        label="Default variant"
        placeholder="Enter text"
        variant="default"
        helperText="This is the default variant"
      />
      <Input
        label="Filled variant"
        placeholder="Enter text"
        variant="filled"
        helperText="This is the filled variant"
      />
      <Input
        label="Outline variant"
        placeholder="Enter text"
        variant="outline"
        helperText="This is the outline variant"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Input
        label="Small size"
        placeholder="Enter text"
        size="sm"
        helperText="Small input size"
      />
      <Input
        label="Medium size"
        placeholder="Enter text"
        size="md"
        helperText="Medium input size (default)"
      />
      <Input
        label="Large size"
        placeholder="Enter text"
        size="lg"
        helperText="Large input size"
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Input
        label="With left icon"
        placeholder="Search..."
        leftIcon={<QuickIcon name="search" />}
        helperText="Search input with left icon"
      />
      <Input
        label="With right icon"
        placeholder="Enter password"
        type="password"
        rightIcon={<QuickIcon name="user" />}
        helperText="Password input with right icon"
      />
      <Input
        label="With both icons"
        placeholder="Enter email"
        leftIcon={<QuickIcon name="mail" />}
        rightIcon={<QuickIcon name="chevron-down" />}
        helperText="Input with both left and right icons"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Input
        label="Normal state"
        placeholder="Enter text"
        helperText="This is a normal input"
      />
      <Input
        label="Error state"
        placeholder="Enter text"
        error={true}
        helperText="This field is required"
      />
      <Input
        label="Disabled state"
        placeholder="Enter text"
        disabled={true}
        helperText="This input is disabled"
      />
      <Input
        label="Disabled with value"
        placeholder="Enter text"
        disabled={true}
        value="Disabled value"
        helperText="This input is disabled with a value"
      />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Input
        label="Text input"
        placeholder="Enter text"
        type="text"
        helperText="Standard text input"
      />
      <Input
        label="Email input"
        placeholder="Enter email"
        type="email"
        helperText="Email input with validation"
      />
      <Input
        label="Password input"
        placeholder="Enter password"
        type="password"
        helperText="Password input (hidden text)"
      />
      <Input
        label="Number input"
        placeholder="Enter number"
        type="number"
        helperText="Number input with spinners"
      />
      <Input
        label="Phone input"
        placeholder="Enter phone number"
        type="tel"
        helperText="Telephone input"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    placeholder: 'This input is disabled',
    disabled: true,
    helperText: 'This input cannot be modified',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Pre-filled input',
    value: 'john@example.com',
    helperText: 'Input with a pre-filled value',
  },
}; 