import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../../src/components/Footer/Footer';
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube } from 'lucide-react';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive footer component with multiple layouts, CTA sections, navigation, and social links.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'extended'],
      description: 'Footer layout variant',
    },
    background: {
      control: 'select',
      options: ['white', 'gray', 'dark', 'primary'],
      description: 'Background color style',
    },
    border: {
      control: 'select',
      options: ['none', 'top', 'shadow'],
      description: 'Border style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

// Default Footer with CTA
export const Default: Story = {
  args: {
    variant: 'default',
    background: 'white',
    border: 'top',
    logo: {
      src: '/logo_vromm@2x.png',
      alt: 'Vromm',
      href: '/',
      height: 40,
    },
    description: 'Making driver education more accessible, structured, and effective through technology.',
    cta: {
      title: 'Ready to start your driving journey?',
      description: 'Join our beta and be among the first to experience a new way of learning to drive.',
      button: {
        label: 'Join Beta',
        variant: 'primary',
        onClick: () => console.log('Join beta clicked'),
      },
      background: 'gradient',
    },
    sections: [
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Sitemap', href: '/sitemap' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Data Deletion', href: '/data-deletion' },
        ],
      },
      {
        title: 'Product',
        links: [
          { label: 'Routes', href: '/routes' },
          { label: 'Features', href: '/features' },
          { label: 'Problem', href: '/problem' },
          { label: 'Mission', href: '/mission' },
          { label: 'FAQ', href: '/faq' },
        ],
      },
      {
        title: 'For',
        links: [
          { label: 'Find Routes', href: '/find-routes' },
          { label: 'Classroom', href: '/classroom' },
          { label: 'Supervisors', href: '/supervisors' },
          { label: 'Future', href: '/future' },
        ],
      },
      {
        title: 'Survey',
        links: [
          { label: 'For Learners', href: '/survey/learners' },
          { label: 'For Schools', href: '/survey/schools' },
        ],
      },
    ],
    social: [
      {
        platform: 'Instagram',
        href: 'https://instagram.com/vromm',
        icon: Instagram,
        label: 'Follow us on Instagram',
      },
      {
        platform: 'LinkedIn',
        href: 'https://linkedin.com/company/vromm',
        icon: Linkedin,
        label: 'Connect on LinkedIn',
      },
      {
        platform: 'Facebook',
        href: 'https://facebook.com/vromm',
        icon: Facebook,
        label: 'Like us on Facebook',
      },
    ],
    languageSelector: {
      current: 'en',
      options: [
        { code: 'en', label: 'EN', onClick: () => console.log('English') },
        { code: 'sv', label: 'SV', onClick: () => console.log('Swedish') },
      ],
    },
    copyright: 'Vromm',
    bottomLinks: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
};

// Minimal Footer
export const Minimal: Story = {
  args: {
    variant: 'minimal',
    background: 'gray',
    border: 'top',
    logo: {
      src: '/logo_vromm@2x.png',
      alt: 'Vromm',
      href: '/',
    },
    description: 'Making driver education more accessible through technology.',
    sections: [
      {
        title: 'Quick Links',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    copyright: 'Vromm',
  },
};

// Dark Footer
export const Dark: Story = {
  args: {
    variant: 'default',
    background: 'dark',
    border: 'none',
    logo: {
      src: '/logo_vromm@2x.png',
      alt: 'Vromm',
      href: '/',
    },
    description: 'Building the future of driver education with innovative technology and data-driven insights.',
    sections: [
      {
        title: 'Platform',
        links: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Routes', href: '/routes' },
          { label: 'Analytics', href: '/analytics' },
          { label: 'API', href: '/api', badge: 'New' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '/docs' },
          { label: 'Help Center', href: '/help' },
          { label: 'Blog', href: '/blog' },
          { label: 'Community', href: '/community' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Careers', href: '/careers', badge: 'Hiring' },
          { label: 'Press Kit', href: '/press' },
          { label: 'Investors', href: '/investors' },
        ],
      },
    ],
    social: [
      {
        platform: 'GitHub',
        href: 'https://github.com/vromm',
        icon: Github,
        label: 'View on GitHub',
      },
      {
        platform: 'Twitter',
        href: 'https://twitter.com/vromm',
        icon: Twitter,
        label: 'Follow on Twitter',
      },
      {
        platform: 'YouTube',
        href: 'https://youtube.com/vromm',
        icon: Youtube,
        label: 'Subscribe on YouTube',
      },
      {
        platform: 'LinkedIn',
        href: 'https://linkedin.com/company/vromm',
        icon: Linkedin,
        label: 'Connect on LinkedIn',
      },
    ],
    copyright: 'Vromm Technologies',
    bottomLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '/security' },
      { label: 'Status', href: 'https://status.vromm.com', external: true },
    ],
  },
};

// With Custom CTA
export const WithCustomCTA: Story = {
  args: {
    variant: 'default',
    background: 'white',
    border: 'shadow',
    cta: {
      title: 'Get early access to Vromm',
      description: 'Be among the first to try our revolutionary driver training platform and help shape the future of driver education.',
      button: {
        label: 'Get Early Access',
        variant: 'primary',
        onClick: () => console.log('Early access clicked'),
      },
      background: 'primary',
    },
    logo: {
      src: '/logo_vromm@2x.png',
      alt: 'Vromm',
      href: '/',
    },
    description: 'Revolutionizing driver education through technology.',
    sections: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Updates', href: '/updates' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help Center', href: '/help' },
          { label: 'Contact', href: '/contact' },
          { label: 'Status', href: '/status' },
        ],
      },
    ],
    copyright: 'Vromm',
  },
};

// Extended with All Features
export const Extended: Story = {
  args: {
    variant: 'extended',
    background: 'gray',
    border: 'top',
    logo: {
      src: '/logo_vromm@2x.png',
      alt: 'Vromm',
      href: '/',
    },
    description: 'Comprehensive driver education platform with AI-powered route optimization, real-time progress tracking, and personalized learning experiences.',
    cta: {
      title: 'Transform your driving school today',
      description: 'Join hundreds of driving schools already using Vromm to improve student outcomes and streamline operations.',
      button: {
        label: 'Schedule Demo',
        variant: 'primary',
        onClick: () => console.log('Schedule demo'),
      },
      background: 'default',
    },
    sections: [
      {
        title: 'Solutions',
        links: [
          { label: 'For Schools', href: '/solutions/schools' },
          { label: 'For Students', href: '/solutions/students' },
          { label: 'For Instructors', href: '/solutions/instructors' },
          { label: 'Enterprise', href: '/enterprise', badge: 'New' },
        ],
      },
      {
        title: 'Features',
        links: [
          { label: 'Route Planning', href: '/features/routes' },
          { label: 'Progress Tracking', href: '/features/tracking' },
          { label: 'Analytics', href: '/features/analytics' },
          { label: 'Mobile App', href: '/features/mobile' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '/docs' },
          { label: 'API Reference', href: '/api' },
          { label: 'Tutorials', href: '/tutorials' },
          { label: 'Best Practices', href: '/best-practices' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Press', href: '/press' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
          { label: 'Cookie Policy', href: '/cookies' },
          { label: 'GDPR', href: '/gdpr' },
        ],
      },
    ],
    social: [
      {
        platform: 'LinkedIn',
        href: 'https://linkedin.com/company/vromm',
        icon: Linkedin,
        label: 'Connect on LinkedIn',
      },
      {
        platform: 'Twitter',
        href: 'https://twitter.com/vromm',
        icon: Twitter,
        label: 'Follow on Twitter',
      },
      {
        platform: 'Instagram',
        href: 'https://instagram.com/vromm',
        icon: Instagram,
        label: 'Follow on Instagram',
      },
      {
        platform: 'YouTube',
        href: 'https://youtube.com/vromm',
        icon: Youtube,
        label: 'Subscribe on YouTube',
      },
    ],
    languageSelector: {
      current: 'en',
      options: [
        { code: 'en', label: 'English', onClick: () => console.log('English') },
        { code: 'sv', label: 'Svenska', onClick: () => console.log('Swedish') },
        { code: 'de', label: 'Deutsch', onClick: () => console.log('German') },
        { code: 'fr', label: 'Français', onClick: () => console.log('French') },
      ],
    },
    copyright: 'Vromm Technologies AB',
    bottomLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Settings', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
}; 