import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../src/components/Forms/Checkbox';

const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    description: 'By checking this box, you agree to our terms of service and privacy policy.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Checkbox
        label="Small checkbox"
        size="sm"
        description="Small checkbox size"
      />
      <Checkbox
        label="Medium checkbox"
        size="md"
        description="Medium checkbox size (default)"
      />
      <Checkbox
        label="Large checkbox"
        size="lg"
        description="Large checkbox size"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Checkbox
        label="Unchecked checkbox"
        checked={false}
        description="This checkbox is not checked"
      />
      <Checkbox
        label="Checked checkbox"
        checked={true}
        description="This checkbox is checked"
      />
      <Checkbox
        label="Disabled unchecked"
        checked={false}
        disabled={true}
        description="This checkbox is disabled and not checked"
      />
      <Checkbox
        label="Disabled checked"
        checked={true}
        disabled={true}
        description="This checkbox is disabled and checked"
      />
      <Checkbox
        label="Error state"
        error={true}
        description="This checkbox has an error"
      />
    </div>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Checkbox
        label="Simple checkbox"
      />
      <Checkbox
        label="Another checkbox"
        checked={true}
      />
      <Checkbox
        label="Disabled checkbox"
        disabled={true}
      />
    </div>
  ),
};

export const LongLabels: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Checkbox
        label="I agree to receive marketing emails and promotional content"
        description="You'll receive occasional emails about new features, updates, and special offers. You can unsubscribe at any time from your account settings."
      />
      <Checkbox
        label="I understand that this action cannot be undone and will permanently delete all my data"
        description="This is a destructive action that will remove all your personal information, posts, and account settings. Please make sure you have downloaded any data you want to keep."
      />
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Select your interests:</h3>
      </div>
      <Checkbox
        label="Technology"
        description="Latest tech news and updates"
      />
      <Checkbox
        label="Design"
        description="UI/UX design trends and tutorials"
      />
      <Checkbox
        label="Business"
        description="Entrepreneurship and business strategy"
      />
      <Checkbox
        label="Science"
        description="Scientific discoveries and research"
      />
    </div>
  ),
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    description: 'Get weekly updates about new features and content',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    description: 'This checkbox cannot be toggled',
    disabled: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Required field',
    description: 'This field is required to continue',
    error: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    description: 'This checkbox is checked but cannot be toggled',
    checked: true,
    disabled: true,
  },
}; 