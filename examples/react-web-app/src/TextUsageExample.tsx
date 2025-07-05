import React from 'react';
import { Title, Text } from '@daniellauding/vromm-design-system';
import '@daniellauding/vromm-design-system/dist/styles.css'; // Required for web

export function TextUsageExample() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="space-y-4">
        <Title level={1} size="4xl" weight="bold" variant="primary">
          Text Component Usage
        </Title>
        <Text size="lg" variant="weak">
          Examples of using Vromm Design System typography in web projects.
        </Text>
      </header>

      <section className="space-y-6">
        <Title level={2} size="2xl" weight="semibold">Basic Usage</Title>
        
        <Text size="base">
          This is regular body text using the design system. It automatically 
          adapts to light and dark themes.
        </Text>
        
        <Text size="sm" variant="weak">
          Secondary text for less important information.
        </Text>

        <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
          <Text size="sm" variant="success" weight="medium">
            ✓ Success message example
          </Text>
        </div>
      </section>
    </div>
  );
} 