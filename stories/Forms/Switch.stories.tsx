import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../src/components/Forms/Switch';

const meta = {
  title: 'Components/Forms/Switch',
  component: Switch,
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
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Get notified when someone comments on your posts',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Switch
        label="Small switch"
        size="sm"
        description="Small toggle switch"
      />
      <Switch
        label="Medium switch"
        size="md"
        description="Medium toggle switch (default)"
      />
      <Switch
        label="Large switch"
        size="lg"
        description="Large toggle switch"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Switch
        label="Unchecked switch"
        checked={false}
        description="This switch is off"
      />
      <Switch
        label="Checked switch"
        checked={true}
        description="This switch is on"
      />
      <Switch
        label="Disabled unchecked"
        checked={false}
        disabled={true}
        description="This switch is disabled and off"
      />
      <Switch
        label="Disabled checked"
        checked={true}
        disabled={true}
        description="This switch is disabled and on"
      />
    </div>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Switch
        label="Simple switch"
      />
      <Switch
        label="Another switch"
        checked={true}
      />
      <Switch
        label="Disabled switch"
        disabled={true}
      />
    </div>
  ),
};

export const LongLabels: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Switch
        label="Enable email notifications for all activity"
        description="You'll receive emails when someone likes, comments, or shares your posts. This helps you stay engaged with your community."
      />
      <Switch
        label="Allow data collection for analytics and improvement purposes"
        description="We'll collect anonymous usage data to help us improve the product. You can opt out at any time in your privacy settings."
      />
    </div>
  ),
};

export const Checked: Story = {
  args: {
    label: 'Enable feature',
    description: 'Turn on this feature to access advanced options',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    description: 'This switch cannot be toggled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked switch',
    description: 'This switch is on but cannot be toggled',
    checked: true,
    disabled: true,
  },
}; 