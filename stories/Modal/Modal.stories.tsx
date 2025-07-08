import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, AlertModal } from '../../src/components/Modal';
import { Button } from '../../src/components/Button';
import { Text, Title } from '../../src/components/Typography';
import { Save, Trash2, Settings, User, MapPin, Heart, Check } from 'lucide-react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal component for displaying content in overlays with different sizes, configurations, and media header support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
      description: 'Modal size',
    },
    mobileBottomSheet: {
      control: 'boolean',
      description: 'Enable mobile bottom sheet behavior',
    },
    mobileHeight: {
      control: 'text',
      description: 'Height for mobile bottom sheet (e.g., "60vh", "70vh")',
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
    media: {
      control: 'object',
      description: 'Media items for header carousel',
    },
    showSaveButton: {
      control: 'boolean',
      description: 'Show save button in media header',
    },
    showDrivenButton: {
      control: 'boolean',
      description: 'Show driven button in media header',
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
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'] as const;

    const getSizeDescription = (size: string) => {
      switch (size) {
        case 'sm': return '320px - Perfect for simple confirmations and alerts';
        case 'md': return '512px - Great for forms and moderate content';
        case 'lg': return '768px - Ideal for detailed content and complex forms';
        case 'xl': return '1024px - Excellent for tables and multi-column layouts';
        case '2xl': return '1152px - Very large content areas';
        case '3xl': return '1280px - Huge modals for complex interfaces';
        case '4xl': return '1440px - Maximum width before full screen';
        case 'full': return '95% viewport - Takes up almost the entire screen';
        default: return '';
      }
    };

    return (
      <LightWrapper>
        <div className="space-y-4">
          <div className="mb-6">
            <Title level={2}>Modal Sizes Comparison</Title>
            <Text variant="weak">
              Click any button below to see the dramatic size differences between modal sizes.
            </Text>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sizes.map((size) => (
              <Button
                key={size}
                onClick={() => setOpenModal(size)}
                variant="secondary"
                className="h-auto py-3 px-4 flex flex-col items-center gap-1"
              >
                <span className="font-semibold">{size.toUpperCase()}</span>
                <span className="text-xs opacity-70">
                  {size === 'sm' ? '320px' : 
                   size === 'md' ? '512px' :
                   size === 'lg' ? '768px' :
                   size === 'xl' ? '1024px' :
                   size === '2xl' ? '1152px' :
                   size === '3xl' ? '1280px' :
                   size === '4xl' ? '1440px' :
                   '95% screen'}
                </span>
              </Button>
            ))}
          </div>

          {sizes.map((size) => (
            <Modal
              key={size}
              isOpen={openModal === size}
              onClose={() => setOpenModal(null)}
              title={`${size.toUpperCase()} Modal`}
              description={getSizeDescription(size)}
              size={size}
            >
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Text className="font-semibold mb-2">Size Details:</Text>
                  <Text>{getSizeDescription(size)}</Text>
                </div>
                
                <Text>
                  This modal demonstrates the "{size}" size. Notice how much {size === 'sm' ? 'compact' : size === 'full' ? 'expansive' : 'larger'} this modal is compared to the others.
                </Text>
                
                {size === 'sm' && (
                  <Text>
                    Small modals are perfect for quick confirmations, simple alerts, or minimal forms. 
                    They don't overwhelm the user and maintain focus on the primary action.
                  </Text>
                )}
                
                {size === 'md' && (
                  <Text>
                    Medium modals strike a good balance for most use cases. They're ideal for forms with 
                    several fields, moderate amounts of content, or when you need more space than small but 
                    don't want to dominate the screen.
                  </Text>
                )}
                
                {(size === 'lg' || size === 'xl') && (
                  <Text>
                    {size === 'lg' ? 'Large' : 'Extra large'} modals provide ample space for detailed content, 
                    complex forms, data tables, or when you need to display multiple sections of information 
                    within the modal.
                  </Text>
                )}
                
                {(size === '2xl' || size === '3xl' || size === '4xl') && (
                  <Text>
                    Very large modals like this one are useful for complex interfaces, detailed workflows, 
                    or when you need to display substantial amounts of information while still maintaining 
                    the modal context.
                  </Text>
                )}
                
                {size === 'full' && (
                  <div className="space-y-3">
                    <Text>
                      Full-size modals take up 95% of the viewport and are perfect for detailed workflows, 
                      complex applications within a modal, or when you need maximum screen real estate.
                    </Text>
                    <Text>
                      They're essentially full-screen experiences while still maintaining the modal context 
                      and overlay behavior. Perfect for editing interfaces, detailed forms, or rich content.
                    </Text>
                  </div>
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
    size: 'md',
    showCloseButton: true,
    closeOnOverlayClick: true,
    mobileBottomSheet: false,
    mobileHeight: '70vh',
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

export const MobileBottomSheet: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    const heights = ['60vh', '70vh', '80vh'] as const;

    return (
      <LightWrapper>
        <div className="space-y-6">
          <div>
            <Title level={2}>📱 Mobile Bottom Sheet</Title>
            <Text variant="weak">
              These modals automatically become bottom sheets on mobile and regular modals on desktop. 
              Try resizing your browser or viewing on mobile!
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {heights.map((height) => (
              <Button
                key={height}
                onClick={() => setOpenModal(height)}
                variant="secondary"
                className="h-auto py-4 px-6 flex flex-col items-center gap-2"
              >
                <span className="font-semibold">Open {height} Modal</span>
                <span className="text-xs opacity-70">
                  Mobile: {height} bottom sheet | Desktop: Regular modal
                </span>
              </Button>
            ))}
          </div>

          {heights.map((height) => (
            <Modal
              key={height}
              isOpen={openModal === height}
              onClose={() => setOpenModal(null)}
              title={`${height} Bottom Sheet`}
              description={`Mobile: ${height} bottom sheet | Desktop: Regular modal`}
              mobileBottomSheet={true}
              mobileHeight={height}
            >
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Text className="font-semibold mb-2">Responsive Behavior:</Text>
                  <Text>
                    This modal adapts its behavior based on screen size. On mobile devices, 
                    it appears as a bottom sheet with {height} height. On desktop, it appears 
                    as a regular centered modal.
                  </Text>
                </div>

                <Text>
                  Try resizing your browser window or viewing this on different devices to see 
                  the responsive behavior in action!
                </Text>

                <div className="space-y-3">
                  <Text>Here's some scrollable content to demonstrate the inner scroll behavior:</Text>
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="p-3 bg-white dark:bg-gray-700 rounded border">
                      <Text className="font-medium">Content Block {i + 1}</Text>
                      <Text size="sm" variant="weak">
                        This is sample content to show how the modal handles scrolling when content 
                        exceeds the available height.
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </Modal>
          ))}
        </div>
      </LightWrapper>
    );
  },
};

export const StackedModals: Story = {
  render: () => {
    const [firstModal, setFirstModal] = useState(false);
    const [secondModal, setSecondModal] = useState(false);
    const [thirdModal, setThirdModal] = useState(false);

    return (
      <div>
        <Button onClick={() => setFirstModal(true)} variant="primary">
          Open First Modal (Z-Index Demo)
        </Button>

        {/* First Modal - Base z-index (9100) */}
        <Modal
          isOpen={firstModal}
          onClose={() => setFirstModal(false)}
          title="First Modal (z-index: 9100)"
          mobileBottomSheet={true}
          mobileHeight="60vh"
        >
          <div>
            <p>This is the first modal with automatic z-index: 9100</p>
            <p>It will appear above headers, navigation, and most app content.</p>
            <Button onClick={() => setSecondModal(true)} variant="secondary">
              Open Second Modal
            </Button>
          </div>
        </Modal>

        {/* Second Modal - Stacked z-index (9200) */}
        <Modal
          isOpen={secondModal}
          onClose={() => setSecondModal(false)}
          title="Second Modal (z-index: 9200)"
          size="lg"
          mobileBottomSheet={true}
          mobileHeight="70vh"
        >
          <div>
            <p>This is the second modal with automatic z-index: 9200</p>
            <p>It automatically appears above the first modal.</p>
            <div style={{ marginTop: '1rem' }}>
              <Button onClick={() => setThirdModal(true)} variant="primary">
                Open Third Modal
              </Button>
              <Button 
                onClick={() => setSecondModal(false)} 
                variant="secondary" 
                style={{ marginLeft: '0.5rem' }}
              >
                Close This Modal
              </Button>
            </div>
          </div>
        </Modal>

        {/* Third Modal - Higher stacked z-index (9300) */}
        <Modal
          isOpen={thirdModal}
          onClose={() => setThirdModal(false)}
          title="Third Modal (z-index: 9300)"
          size="sm"
          mobileBottomSheet={true}
          mobileHeight="50vh"
        >
          <div>
            <p>This is the third modal with automatic z-index: 9300</p>
            <p>Z-index stacking is handled automatically by the design system!</p>
            <div style={{ marginTop: '1rem' }}>
              <Button onClick={() => setThirdModal(false)} variant="primary">
                Close This Modal
              </Button>
              <Button 
                onClick={() => {
                  setThirdModal(false);
                  setSecondModal(false);
                  setFirstModal(false);
                }} 
                variant="destructive"
                style={{ marginLeft: '0.5rem' }}
              >
                Close All Modals
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

export const BackdropClickDemo: Story = {
  render: () => {
    const [modalWithBackdrop, setModalWithBackdrop] = useState(false);
    const [modalWithoutBackdrop, setModalWithoutBackdrop] = useState(false);

    return (
      <LightWrapper>
        <div className="space-y-6">
          <div>
            <Title level={2}>🎯 Backdrop Click Behavior</Title>
            <Text variant="weak">
              Demonstration of backdrop click functionality - click outside the modal content to close.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={() => setModalWithBackdrop(true)} variant="primary">
              Modal WITH Backdrop Close
            </Button>
            <Button onClick={() => setModalWithoutBackdrop(true)} variant="secondary">
              Modal WITHOUT Backdrop Close
            </Button>
          </div>

          {/* Modal with backdrop close */}
          <Modal
            isOpen={modalWithBackdrop}
            onClose={() => setModalWithBackdrop(false)}
            title="Backdrop Close Enabled"
            description="Click outside this modal to close it"
            closeOnOverlayClick={true}
            mobileBottomSheet={true}
          >
            <div className="space-y-4">
              <Text>
                This modal has backdrop click enabled (the default behavior). Try clicking outside 
                the modal content area - anywhere on the dark overlay - and the modal will close.
              </Text>
              <Text>
                This is great for non-critical modals where users might want to quickly dismiss 
                the modal without looking for a close button.
              </Text>
            </div>
          </Modal>

          {/* Modal without backdrop close */}
          <Modal
            isOpen={modalWithoutBackdrop}
            onClose={() => setModalWithoutBackdrop(false)}
            title="Backdrop Close Disabled"
            description="You must use the buttons to close this modal"
            closeOnOverlayClick={false}
            mobileBottomSheet={true}
            footer={
              <div className="flex gap-3 justify-end">
                <Button variant="secondary" onClick={() => setModalWithoutBackdrop(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setModalWithoutBackdrop(false)}>
                  Confirm Action
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <Text>
                This modal has backdrop click disabled. Try clicking outside the modal content - 
                nothing will happen! You must use the X button or the footer buttons to close it.
              </Text>
              <Text>
                This is useful for important confirmations, forms with unsaved data, or any situation 
                where accidental dismissal could be problematic.
              </Text>
            </div>
          </Modal>
        </div>
      </LightWrapper>
    );
  },
}; 

export const MediaHeader: Story = {
  render: () => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isDriven, setIsDriven] = useState(false);

    const singleImage = {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      alt: 'Beautiful mountain landscape',
      type: 'photo' as const
    };

    const singleVideo = {
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      alt: 'Sample video',
      type: 'video' as const,
      poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=400&fit=crop',
      duration: '2:30'
    };

    const carouselMedia = [
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
        alt: 'Mountain landscape view 1',
        type: 'photo' as const
      },
      {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
        alt: 'Forest path',
        type: 'photo' as const
      },
      {
        src: 'https://www.w3schools.com/html/mov_bbb.mp4',
        alt: 'Adventure video',
        type: 'video' as const,
        poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=400&fit=crop',
        duration: '2:30'
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
        alt: 'Map view',
        type: 'map' as const
      }
    ];

    return (
      <LightWrapper>
        <div className="space-y-4">
          <div className="mb-6">
            <Title level={2}>Modal with Media Header</Title>
            <Text variant="weak">
              Similar to the Card component, modals can now display images, videos, and maps in the header area.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => setIsImageModalOpen(true)} variant="secondary">
              Modal with Single Image
            </Button>
            <Button onClick={() => setIsVideoModalOpen(true)} variant="secondary">
              Modal with Video
            </Button>
            <Button onClick={() => setIsCarouselModalOpen(true)} variant="secondary">
              Modal with Media Carousel
            </Button>
          </div>

          {/* Single Image Modal */}
          <Modal
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
            size="lg"
            media={singleImage}
            showSaveButton
            showDrivenButton
            isSaved={isSaved}
            isDriven={isDriven}
            onSave={() => setIsSaved(!isSaved)}
            onMarkAsDriven={() => setIsDriven(!isDriven)}
          >
            <div className="space-y-4">
              <div>
                <Title level={3}>Mountain Adventure Route</Title>
                <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Rocky Mountain National Park, Colorado</span>
                </div>
              </div>
              
              <Text>
                Experience breathtaking views on this challenging mountain route. The trail offers 
                stunning vistas of snow-capped peaks and pristine alpine lakes.
              </Text>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Text className="font-semibold">Difficulty</Text>
                  <Text size="sm" variant="weak">Advanced</Text>
                </div>
                <div>
                  <Text className="font-semibold">Duration</Text>
                  <Text size="sm" variant="weak">6-8 hours</Text>
                </div>
                <div>
                  <Text className="font-semibold">Distance</Text>
                  <Text size="sm" variant="weak">12.5 miles</Text>
                </div>
                <div>
                  <Text className="font-semibold">Elevation</Text>
                  <Text size="sm" variant="weak">+2,400 ft</Text>
                </div>
              </div>
            </div>
          </Modal>

          {/* Video Modal */}
          <Modal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            size="lg"
            media={singleVideo}
            carouselOptions={{
              videoControls: {
                muted: false,
                showDuration: true
              }
            }}
            onVideoPlay={(index, media) => console.log('Video started playing:', media)}
            onVideoPause={(index, media) => console.log('Video paused:', media)}
          >
            <div className="space-y-4">
              <div>
                <Title level={3}>Adventure Highlights</Title>
                <Text variant="weak">Watch the most exciting moments from recent adventures</Text>
              </div>
              
              <Text>
                This video showcases some of the most spectacular moments captured during our recent 
                mountain expeditions. From sunrise views to challenging terrain, see what awaits you.
              </Text>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Share Video</Button>
                <Button size="sm" variant="outline">Download</Button>
              </div>
            </div>
          </Modal>

          {/* Carousel Modal */}
          <Modal
            isOpen={isCarouselModalOpen}
            onClose={() => setIsCarouselModalOpen(false)}
            size="xl"
            media={carouselMedia}
            showSaveButton
            isSaved={isSaved}
            onSave={() => setIsSaved(!isSaved)}
            onMediaChange={(index, media) => console.log('Media changed to:', index, media)}
            carouselOptions={{
              showDots: true,
              showArrows: true,
              loop: true,
              enableSwipe: true
            }}
          >
            <div className="space-y-6">
              <div>
                <Title level={3}>Epic Mountain Journey</Title>
                <Text variant="weak">A complete visual guide to this incredible route</Text>
              </div>
              
              <Text>
                Navigate through our comprehensive media collection featuring photos, videos, and maps 
                of this spectacular mountain route. Use the arrows or swipe to explore different views.
              </Text>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Title level={4} size="sm">Route Details</Title>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Distance:</span>
                      <span className="text-sm font-medium">15.2 miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Max Elevation:</span>
                      <span className="text-sm font-medium">8,400 ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Estimated Time:</span>
                      <span className="text-sm font-medium">8-10 hours</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Title level={4} size="sm">What to Expect</Title>
                  <ul className="text-sm space-y-1">
                    <li>• Stunning alpine lake views</li>
                    <li>• Wildlife spotting opportunities</li>
                    <li>• Technical rock scrambling sections</li>
                    <li>• 360° summit panoramas</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t">
                <Button icon={Heart} variant="outline">
                  {isSaved ? 'Saved' : 'Save Route'}
                </Button>
                <Button icon={Check} variant="outline">
                  Mark as Completed
                </Button>
                <Button variant="primary">
                  Start Navigation
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </LightWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modals can now display media content in the header area, similar to the Card component. Supports single images, videos, and media carousels with navigation controls.'
      }
    }
  }
}; 

// Media Header with Interactive Buttons (Save & Mark as Driven)
export const MediaHeaderWithActions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isDriven, setIsDriven] = useState(false);

    const mediaItems = [
      {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        alt: "Beautiful mountain landscape with lake",
        type: "photo" as const
      },
      {
        src: "https://images.unsplash.com/photo-1500622944204-b135684e99fd?w=800&h=600&fit=crop", 
        alt: "Scenic forest road",
        type: "photo" as const
      },
      {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
        alt: "Coastal cliffs and ocean",
        type: "photo" as const
      }
    ];

    return (
      <div className="flex gap-4">
        <Button onClick={() => setIsOpen(true)} variant="default">
          Open Modal with Actions
        </Button>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          mediaItems={mediaItems}
          showSaveButton={true}
          showDrivenButton={true}
          isSaved={isSaved}
          isDriven={isDriven}
          onSave={() => {
            setIsSaved(!isSaved);
            console.log('Save toggled:', !isSaved);
          }}
          onMarkAsDriven={() => {
            setIsDriven(!isDriven);
            console.log('Driven toggled:', !isDriven);
          }}
          carouselOptions={{
            showDots: true,
            showArrows: true,
            loop: true
          }}
        >
          <Title level={2}>Scenic Mountain Route</Title>
          <Text className="mt-4">
            This beautiful mountain route offers stunning views and exciting driving experiences. 
            Perfect for a weekend adventure with spectacular photo opportunities along the way.
          </Text>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <Text className="text-sm text-gray-600">Distance</Text>
                <Text className="font-semibold">127 km</Text>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <Text className="text-sm text-gray-600">Duration</Text>
                <Text className="font-semibold">3.5 hours</Text>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <Text className="text-sm text-gray-600">Difficulty</Text>
                <Text className="font-semibold">Moderate</Text>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <Text className="text-sm text-blue-800">
                💡 <strong>Pro tip:</strong> Best visited during early morning or late afternoon for optimal lighting and fewer crowds.
              </Text>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with media header featuring save and mark as driven buttons - same functionality as Card component! Click the buttons in the media header to toggle saved/driven state.'
      }
    }
  }
}; 

export const MediaHeaderWithComponents: Story = {
  args: {
    isOpen: true,
    title: 'Mixed Media with Components',
    showSaveButton: true,
    showDrivenButton: true,
    media: [
      {
        src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        alt: 'Beautiful landscape',
        type: 'photo'
      },
      {
        component: (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Route Preview</h3>
              <p className="text-sm opacity-90">Custom MapPreview Component</p>
              <div className="mt-4 bg-white/20 rounded-lg p-3">
                <div className="flex items-center justify-between text-xs">
                  <span>Distance: 45 km</span>
                  <span>Duration: 2h 30min</span>
                </div>
              </div>
            </div>
          </div>
        ),
        type: 'component',
        alt: 'Route preview component'
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        alt: 'Mountain view',
        type: 'map'
      }
    ],
    carouselOptions: {
      showDots: true,
      showArrows: true,
      loop: true
    },
    children: (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Mixed Media Carousel</h2>
        <p className="text-gray-600 mb-4">
          This modal demonstrates a carousel that can mix traditional media (images, videos) 
          with custom React components like MapPreview.
        </p>
        <p className="text-sm text-gray-500">
          Navigate through the carousel to see different media types including a custom component.
        </p>
      </div>
    )
  }
}; 