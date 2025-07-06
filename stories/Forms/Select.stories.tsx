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

// Light mode wrapper that overrides dark mode CSS
const LightWrapper = ({ children }: { children: React.ReactNode }) => (
  <div 
    style={{ 
      colorScheme: 'light',
      backgroundColor: 'white',
      color: 'black',
      padding: '16px',
      borderRadius: '8px'
    }}
    className="light-mode-override"
  >
    <style>
      {`
        .light-mode-override .vromm-input,
        .light-mode-override .vromm-textarea,
        .light-mode-override .vromm-select,
        .light-mode-override .vromm-search-input {
          background-color: #ffffff !important;
          color: #395857 !important;
          border-color: #d1d5db !important;
        }
        .light-mode-override .vromm-input::placeholder,
        .light-mode-override .vromm-textarea::placeholder,
        .light-mode-override .vromm-select::placeholder,
        .light-mode-override .vromm-search-input::placeholder {
          color: #6b7280 !important;
        }
        .light-mode-override .vromm-form-label {
          color: #072f2d !important;
        }
        .light-mode-override .vromm-form-helper--normal {
          color: #6b7280 !important;
        }
      `}
    </style>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <LightWrapper>
      <Select
        label="Country"
        placeholder="Select a country"
        helperText="Choose your country of residence"
      >
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
        <option value="jp">Japan</option>
        <option value="au">Australia</option>
      </Select>
    </LightWrapper>
  ),
};

export const Variants: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-96 space-y-6">
        <Select
          label="Default variant"
          placeholder="Select option"
          variant="default"
          helperText="This is the default variant"
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        
        <Select
          label="Filled variant"
          placeholder="Select option"
          variant="filled"
          helperText="This is the filled variant"
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        
        <Select
          label="Outline variant"
          placeholder="Select option"
          variant="outline"
          helperText="This is the outline variant"
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </div>
    </LightWrapper>
  ),
};

export const Sizes: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-96 space-y-6">
        <Select
          label="Small size"
          placeholder="Select option"
          size="sm"
          helperText="Small select size"
        >
          <option value="">Select an option</option>
          <option value="small1">Small Option 1</option>
          <option value="small2">Small Option 2</option>
        </Select>
        
        <Select
          label="Medium size"
          placeholder="Select option"
          size="md"
          helperText="Medium select size (default)"
        >
          <option value="">Select an option</option>
          <option value="medium1">Medium Option 1</option>
          <option value="medium2">Medium Option 2</option>
        </Select>
        
        <Select
          label="Large size"
          placeholder="Select option"
          size="lg"
          helperText="Large select size"
        >
          <option value="">Select an option</option>
          <option value="large1">Large Option 1</option>
          <option value="large2">Large Option 2</option>
        </Select>
      </div>
    </LightWrapper>
  ),
};

export const States: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-96 space-y-6">
        <Select
          label="Normal state"
          placeholder="Select option"
          helperText="This is a normal select"
        >
          <option value="">Select an option</option>
          <option value="normal1">Normal Option 1</option>
          <option value="normal2">Normal Option 2</option>
        </Select>
        
        <Select
          label="Error state"
          placeholder="Select option"
          error={true}
          helperText="Please select an option"
        >
          <option value="">Select an option</option>
          <option value="error1">Error Option 1</option>
          <option value="error2">Error Option 2</option>
        </Select>
        
        <Select
          label="Disabled state"
          placeholder="Select option"
          disabled={true}
          helperText="This select is disabled"
        >
          <option value="">Select an option</option>
          <option value="disabled1">Disabled Option 1</option>
          <option value="disabled2">Disabled Option 2</option>
        </Select>
        
        <Select
          label="Disabled with value"
          disabled={true}
          value="disabled1"
          helperText="This select is disabled with a value"
        >
          <option value="">Select an option</option>
          <option value="disabled1">Disabled Option 1</option>
          <option value="disabled2">Disabled Option 2</option>
        </Select>
      </div>
    </LightWrapper>
  ),
};

export const WithOptions: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-96 space-y-6">
        <Select
          label="Timezone"
          placeholder="Select your timezone"
          helperText="Choose your local timezone"
        >
          <option value="">Select timezone</option>
          <optgroup label="Americas">
            <option value="america/new_york">Eastern Time (UTC-5)</option>
            <option value="america/chicago">Central Time (UTC-6)</option>
            <option value="america/denver">Mountain Time (UTC-7)</option>
            <option value="america/los_angeles">Pacific Time (UTC-8)</option>
          </optgroup>
          <optgroup label="Europe">
            <option value="europe/london">GMT (UTC+0)</option>
            <option value="europe/paris">CET (UTC+1)</option>
            <option value="europe/berlin">CET (UTC+1)</option>
          </optgroup>
          <optgroup label="Asia">
            <option value="asia/tokyo">JST (UTC+9)</option>
            <option value="asia/shanghai">CST (UTC+8)</option>
            <option value="asia/kolkata">IST (UTC+5:30)</option>
          </optgroup>
        </Select>
        
        <Select
          label="Priority Level"
          placeholder="Select priority"
          helperText="Choose the priority level"
        >
          <option value="">Select priority</option>
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🟠 High Priority</option>
          <option value="urgent">🔴 Urgent</option>
        </Select>
      </div>
    </LightWrapper>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <LightWrapper>
      <Select
        label="Required field"
        placeholder="Please select an option"
        error={true}
        helperText="This field is required"
      >
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </LightWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <LightWrapper>
      <Select
        label="Disabled select"
        placeholder="This select is disabled"
        disabled={true}
        helperText="This select cannot be modified"
      >
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    </LightWrapper>
  ),
};

export const WithValue: Story = {
  render: () => (
    <LightWrapper>
      <Select
        label="Pre-selected option"
        value="option2"
        helperText="Select with a pre-selected value"
      >
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2 (Selected)</option>
        <option value="option3">Option 3</option>
      </Select>
    </LightWrapper>
  ),
};

// Dark Mode Preview (will work with dark mode toggle)
export const DarkModePreview: Story = {
  render: () => (
    <div className="p-6 bg-neutral-900 text-white rounded-lg">
      <div className="w-96 space-y-6">
        <h3 className="text-lg font-semibold text-white mb-4">Dark Mode Select Components</h3>
        
        <Select
          label="Default select"
          placeholder="Select option"
          variant="default"
          helperText="Components automatically adapt to dark contexts"
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        
        <Select
          label="Filled select"
          placeholder="Select option"
          variant="filled"
          helperText="Filled variant in dark mode"
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        
        <Select
          label="Outline select"
          placeholder="Select option"
          variant="outline"
          helperText="Outline variant in dark mode"
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        
        <Select
          label="Error state"
          placeholder="Select option"
          error={true}
          helperText="Error state in dark mode"
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Select>
        
        <div className="text-sm text-neutral-300 mt-4">
          Components automatically adapt to system dark mode preference
        </div>
      </div>
    </div>
  ),
}; 