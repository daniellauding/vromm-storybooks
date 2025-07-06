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
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    resize: {
      control: 'select',
      options: ['none', 'both', 'horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof TextArea>;

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
      <TextArea
        label="Description"
        placeholder="Enter your description here..."
        helperText="Please provide a detailed description."
      />
    </LightWrapper>
  ),
};

export const Variants: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-96 space-y-6">
        <TextArea
          label="Default variant"
          placeholder="Enter text"
          variant="default"
          helperText="This is the default variant"
        />
        <TextArea
          label="Filled variant"
          placeholder="Enter text"
          variant="filled"
          helperText="This is the filled variant"
        />
        <TextArea
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
        <TextArea
          label="Small size"
          placeholder="Enter text"
          size="sm"
          helperText="Small textarea size"
        />
        <TextArea
          label="Medium size"
          placeholder="Enter text"
          size="md"
          helperText="Medium textarea size (default)"
        />
        <TextArea
          label="Large size"
          placeholder="Enter text"
          size="lg"
          helperText="Large textarea size"
        />
      </div>
    </LightWrapper>
  ),
};

export const WithRows: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-96 space-y-6">
        <TextArea
          label="2 rows"
          placeholder="Short textarea"
          rows={2}
          helperText="Textarea with 2 rows"
        />
        <TextArea
          label="4 rows"
          placeholder="Medium textarea"
          rows={4}
          helperText="Textarea with 4 rows (default)"
        />
        <TextArea
          label="8 rows"
          placeholder="Large textarea"
          rows={8}
          helperText="Textarea with 8 rows"
        />
      </div>
    </LightWrapper>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-96 space-y-6">
        <TextArea
          label="No resize"
          placeholder="This textarea cannot be resized"
          resize="none"
          helperText="Resize is disabled"
        />
        <TextArea
          label="Vertical resize"
          placeholder="This textarea can be resized vertically"
          resize="vertical"
          helperText="Can resize vertically only"
        />
        <TextArea
          label="Horizontal resize"
          placeholder="This textarea can be resized horizontally"
          resize="horizontal"
          helperText="Can resize horizontally only"
        />
        <TextArea
          label="Both directions"
          placeholder="This textarea can be resized in both directions"
          resize="both"
          helperText="Can resize in both directions"
        />
      </div>
    </LightWrapper>
  ),
};

export const States: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-96 space-y-6">
        <TextArea
          label="Normal state"
          placeholder="Enter your message"
          helperText="This is a normal textarea"
        />
        <TextArea
          label="Error state"
          placeholder="Enter your message"
          error={true}
          helperText="This field is required"
        />
        <TextArea
          label="Disabled state"
          placeholder="This textarea is disabled"
          disabled={true}
          helperText="This textarea is disabled"
        />
        <TextArea
          label="Disabled with value"
          disabled={true}
          value="This is a disabled textarea with content"
          helperText="This textarea is disabled with a value"
        />
      </div>
    </LightWrapper>
  ),
};

export const CharacterCount: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-96 space-y-6">
        <TextArea
          label="Bio"
          placeholder="Tell us about yourself..."
          maxLength={150}
          helperText="Maximum 150 characters"
        />
        <TextArea
          label="Comment"
          placeholder="Leave a comment..."
          maxLength={500}
          rows={6}
          helperText="Maximum 500 characters"
        />
      </div>
    </LightWrapper>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <LightWrapper>
      <TextArea
        label="Required field"
        placeholder="This field is required"
        error={true}
        helperText="Please enter a valid message"
      />
    </LightWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <LightWrapper>
      <TextArea
        label="Disabled textarea"
        placeholder="This textarea is disabled"
        disabled={true}
        helperText="This textarea cannot be modified"
      />
    </LightWrapper>
  ),
};

export const WithValue: Story = {
  render: () => (
    <LightWrapper>
      <TextArea
        label="Pre-filled textarea"
        value="This is a pre-filled textarea with some content that demonstrates how the component looks with text."
        helperText="Textarea with pre-filled content"
      />
    </LightWrapper>
  ),
};

export const LongContent: Story = {
  render: () => (
    <LightWrapper>
      <TextArea
        label="Article content"
        value={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`}
        rows={8}
        helperText="Example with longer content"
      />
    </LightWrapper>
  ),
};

// Dark Mode Preview (will work with dark mode toggle)
export const DarkModePreview: Story = {
  render: () => (
    <div className="p-6 bg-neutral-900 text-white rounded-lg">
      <div className="w-96 space-y-6">
        <h3 className="text-lg font-semibold text-white mb-4">Dark Mode TextArea Components</h3>
        
        <TextArea
          label="Default textarea"
          placeholder="Enter text"
          variant="default"
          helperText="Components automatically adapt to dark contexts"
        />
        
        <TextArea
          label="Filled textarea"
          placeholder="Enter text"
          variant="filled"
          helperText="Filled variant in dark mode"
        />
        
        <TextArea
          label="Outline textarea"
          placeholder="Enter text"
          variant="outline"
          helperText="Outline variant in dark mode"
        />
        
        <TextArea
          label="Error state"
          placeholder="Enter text"
          error={true}
          helperText="Error state in dark mode"
        />
        
        <TextArea
          label="With content"
          value="This textarea has some content to show how text appears in dark mode."
          helperText="TextArea with content in dark mode"
        />
        
        <div className="text-sm text-neutral-300 mt-4">
          Components automatically adapt to system dark mode preference
        </div>
      </div>
    </div>
  ),
}; 