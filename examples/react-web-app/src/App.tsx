import React from 'react';
import { Title, Text, useTheme, useTranslation } from '@vromm/design-system';
import '@vromm/design-system/dist/style.css';

function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t, changeLanguage, language } = useTranslation();

  return (
    <div className="min-h-screen bg-background-primary dark:bg-secondary-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <Title level={1} size="4xl" weight="bold">
            {t('examples.welcome')}
          </Title>
          
          <div className="flex gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {isDark ? '☀️' : '🌙'} {isDark ? 'Light' : 'Dark'}
            </button>
            
            {/* Language Toggle */}
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="px-3 py-2 border border-border-primary rounded-lg bg-background-primary dark:bg-secondary-800"
            >
              <option value="en">🇺🇸 English</option>
              <option value="sv">🇸🇪 Svenska</option>
              <option value="es">🇪🇸 Español</option>
            </select>
          </div>
        </header>

        {/* Content */}
        <main className="space-y-6">
          <Text size="lg" variant="secondary">
            {t('examples.description')}
          </Text>

          {/* Typography Examples */}
          <section className="space-y-4">
            <Title level={2} size="2xl" weight="semibold">
              Typography Examples
            </Title>
            
            <div className="grid gap-4">
              <div className="p-4 border border-border-primary rounded-lg">
                <Title level={3} size="lg" weight="medium" className="mb-2">
                  All Heading Levels
                </Title>
                
                <div className="space-y-2">
                  <Title level={1} size="3xl">Heading 1</Title>
                  <Title level={2} size="2xl">Heading 2</Title>
                  <Title level={3} size="xl">Heading 3</Title>
                  <Title level={4} size="lg">Heading 4</Title>
                  <Title level={5} size="base">Heading 5</Title>
                  <Title level={6} size="sm">Heading 6</Title>
                </div>
              </div>

              <div className="p-4 border border-border-primary rounded-lg">
                <Title level={3} size="lg" weight="medium" className="mb-2">
                  Text Variants
                </Title>
                
                <div className="space-y-2">
                  <Text variant="primary">Primary text - main content</Text>
                  <Text variant="secondary">Secondary text - supporting content</Text>
                  <Text variant="tertiary">Tertiary text - less important</Text>
                  <Text variant="success">Success text - positive actions</Text>
                  <Text variant="warning">Warning text - attention needed</Text>
                  <Text variant="error">Error text - problems or issues</Text>
                </div>
              </div>

              <div className="p-4 border border-border-primary rounded-lg">
                <Title level={3} size="lg" weight="medium" className="mb-2">
                  Text Sizes & Weights
                </Title>
                
                <div className="space-y-2">
                  <Text size="xs" weight="light">Extra small light text</Text>
                  <Text size="sm" weight="normal">Small normal text</Text>
                  <Text size="base" weight="medium">Base medium text</Text>
                  <Text size="lg" weight="semibold">Large semibold text</Text>
                  <Text size="xl" weight="bold">Extra large bold text</Text>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="space-y-4">
            <Title level={2} size="2xl" weight="semibold">
              {t('examples.features.title')}
            </Title>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key: 'responsive', icon: '📱' },
                { key: 'darkMode', icon: '🌙' },
                { key: 'i18n', icon: '🌍' },
                { key: 'a11y', icon: '♿' },
                { key: 'typescript', icon: '📘' },
                { key: 'storybook', icon: '📚' },
              ].map(({ key, icon }) => (
                <div key={key} className="p-4 border border-border-primary rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">{icon}</div>
                  <Title level={4} size="base" weight="medium" className="mb-1">
                    {t(`examples.features.${key}`)}
                  </Title>
                  <Text size="sm" variant="secondary">
                    Feature description for {t(`examples.features.${key}`)}
                  </Text>
                </div>
              ))}
            </div>
          </section>

          {/* Code Example */}
          <section className="space-y-4">
            <Title level={2} size="2xl" weight="semibold">
              Usage Example
            </Title>
            
            <div className="bg-secondary-100 dark:bg-secondary-800 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`import { Title, Text } from '@vromm/design-system';

function MyComponent() {
  return (
    <div>
      <Title level={1} size="4xl" weight="bold">
        Welcome to Vromm
      </Title>
      <Text size="lg" variant="secondary">
        A modern design system
      </Text>
    </div>
  );
}`}</code>
              </pre>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="pt-8 border-t border-border-primary">
          <Text size="sm" variant="tertiary" align="center">
            Built with ❤️ using Vromm Design System
          </Text>
        </footer>
      </div>
    </div>
  );
}

export default App; 