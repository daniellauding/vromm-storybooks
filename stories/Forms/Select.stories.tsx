import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../../src/components/Forms/Select';

const meta = {
  title: 'Components/Forms/Select',
  component: Select,
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
];

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    helperText: 'Please select your country of residence.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Select
        label="Default variant"
        placeholder="Select option"
        variant="default"
        options={countryOptions}
        helperText="This is the default variant"
      />
      <Select
        label="Filled variant"
        placeholder="Select option"
        variant="filled"
        options={countryOptions}
        helperText="This is the filled variant"
      />
      <Select
        label="Outline variant"
        placeholder="Select option"
        variant="outline"
        options={countryOptions}
        helperText="This is the outline variant"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Select
        label="Small size"
        placeholder="Select option"
        size="sm"
        options={countryOptions}
        helperText="Small select size"
      />
      <Select
        label="Medium size"
        placeholder="Select option"
        size="md"
        options={countryOptions}
        helperText="Medium select size (default)"
      />
      <Select
        label="Large size"
        placeholder="Select option"
        size="lg"
        options={countryOptions}
        helperText="Large select size"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Select
        label="Normal state"
        placeholder="Select option"
        options={countryOptions}
        helperText="This is a normal select"
      />
      <Select
        label="Error state"
        placeholder="Select option"
        options={countryOptions}
        error={true}
        helperText="This field is required"
      />
      <Select
        label="Disabled state"
        placeholder="Select option"
        options={countryOptions}
        disabled={true}
        helperText="This select is disabled"
      />
      <Select
        label="Disabled with value"
        placeholder="Select option"
        options={countryOptions}
        disabled={true}
        value="us"
        helperText="This select is disabled with a value"
      />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Select
        label="Pre-selected value"
        placeholder="Select option"
        options={countryOptions}
        value="ca"
        helperText="This select has a pre-selected value"
      />
      <Select
        label="Different pre-selected value"
        placeholder="Select option"
        options={countryOptions}
        value="uk"
        helperText="This select has a different pre-selected value"
      />
    </div>
  ),
};

export const DifferentOptions: Story = {
  render: () => {
    const priorityOptions = [
      { value: 'low', label: 'Low Priority' },
      { value: 'medium', label: 'Medium Priority' },
      { value: 'high', label: 'High Priority' },
      { value: 'urgent', label: 'Urgent' },
    ];

    const statusOptions = [
      { value: 'draft', label: 'Draft' },
      { value: 'pending', label: 'Pending Review' },
      { value: 'approved', label: 'Approved' },
      { value: 'published', label: 'Published' },
      { value: 'archived', label: 'Archived' },
    ];

    return (
      <div className="w-96 space-y-6">
        <Select
          label="Priority"
          placeholder="Select priority"
          options={priorityOptions}
          helperText="Choose the priority level"
        />
        <Select
          label="Status"
          placeholder="Select status"
          options={statusOptions}
          helperText="Choose the current status"
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Required field',
    placeholder: 'Please select an option',
    options: countryOptions,
    error: true,
    helperText: 'This field is required and must be selected.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled select',
    placeholder: 'This select is disabled',
    options: countryOptions,
    disabled: true,
    helperText: 'This select cannot be modified',
  },
};

export const WithPreselectedValue: Story = {
  args: {
    label: 'Country selection',
    placeholder: 'Select a country',
    options: countryOptions,
    value: 'us',
    helperText: 'United States is pre-selected',
  },
}; 