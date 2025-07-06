import type { Meta, StoryObj } from '@storybook/react';
import { Search, SearchOption } from '../../src/components/Forms/Search';
import { MapPin, Route, User, Building, Calendar } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Search> = {
  title: 'Components/Forms/Search',
  component: Search,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Search component with suggestions, filtering, and location support. Features live search, categorized results, geolocation, and keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the search input',
    },
    showLocationButton: {
      control: 'boolean',
      description: 'Show geolocation button',
    },
    showFilterButton: {
      control: 'boolean',
      description: 'Show filter button',
    },
    activeFiltersCount: {
      control: 'number',
      description: 'Number of active filters (shows badge)',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    maxResultsHeight: {
      control: 'text',
      description: 'Maximum height for results dropdown',
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Close results when clicking outside',
    },
    emptyMessage: {
      control: 'text',
      description: 'Custom empty state message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample search options
const locationOptions: SearchOption[] = [
  {
    id: '1',
    label: 'New York, NY, USA',
    value: 'new-york',
    category: 'Locations',
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: '2',
    label: 'Los Angeles, CA, USA',
    value: 'los-angeles',
    category: 'Locations',
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: '3',
    label: 'Route 66 - Chicago to LA',
    value: 'route-66',
    category: 'Routes',
    icon: <Route className="h-4 w-4" />,
  },
  {
    id: '4',
    label: 'Pacific Coast Highway',
    value: 'pacific-coast',
    category: 'Routes',
    icon: <Route className="h-4 w-4" />,
  },
  {
    id: '5',
    label: 'John Doe',
    value: 'john-doe',
    category: 'Profiles',
    icon: <User className="h-4 w-4" />,
  },
  {
    id: '6',
    label: 'Jane Smith',
    value: 'jane-smith',
    category: 'Profiles',
    icon: <User className="h-4 w-4" />,
  },
];

const companyOptions: SearchOption[] = [
  {
    id: '1',
    label: 'Apple Inc.',
    value: 'apple',
    category: 'Technology',
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: '2',
    label: 'Google LLC',
    value: 'google',
    category: 'Technology',
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: '3',
    label: 'Tesla, Inc.',
    value: 'tesla',
    category: 'Automotive',
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: '4',
    label: 'Ford Motor Company',
    value: 'ford',
    category: 'Automotive',
    icon: <Building className="h-4 w-4" />,
  },
];

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Search for locations, routes, or profiles...',
    options: locationOptions,
    size: 'md',
    showLocationButton: false,
    showFilterButton: false,
  },
};

// With location and filter buttons
export const WithButtons: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState(2);
    
    return (
      <div className="w-full max-w-md">
        <Search
          placeholder="Search for locations, routes, or profiles..."
          options={locationOptions}
          showLocationButton={true}
          showFilterButton={true}
          activeFiltersCount={activeFilters}
          onLocationRequest={() => {
            console.log('Getting location...');
            // Simulate location request
          }}
          onFilterClick={() => {
            console.log('Opening filters...');
            setActiveFilters(prev => prev === 0 ? 3 : 0);
          }}
          onSearch={(value) => console.log('Searching:', value)}
          onSelect={(option) => console.log('Selected:', option)}
        />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-page-title mb-2">Small</label>
        <Search
          size="sm"
          placeholder="Small search..."
          options={companyOptions.slice(0, 3)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-page-title mb-2">Medium (Default)</label>
        <Search
          size="md"
          placeholder="Medium search..."
          options={companyOptions.slice(0, 3)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-page-title mb-2">Large</label>
        <Search
          size="lg"
          placeholder="Large search..."
          options={companyOptions.slice(0, 3)}
        />
      </div>
    </div>
  ),
};

// Loading state
export const LoadingState: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Search
        placeholder="Search while loading..."
        options={[]}
        loading={true}
        showLocationButton={true}
        showFilterButton={true}
      />
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedOption, setSelectedOption] = useState<SearchOption | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filterCount, setFilterCount] = useState(0);

    const handleSearch = (value: string) => {
      setSearchValue(value);
      setIsLoading(true);
      // Simulate search delay
      setTimeout(() => setIsLoading(false), 500);
    };

    const handleSelect = (option: SearchOption) => {
      setSelectedOption(option);
      console.log('Selected option:', option);
    };

    const handleLocationRequest = async () => {
      console.log('Requesting location...');
      // Simulate geolocation
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Location received');
    };

    return (
      <div className="space-y-6 w-full max-w-md">
        <Search
          placeholder="Try typing 'New York' or 'Route'..."
          options={locationOptions}
          onSearch={handleSearch}
          onSelect={handleSelect}
          onLocationRequest={handleLocationRequest}
          onFilterClick={() => setFilterCount(prev => (prev + 1) % 4)}
          showLocationButton={true}
          showFilterButton={true}
          activeFiltersCount={filterCount}
          loading={isLoading}
          value={searchValue}
        />
        
        {selectedOption && (
          <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-brand border border-primary-200 dark:border-primary-800">
            <h4 className="font-medium text-page-title mb-2">Selected Option:</h4>
            <div className="flex items-center gap-2 text-sm text-body-text">
              {selectedOption.icon}
              <span>{selectedOption.label}</span>
              <span className="text-muted-foreground">({selectedOption.category})</span>
            </div>
          </div>
        )}
        
        <div className="text-sm text-muted-foreground">
          <p>• Type to search</p>
          <p>• Use arrow keys to navigate results</p>
          <p>• Press Enter to select</p>
          <p>• Press Escape to close</p>
          <p>• Click location button for geolocation</p>
          <p>• Click filter button to toggle filters ({filterCount} active)</p>
        </div>
      </div>
    );
  },
};

// Empty state
export const EmptyState: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Search
        placeholder="Search for something that doesn't exist..."
        options={[]}
        emptyMessage="No results found. Try a different search term."
      />
    </div>
  ),
};

// Company search example
export const CompanySearch: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Search
        placeholder="Search companies..."
        options={companyOptions}
        showFilterButton={true}
        activeFiltersCount={1}
        onSearch={(value) => console.log('Company search:', value)}
        onSelect={(option) => console.log('Selected company:', option)}
        onFilterClick={() => console.log('Opening company filters...')}
      />
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-page-title mb-2">Custom Height</label>
        <Search
          placeholder="Search with custom height..."
          options={locationOptions.slice(0, 3)}
          maxResultsHeight="150px"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-page-title mb-2">Custom Empty Message</label>
        <Search
          placeholder="Search for nothing..."
          options={[]}
          emptyMessage="🔍 Oops! Nothing here. Try something else!"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-page-title mb-2">Don't Close on Outside Click</label>
        <Search
          placeholder="Results stay open..."
          options={companyOptions.slice(0, 2)}
          closeOnOutsideClick={false}
        />
      </div>
    </div>
  ),
}; 