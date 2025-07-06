import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, AlertModal } from '../../src/components/Modal';
import { Button } from '../../src/components/Button';
import { Text, Title } from '../../src/components/Typography';
import { Save, Trash2, Settings, User } from 'lucide-react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal component for displaying content in overlays with different sizes and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show close button',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether clicking overlay closes modal',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing escape closes modal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Light mode wrapper that overrides dark mode CSS
const LightWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      '--vromm-modal-bg': '#ffffff',
      '--vromm-modal-text': '#000000',
      '--vromm-modal-border': '#e5e7eb',
      backgroundColor: '#ffffff',
      colorScheme: 'light',
    } as React.CSSProperties}
  >
    <style>
      {`
        .vromm-modal-content {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #e5e7eb !important;
        }
        .vromm-modal-title {
          color: #072f2d !important;
        }
        .vromm-modal-body {
          color: #395857 !important;
        }
        .vromm-modal-footer {
          background-color: #f9fafb !important;
        }
      `}
    </style>
    {children}
  </div>
);

// Modal Wrapper Component for Stories
const ModalWrapper = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LightWrapper>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="space-y-4">
          <Text>
            This is the modal content. You can put any React content here including forms, 
            images, lists, or complex layouts.
          </Text>
          <Text>
            The modal is fully accessible with proper ARIA labels and focus management.
          </Text>
        </div>
      </Modal>
    </LightWrapper>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Default Modal',
    description: 'This is a standard modal with default settings.',
    size: 'md',
    showCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
  },
};

export const Sizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;

    return (
      <LightWrapper>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                onClick={() => setOpenModal(size)}
                variant="secondary"
              >
                Open {size.toUpperCase()} Modal
              </Button>
            ))}
          </div>

          {sizes.map((size) => (
            <Modal
              key={size}
              isOpen={openModal === size}
              onClose={() => setOpenModal(null)}
              title={`${size.toUpperCase()} Modal`}
              description={`This is a ${size} sized modal`}
              size={size}
            >
              <div className="space-y-4">
                <Text>
                  This modal is sized as "{size}". Different sizes are useful for different types of content.
                </Text>
                <Text>
                  Small modals work well for simple confirmations, while larger modals can accommodate 
                  complex forms and detailed content.
                </Text>
                {size === 'full' && (
                  <Text>
                    Full-size modals take up most of the viewport and are perfect for detailed 
                    workflows or when you need maximum screen real estate.
                  </Text>
                )}
              </div>
            </Modal>
          ))}
        </div>
      </LightWrapper>
    );
  },
};

export const WithCustomHeader: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const customHeader = (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
          <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <Title level={3} size="lg">Custom Header</Title>
          <Text size="sm" variant="weak">
            This header has custom styling and icons
          </Text>
        </div>
      </div>
    );

    return (
      <LightWrapper>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal with Custom Header
        </Button>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={customHeader}
          size="md"
        >
          <div className="space-y-4">
            <Text>
              This modal demonstrates a custom header with icons and custom styling.
            </Text>
            <Text>
              You can pass any React content as the header prop to completely customize 
              the modal's appearance.
            </Text>
          </div>
        </Modal>
      </LightWrapper>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
      setIsSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSaving(false);
      setIsOpen(false);
    };

    const footer = (
      <div className="flex gap-3 justify-end">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(false)}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          loading={isSaving}
          icon={Save}
        >
          Save Changes
        </Button>
      </div>
    );

    return (
      <LightWrapper>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal with Footer
        </Button>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal with Footer"
          description="This modal has custom footer actions"
          footer={footer}
          size="md"
        >
          <div className="space-y-4">
            <Text>
              This modal demonstrates custom footer actions with loading states.
            </Text>
            <Text>
              Try clicking "Save Changes" to see the loading state in action.
            </Text>
          </div>
        </Modal>
      </LightWrapper>
    );
  },
};

export const AlertModals: Story = {
  render: () => {
    const [openAlert, setOpenAlert] = useState<string | null>(null);

    return (
      <LightWrapper>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="primary"
              onClick={() => setOpenAlert('info')}
            >
              Info Alert
            </Button>
            <Button
              variant="success"
              onClick={() => setOpenAlert('success')}
            >
              Success Alert
            </Button>
            <Button
              variant="secondary"
              onClick={() => setOpenAlert('warning')}
            >
              Warning Alert
            </Button>
            <Button
              variant="destructive"
              onClick={() => setOpenAlert('destructive')}
            >
              Destructive Alert
            </Button>
          </div>

          <AlertModal
            isOpen={openAlert === 'info'}
            onClose={() => setOpenAlert(null)}
            variant="info"
            title="Information"
            message="This is an informational alert modal. It's used to provide additional context or instructions to users."
            confirmText="Got it"
            showCancel={false}
          />

          <AlertModal
            isOpen={openAlert === 'success'}
            onClose={() => setOpenAlert(null)}
            variant="success"
            title="Success!"
            message="Your action was completed successfully. All changes have been saved."
            confirmText="Continue"
            showCancel={false}
          />

          <AlertModal
            isOpen={openAlert === 'warning'}
            onClose={() => setOpenAlert(null)}
            variant="warning"
            title="Warning"
            message="This action may have unintended consequences. Please review your changes before proceeding."
            confirmText="Proceed anyway"
            cancelText="Review changes"
            onConfirm={() => console.log('User proceeded despite warning')}
          />

          <AlertModal
            isOpen={openAlert === 'destructive'}
            onClose={() => setOpenAlert(null)}
            variant="destructive"
            title="Delete Item"
            message="Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed."
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={() => console.log('Item deleted')}
          />
        </div>
      </LightWrapper>
    );
  },
};

export const Interactive: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Interactive Modal',
    description: 'Use the controls below to experiment with different modal settings.',
    size: 'md',
    showCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
  },
};

// Dark mode demonstration
export const DarkModePreview: Story = {
  render: () => {
    const [isStandardOpen, setIsStandardOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    return (
      <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '8px', minHeight: '400px' }}>
        <div className="space-y-4">
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>🌙 Dark Mode Modals</h3>
          
          <div className="flex gap-4">
            <Button variant="primary" onClick={() => setIsStandardOpen(true)}>
              Open Standard Modal
            </Button>
            <Button variant="destructive" onClick={() => setIsAlertOpen(true)}>
              Open Alert Modal
            </Button>
          </div>

          <Modal
            isOpen={isStandardOpen}
            onClose={() => setIsStandardOpen(false)}
            title="Dark Mode Modal"
            description="This modal automatically adapts to dark mode"
            size="md"
            footer={
              <div className="flex gap-3 justify-end">
                <Button variant="secondary" onClick={() => setIsStandardOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setIsStandardOpen(false)}>
                  Save
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <Text>
                🌙 This modal demonstrates automatic dark mode adaptation with proper background colors, 
                text colors, and border styling.
              </Text>
              <Text>
                The modal header, body, and footer all use CSS variables that automatically 
                switch between light and dark themes based on system preference or manual setting.
              </Text>
              <Text>
                Notice how the close button, borders, and shadows all adapt appropriately 
                to provide excellent contrast and readability in dark mode.
              </Text>
            </div>
          </Modal>

          <AlertModal
            isOpen={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
            variant="destructive"
            title="Dark Mode Alert"
            message="Alert modals also automatically adapt to dark mode with proper color schemes and contrast ratios for accessibility."
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={() => console.log('Item deleted in dark mode')}
          />

          <div style={{ color: 'white', fontSize: '14px', marginTop: '2rem' }}>
            <p><strong>Dark Mode Features:</strong></p>
            <ul style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
              <li>✅ Automatic background color switching</li>
              <li>✅ Proper text contrast ratios</li>
              <li>✅ Adapted border and shadow colors</li>
              <li>✅ Transparent close button styling</li>
              <li>✅ Footer background adaptation</li>
              <li>✅ Works in any React project with CSS import</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
}; 