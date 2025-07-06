import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from '../../../src/components/Forms/Slider';

const meta = {
  title: 'Components/Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    showValues: {
      control: 'boolean',
    },
    showTicks: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(25);
    
    return (
      <div className="space-y-4 w-80">
        <div className="text-center">
          <span className="text-sm font-medium">Value: {value}</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={5}
        />
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [values, setValues] = useState([20, 80]);
    
    return (
      <div className="space-y-4 w-80">
        <div className="text-center">
          <span className="text-sm font-medium">Range: {values[0]} - {values[1]}</span>
        </div>
        <Slider
          values={values}
          onValuesChange={setValues}
          min={0}
          max={100}
          step={1}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h4 className="mb-2 font-medium">Small</h4>
        <Slider size="sm" defaultValue={30} />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Medium</h4>
        <Slider size="md" defaultValue={50} />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Large</h4>
        <Slider size="lg" defaultValue={70} />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h4 className="mb-2 font-medium">Default</h4>
        <Slider variant="default" defaultValue={30} />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Success</h4>
        <Slider variant="success" defaultValue={50} />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Warning</h4>
        <Slider variant="warning" defaultValue={70} />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Error</h4>
        <Slider variant="error" defaultValue={90} />
      </div>
    </div>
  ),
};

export const WithTicks: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h4 className="mb-2 font-medium">Auto Ticks</h4>
        <Slider 
          defaultValue={50} 
          showTicks 
          min={0} 
          max={100} 
          step={10}
        />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Custom Ticks</h4>
        <Slider 
          defaultValue={3} 
          showTicks 
          ticks={[1, 2, 3, 4, 5]}
          min={1} 
          max={5} 
          step={1}
        />
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h4 className="mb-2 font-medium">Show Values</h4>
        <Slider 
          defaultValue={75} 
          showValues
          min={0} 
          max={100} 
          step={5}
        />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Range with Values</h4>
        <Slider 
          defaultValues={[25, 75]} 
          showValues
          min={0} 
          max={100} 
          step={5}
        />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex gap-8 h-64">
      <div className="flex flex-col items-center">
        <h4 className="mb-4 font-medium">Single</h4>
        <Slider 
          orientation="vertical"
          defaultValue={60}
          min={0}
          max={100}
        />
      </div>
      
      <div className="flex flex-col items-center">
        <h4 className="mb-4 font-medium">Range</h4>
        <Slider 
          orientation="vertical"
          defaultValues={[30, 70]}
          min={0}
          max={100}
        />
      </div>
      
      <div className="flex flex-col items-center">
        <h4 className="mb-4 font-medium">With Ticks</h4>
        <Slider 
          orientation="vertical"
          defaultValue={50}
          showTicks
          showValues
          min={0}
          max={100}
          step={20}
        />
      </div>
    </div>
  ),
};

export const CustomFormatting: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h4 className="mb-2 font-medium">Percentage</h4>
        <Slider 
          defaultValue={75} 
          showValues
          formatValue={(value) => `${value}%`}
          min={0} 
          max={100} 
          step={5}
        />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Currency</h4>
        <Slider 
          defaultValue={1500} 
          showValues
          formatValue={(value) => `$${value.toLocaleString()}`}
          min={0} 
          max={5000} 
          step={100}
        />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Temperature</h4>
        <Slider 
          defaultValue={22} 
          showValues
          formatValue={(value) => `${value}°C`}
          min={-10} 
          max={40} 
          step={1}
        />
      </div>
    </div>
  ),
};

export const WithLabelsAndErrors: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <Slider 
        label="Volume"
        helperText="Adjust the audio volume level"
        defaultValue={50}
        min={0}
        max={100}
        showValues
        formatValue={(value) => `${value}%`}
      />
      
      <Slider 
        label="Price Range"
        error="Please select a valid price range"
        defaultValues={[100, 500]}
        min={0}
        max={1000}
        step={50}
        showValues
        formatValue={(value) => `$${value}`}
        variant="error"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h4 className="mb-2 font-medium">Disabled Single</h4>
        <Slider 
          disabled
          defaultValue={40}
          min={0}
          max={100}
        />
      </div>
      
      <div>
        <h4 className="mb-2 font-medium">Disabled Range</h4>
        <Slider 
          disabled
          defaultValues={[20, 80]}
          min={0}
          max={100}
        />
      </div>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => {
    const [volume, setVolume] = useState(65);
    const [priceRange, setPriceRange] = useState([100, 500]);
    const [temperature, setTemperature] = useState(22);
    
    return (
      <div className="space-y-8 p-8 max-w-md">
        <div>
          <h3 className="font-semibold mb-4">Audio Settings</h3>
          <Slider 
            label="Master Volume"
            value={volume}
            onValueChange={setVolume}
            helperText={`Current volume: ${volume}%`}
            min={0}
            max={100}
            step={5}
            showTicks
            variant="success"
          />
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">E-commerce Filter</h3>
          <Slider 
            label="Price Range"
            values={priceRange}
            onValuesChange={setPriceRange}
            helperText={`$${priceRange[0]} - $${priceRange[1]}`}
            min={0}
            max={1000}
            step={25}
            showValues
            formatValue={(value) => `$${value}`}
          />
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Climate Control</h3>
          <Slider 
            label="Target Temperature"
            value={temperature}
            onValueChange={setTemperature}
            helperText="Set your preferred room temperature"
            min={15}
            max={30}
            step={0.5}
            showValues
            formatValue={(value) => `${value}°C`}
            variant="warning"
          />
        </div>
      </div>
    );
  },
}; 