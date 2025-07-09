import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../../src/components/Header/Header';
import { 
  Bell, 
  MessageCircle, 
  Settings, 
  LogOut, 
  User, 
  Shield,
  BookOpen,
  Grid2X2,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible header component with brand logo, navigation, notifications, and user menu functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['app', 'website'],
      description: 'Header variant style',
    },
    background: {
      control: 'select',
      options: ['white', 'transparent', 'blur', 'dark'],
      description: 'Background style',
    },
    position: {
      control: 'select',
      options: ['static', 'sticky'],
      description: 'Position behavior',
    },
    border: {
      control: 'boolean',
      description: 'Show bottom border',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Mock data for stories
const mockNotifications = [
  {
    id: '1',
    title: 'System Update',
    message: 'New features are now available',
    time: '5m ago',
    read: false,
    type: 'info' as const,
  },
  {
    id: '2',
    title: 'Training Complete',
    message: 'Learning Path: 100% complete',
    time: '1h ago',
    read: false,
    type: 'success' as const,
  },
  {
    id: '3',
    title: 'Maintenance Scheduled',
    message: 'System maintenance tonight at 11 PM',
    time: '2h ago',
    read: true,
    type: 'warning' as const,
  },
];

const mockMessages = [
  {
    id: '1',
    sender: 'John Doe',
    message: 'Hey, can we discuss the project?',
    time: '10m ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: '2',
    sender: 'Sarah Wilson',
    message: 'The report is ready for review',
    time: '1h ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: '3',
    sender: 'Team Chat',
    message: 'New message in #general',
    time: '2h ago',
    read: true,
  },
];

const mockNavItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    id: 'learning',
    label: 'Learning',
    href: '/learning',
    dropdown: [
      { label: 'Courses', href: '/courses' },
      { label: 'Assessments', href: '/assessments' },
      { label: 'Certificates', href: '/certificates' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '/reports',
    badge: 'New',
  },
];

const mockUserMenu = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Security', href: '/security', icon: Shield },
  { type: 'divider' as const },
  { label: 'Sign Out', onClick: () => alert('Signed out'), icon: LogOut },
];

// App Header (default with VROMM branding)
export const AppHeader: Story = {
  args: {
    variant: 'app',
    background: 'white',
    position: 'sticky',
    border: true,
    // Using default VROMM logo - no need to specify
    navigation: mockNavItems,
    notifications: mockNotifications,
    messages: mockMessages,
    userMenu: mockUserMenu,
    user: {
      name: 'Daniel Lauding',
      email: 'daniel@vromm.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    },
    actions: [
      {
        icon: BookOpen,
        label: 'Learning Paths',
        onClick: () => alert('Learning Paths'),
        badge: '100%',
        badgeVariant: 'success',
      },
      {
        icon: Grid2X2,
        label: 'Grid View',
        onClick: () => alert('Grid View'),
      },
    ],
  },
};

// Simple App Header
export const SimpleAppHeader: Story = {
  args: {
    variant: 'app',
    background: 'white',
    position: 'sticky',
    border: true,
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    userMenu: mockUserMenu,
  },
};

// Website Header
export const WebsiteHeader: Story = {
  args: {
    variant: 'website',
    background: 'white',
    position: 'sticky',
    border: true,
    logo: {
      src: '/logo_vromm.svg',
      alt: 'VROMM',
      href: '/',
    },
    navigation: [
      { id: 'features', label: 'Features', href: '/features' },
      { id: 'pricing', label: 'Pricing', href: '/pricing' },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ],
    actions: [
      {
        label: 'Sign In',
        href: '/login',
        variant: 'tertiary',
      },
      {
        label: 'Get Started',
        href: '/signup',
        variant: 'primary',
      },
    ],
  },
};

// Transparent Header
export const TransparentHeader: Story = {
  args: {
    variant: 'website',
    background: 'transparent',
    position: 'sticky',
    border: false,
    navigation: [
      { id: 'features', label: 'Features', href: '/features' },
      { id: 'pricing', label: 'Pricing', href: '/pricing' },
      { id: 'about', label: 'About', href: '/about' },
    ],
    actions: [
      {
        label: 'Sign In',
        href: '/login',
        variant: 'tertiary',
      },
      {
        label: 'Get Started',
        href: '/signup',
        variant: 'primary',
      },
    ],
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Dark Header
export const DarkHeader: Story = {
  args: {
    variant: 'app',
    background: 'dark',
    position: 'sticky',
    border: true,
    navigation: mockNavItems,
    notifications: mockNotifications,
    messages: mockMessages,
    userMenu: mockUserMenu,
    user: {
      name: 'Daniel Lauding',
      email: 'daniel@vromm.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    },
    actions: [
      {
        icon: BookOpen,
        label: 'Learning Paths',
        onClick: () => alert('Learning Paths'),
        badge: '100%',
        badgeVariant: 'success',
      },
      {
        icon: Grid2X2,
        label: 'Grid View',
        onClick: () => alert('Grid View'),
      },
    ],
  },
};

// Notifications Only
export const NotificationsOnly: Story = {
  args: {
    variant: 'app',
    background: 'white',
    position: 'sticky',
    border: true,
    notifications: mockNotifications,
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    userMenu: mockUserMenu,
  },
};

// Messages Only  
export const MessagesOnly: Story = {
  args: {
    variant: 'app',
    background: 'white',
    position: 'sticky', 
    border: true,
    messages: mockMessages,
    user: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
    },
    userMenu: mockUserMenu,
  },
};

// Mobile Responsive
export const MobileResponsive: Story = {
  args: {
    variant: 'app',
    background: 'white',
    position: 'sticky',
    border: true,
    navigation: mockNavItems,
    notifications: mockNotifications,
    messages: mockMessages,
    userMenu: mockUserMenu,
    user: {
      name: 'Daniel Lauding',
      email: 'daniel@vromm.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    },
    actions: [
      {
        icon: BookOpen,
        label: 'Learning Paths',
        onClick: () => alert('Learning Paths'),
        badge: '100%',
        badgeVariant: 'success',
      },
      {
        icon: Grid2X2,
        label: 'Grid View',
        onClick: () => alert('Grid View'),
      },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}; 