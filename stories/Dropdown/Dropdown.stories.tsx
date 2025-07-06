import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown, DropdownItem, SimpleDropdownItem, DropdownSeparator, DropdownLabel } from '../../src/components/Dropdown';
import { Button } from '../../src/components/Button';
import { QuickIcon } from '../../src/components/Icon';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    closeOnClickOutside: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    searchPlaceholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown
      trigger={
        <Button variant="secondary">
          Open Menu
          <QuickIcon name="chevron-down" size="sm" />
        </Button>
      }
    >
      <DropdownItem icon="home">Dashboard</DropdownItem>
      <DropdownItem icon="user">Profile</DropdownItem>
      <DropdownItem icon="calendar">Calendar</DropdownItem>
      <DropdownSeparator />
      <DropdownItem icon="search">Search</DropdownItem>
    </Dropdown>
  ),
};

export const SimpleVariant: Story = {
  render: () => (
    <Dropdown
      trigger={
        <Button variant="outline">
          Simple Menu
          <QuickIcon name="chevron-down" size="sm" />
        </Button>
      }
    >
      <SimpleDropdownItem>Dashboard</SimpleDropdownItem>
      <SimpleDropdownItem>Profile Settings</SimpleDropdownItem>
      <SimpleDropdownItem>Team Settings</SimpleDropdownItem>
      <DropdownSeparator />
      <SimpleDropdownItem>Sign Out</SimpleDropdownItem>
    </Dropdown>
  ),
};

export const WithSearch: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    
    const allItems = [
      { name: 'Dashboard', icon: 'home' as const },
      { name: 'Profile', icon: 'user' as const },
      { name: 'Calendar', icon: 'calendar' as const },
      { name: 'Library', icon: 'library' as const },
      { name: 'Search', icon: 'search' as const },
      { name: 'Mail', icon: 'mail' as const },
      { name: 'Add Item', icon: 'plus' as const },
      { name: 'Archive', icon: 'library' as const },
    ];
    
    const filteredItems = allItems.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    return (
      <Dropdown
        trigger={
          <Button variant="outline">
            Searchable Menu
            <QuickIcon name="search" size="sm" />
          </Button>
        }
        searchable
        searchPlaceholder="Search items..."
        onSearch={setSearchValue}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <DropdownItem key={item.name} icon={item.icon}>
              {item.name}
            </DropdownItem>
          ))
        ) : (
          <div className="px-2 py-3 text-sm text-gray-500 text-center">
            No items found
          </div>
        )}
      </Dropdown>
    );
  },
};

export const SimpleWithSearch: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    
    const allItems = [
      'Dashboard',
      'Profile Settings',
      'Team Settings',
      'Billing & Usage',
      'Notifications',
      'Privacy & Security',
      'API Keys',
      'Integrations',
      'Support',
      'Sign Out',
    ];
    
    const filteredItems = allItems.filter(item =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    return (
      <Dropdown
        trigger={
          <Button variant="outline">
            Simple Searchable
            <QuickIcon name="search" size="sm" />
          </Button>
        }
        searchable
        searchPlaceholder="Search options..."
        onSearch={setSearchValue}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <SimpleDropdownItem key={item}>
              {item}
            </SimpleDropdownItem>
          ))
        ) : (
          <div className="px-2 py-3 text-sm text-gray-500 text-center">
            No options found
          </div>
        )}
      </Dropdown>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <Dropdown
      trigger={
        <Button variant="primary">
          <QuickIcon name="menu" size="sm" />
          Actions
        </Button>
      }
    >
      <DropdownItem icon="plus" iconVariant="success">New Item</DropdownItem>
      <DropdownItem icon="trash" iconVariant="error">Delete</DropdownItem>
      <DropdownItem icon="mail" iconVariant="primary">Send Email</DropdownItem>
      <DropdownSeparator />
      <DropdownItem icon="calendar">Schedule</DropdownItem>
    </Dropdown>
  ),
};

export const UserMenu: Story = {
  render: () => (
    <Dropdown
      trigger={
        <Button variant="secondary" size="sm">
          <QuickIcon name="user" size="sm" />
          Guest User
          <QuickIcon name="chevron-down" size="xs" />
        </Button>
      }
    >
      <DropdownLabel>Guest User</DropdownLabel>
      <DropdownSeparator />
      
      <DropdownItem 
        customIcon={<QuickIcon name="home" size="sm" />}
      >
        Learning Paths
      </DropdownItem>
      
      <DropdownItem 
        customIcon={<QuickIcon name="mail" size="sm" />}
      >
        AI Assistant
      </DropdownItem>
      
      <DropdownItem 
        customIcon={<QuickIcon name="calendar" size="sm" variant="warning" />}
      >
        Buy me a coffee ☕
      </DropdownItem>
      
      <DropdownSeparator />
      
      <DropdownItem 
        customIcon={<QuickIcon name="grid" size="sm" variant="primary" />}
      >
        Start App Tour
      </DropdownItem>
      
      <DropdownItem 
        customIcon={<QuickIcon name="search" size="sm" variant="success" />}
      >
        Help Tour
      </DropdownItem>
      
      <DropdownItem 
        customIcon={<QuickIcon name="home" size="sm" variant="secondary" />}
      >
        How it works
      </DropdownItem>
      
      <DropdownSeparator />
      
      <div className="px-2 py-1.5">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full justify-start gap-2"
        >
          <QuickIcon name="user" size="sm" />
          <span className="text-sm">🇺🇸 English</span>
        </Button>
      </div>
      
      <DropdownSeparator />
      
      <DropdownItem 
        customIcon={<QuickIcon name="user" size="sm" />}
      >
        Sign In
      </DropdownItem>
    </Dropdown>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div className="space-y-4">
        <h3 className="font-semibold">Top Positions</h3>
        <Dropdown
          side="top"
          align="start"
          trigger={<Button variant="outline">Top Start</Button>}
        >
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </Dropdown>
        
        <Dropdown
          side="top"
          align="center"
          trigger={<Button variant="outline">Top Center</Button>}
        >
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </Dropdown>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold">Bottom Positions</h3>
        <Dropdown
          side="bottom"
          align="start"
          trigger={<Button variant="outline">Bottom Start</Button>}
        >
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </Dropdown>
        
        <Dropdown
          side="bottom"
          align="end"
          trigger={<Button variant="outline">Bottom End</Button>}
        >
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </Dropdown>
      </div>
    </div>
  ),
};

export const ItemStates: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown
        trigger={<Button variant="secondary">With Icons</Button>}
      >
        <DropdownItem>Normal Item</DropdownItem>
        <DropdownItem selected>Selected Item</DropdownItem>
        <DropdownItem disabled>Disabled Item</DropdownItem>
        <DropdownSeparator />
        <DropdownItem icon="plus">With Icon</DropdownItem>
        <DropdownItem icon="trash" iconVariant="error" disabled>
          Disabled with Icon
        </DropdownItem>
        <DropdownItem icon="calendar" selected>
          Selected with Icon
        </DropdownItem>
      </Dropdown>
      
      <Dropdown
        trigger={<Button variant="outline">Simple Items</Button>}
      >
        <SimpleDropdownItem>Normal Item</SimpleDropdownItem>
        <SimpleDropdownItem selected>Selected Item</SimpleDropdownItem>
        <SimpleDropdownItem disabled>Disabled Item</SimpleDropdownItem>
        <DropdownSeparator />
        <SimpleDropdownItem>Another Item</SimpleDropdownItem>
      </Dropdown>
    </div>
  ),
};

export const LongMenu: Story = {
  render: () => (
    <Dropdown
      trigger={<Button variant="primary">Long Menu</Button>}
    >
      <DropdownLabel>Section 1</DropdownLabel>
      <DropdownItem icon="home">Home</DropdownItem>
      <DropdownItem icon="user">Profile</DropdownItem>
      <DropdownItem icon="calendar">Calendar</DropdownItem>
      
      <DropdownSeparator />
      
      <DropdownLabel>Section 2</DropdownLabel>
      <DropdownItem icon="mail">Messages</DropdownItem>
      <DropdownItem icon="search">Search</DropdownItem>
      <DropdownItem icon="grid">Dashboard</DropdownItem>
      
      <DropdownSeparator />
      
      <DropdownLabel>Actions</DropdownLabel>
      <DropdownItem icon="plus" iconVariant="success">Create New</DropdownItem>
      <DropdownItem icon="trash" iconVariant="error">Delete</DropdownItem>
      
      <DropdownSeparator />
      
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
      <DropdownItem>Item 4</DropdownItem>
      <DropdownItem>Item 5</DropdownItem>
    </Dropdown>
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown
        trigger={
          <div className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
            <QuickIcon name="more-dots" size="md" />
          </div>
        }
      >
        <DropdownItem icon="plus">Add Item</DropdownItem>
        <DropdownItem icon="trash">Remove</DropdownItem>
      </Dropdown>
      
      <Dropdown
        trigger={
          <div className="px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-md cursor-pointer hover:bg-blue-200">
            Custom Trigger
          </div>
        }
      >
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const handleItemSelect = (item: string) => {
      alert(`Selected: ${item}`);
    };

    return (
      <Dropdown
        trigger={<Button variant="primary">Interactive Menu</Button>}
      >
        <DropdownLabel>Choose an action</DropdownLabel>
        <DropdownSeparator />
        
        <DropdownItem 
          icon="plus" 
          onSelect={() => handleItemSelect('Create New')}
        >
          Create New
        </DropdownItem>
        
        <DropdownItem 
          icon="mail" 
          onSelect={() => handleItemSelect('Send Message')}
        >
          Send Message
        </DropdownItem>
        
        <DropdownItem 
          icon="calendar" 
          onSelect={() => handleItemSelect('Schedule Meeting')}
        >
          Schedule Meeting
        </DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownItem 
          icon="trash" 
          iconVariant="error"
          onSelect={() => handleItemSelect('Delete')}
        >
          Delete
        </DropdownItem>
      </Dropdown>
    );
  },
}; 