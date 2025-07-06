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
      <Input
        label="Email address"
        placeholder="Enter your email"
        helperText="We'll never share your email with anyone else."
      />
    </LightWrapper>
  ),
};

export const Variants: Story = {
  render: () => (
    <LightWrapper>
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
    </LightWrapper>
  ),
};

export const Sizes: Story = {
  render: () => (
    <LightWrapper>
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
    </LightWrapper>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <LightWrapper>
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
    </LightWrapper>
  ),
};

export const States: Story = {
  render: () => (
    <LightWrapper>
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
    </LightWrapper>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <LightWrapper>
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
    </LightWrapper>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <LightWrapper>
      <Input
        label="Email address"
        placeholder="Enter your email"
        error={true}
        helperText="Please enter a valid email address"
      />
    </LightWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <LightWrapper>
      <Input
        label="Disabled input"
        placeholder="This input is disabled"
        disabled={true}
        helperText="This input cannot be modified"
      />
    </LightWrapper>
  ),
};

export const WithValue: Story = {
  render: () => (
    <LightWrapper>
      <Input
        label="Pre-filled input"
        value="john@example.com"
        helperText="Input with a pre-filled value"
      />
    </LightWrapper>
  ),
};

// Dark Mode Preview (will work with dark mode toggle)
export const DarkModePreview: Story = {
  render: () => (
    <div className="p-6 bg-neutral-900 text-white rounded-lg">
      <div className="w-96 space-y-6">
        <h3 className="text-lg font-semibold text-white mb-4">Dark Mode Input Components</h3>
        
        <Input
          label="Default input"
          placeholder="Enter text"
          variant="default"
          helperText="Components automatically adapt to dark contexts"
        />
        
        <Input
          label="Filled input"
          placeholder="Enter text"
          variant="filled"
          helperText="Filled variant in dark mode"
        />
        
        <Input
          label="Outline input"
          placeholder="Enter text"
          variant="outline"
          helperText="Outline variant in dark mode"
        />
        
        <Input
          label="With icons"
          placeholder="Search..."
          leftIcon={<QuickIcon name="search" />}
          rightIcon={<QuickIcon name="user" />}
          helperText="Input with icons in dark mode"
        />
        
        <Input
          label="Error state"
          placeholder="Enter text"
          error={true}
          helperText="Error state in dark mode"
        />
        
        <div className="text-sm text-neutral-300 mt-4">
          Components automatically adapt to system dark mode preference
        </div>
      </div>
    </div>
  ),
}; 