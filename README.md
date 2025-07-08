# Vromm Design System

A comprehensive, modern design system built with React, TypeScript, Tailwind CSS, and Storybook. Designed for scalability, accessibility, and cross-platform compatibility.

## 🚀 Features

- ✅ **TypeScript** - Full type safety and IntelliSense support
- ✅ **Tailwind CSS** - Utility-first CSS framework with custom design tokens
- ✅ **Storybook** - Interactive component documentation and testing
- ✅ **Dark Mode** - Built-in light/dark theme support
- ✅ **Internationalization** - Multi-language support (en, sv, es)
- ✅ **Accessibility** - WCAG compliant components
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Tree Shaking** - Only import what you need
- ✅ **Cross-Platform** - Works with React, Next.js, and React Native

## 🎯 Z-Index Management

The design system handles z-index automatically to prevent conflicts and ensure proper layering across all applications.

### Automatic Z-Index Scale

```typescript
export const zIndex = {
  // Base content layers
  base: 1,
  dropdown: 1000,
  sticky: 1010,
  fixed: 1020,
  
  // Modal layers - automatically managed
  modalBackdrop: 9000,
  modal: 9100,           // First modal
  modalStacked1: 9200,   // Second modal
  modalStacked2: 9300,   // Third modal
  modalStacked3: 9400,   // Fourth modal
  modalStacked4: 9500,   // Fifth modal
  
  // UI layers above modals
  toast: 9800,
  tooltip: 9900,
  skipLink: 9999,
};
```

### Modal Stacking

Modals automatically handle z-index stacking:

```tsx
// ✅ Automatic stacking - no configuration needed
<Modal isOpen={firstModal} onClose={closeFirst}>
  First modal (z-index: 9100)
  <Modal isOpen={secondModal} onClose={closeSecond}>
    Second modal (z-index: 9200) - automatically above first
  </Modal>
</Modal>

// ✅ Custom z-index if needed
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  zIndexOverride={10000}  // Optional: custom z-index
>
  Custom z-index modal
</Modal>
```

### Benefits for Applications

1. **No Configuration Required**: Modals work above headers, navigation, search bars automatically
2. **Stacked Modal Support**: Multiple modals stack properly without conflicts
3. **Consistent Behavior**: Same z-index behavior across all apps using the design system
4. **Conflict Prevention**: No z-index wars between components

### Integration in Your App

Simply use the Modal component - no z-index setup required:

```tsx
import { Modal } from '@daniellauding/vromm-design-system';

function MyApp() {
  return (
    <div>
      {/* Your app header with z-index: 100 */}
      <header style={{ zIndex: 100 }}>App Header</header>
      
      {/* Modal automatically appears above (z-index: 9100+) */}
      <Modal isOpen={isOpen} onClose={onClose}>
        Modal content - automatically above header
      </Modal>
    </div>
  );
}
```

## 📦 Installation

### Using npm

```bash
npm install @vromm/design-system
```

### Using pnpm (recommended)

```bash
pnpm add @vromm/design-system
```

### Using yarn

```bash
yarn add @vromm/design-system
```

## 🛠 Development Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd vromm-storybooks
```

2. **Install dependencies**

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

3. **Start Storybook**

```bash
# Using pnpm
pnpm run storybook

# Or using npm
npm run storybook
```

4. **Build the library**

```bash
# Using pnpm
pnpm run build

# Or using npm
npm run build
```

## 📖 Usage

### Basic Usage in React Projects

```tsx
// Import the CSS (required)
import '@vromm/design-system/dist/style.css';

// Import components
import { Title, Text } from '@vromm/design-system';

function App() {
  return (
    <div>
      <Title level={1} size="4xl" weight="bold">
        Welcome to Vromm
      </Title>
      <Text size="lg" variant="secondary">
        A modern design system for React applications
      </Text>
    </div>
  );
}
```

### Using Design Tokens

```tsx
import { tokens } from '@vromm/design-system';

// Access design tokens
const primaryColor = tokens.colors.primary[500];
const spacing = tokens.spacing[4];
const fontSize = tokens.typography.fontSize.lg;
```

### Dark Mode Support

```tsx
import { useTheme } from '@vromm/design-system';

function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {isDark ? 'light' : 'dark'} mode
    </button>
  );
}
```

### Internationalization

```tsx
import { useTranslation } from '@vromm/design-system';

function LocalizedComponent() {
  const { t, changeLanguage, language } = useTranslation();
  
  return (
    <div>
      <h1>{t('examples.welcome')}</h1>
      <button onClick={() => changeLanguage('sv')}>
        Svenska
      </button>
    </div>
  );
}
```

## 🌐 React Native Usage

For React Native projects, you'll need some additional setup:

### 1. Install React Native dependencies

```bash
pnpm add react-native-svg react-native-vector-icons
```

### 2. Import components (without CSS)

```tsx
// Don't import the CSS file in React Native
import { Title, Text } from '@vromm/design-system';

// Use style props instead of className
function App() {
  return (
    <>
      <Title level={1} style={{ fontSize: 32, fontWeight: 'bold' }}>
        Welcome to Vromm
      </Title>
      <Text style={{ fontSize: 16, color: '#666' }}>
        Design system for React Native
      </Text>
    </>
  );
}
```

### 3. Custom styling for React Native

```tsx
import { Title, Text } from '@vromm/design-system';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  text: {
    fontSize: 16,
    color: '#475569',
  },
});

function App() {
  return (
    <>
      <Title style={styles.title}>Welcome</Title>
      <Text style={styles.text}>Description</Text>
    </>
  );
}
```

## 🎨 Components

### Typography

#### Title Component

```tsx
import { Title } from '@vromm/design-system';

<Title 
  level={1}           // 1-6 (heading level)
  size="4xl"          // xs, sm, base, lg, xl, 2xl-9xl
  weight="semibold"   // light, normal, medium, semibold, bold
  variant="primary"   // primary, secondary, tertiary, success, warning, error
  align="center"      // left, center, right, justify
  transform="none"    // none, uppercase, lowercase, capitalize
  italic={false}      // boolean
  underline={false}   // boolean
  truncate={false}    // boolean
  balance={true}      // boolean
  as="h1"            // HTML element override
>
  Your title text
</Title>
```

#### Text Component

```tsx
import { Text } from '@vromm/design-system';

<Text
  size="base"         // xs, sm, base, lg, xl, 2xl
  weight="normal"     // light, normal, medium, semibold, bold
  variant="primary"   // primary, secondary, tertiary, success, warning, error
  align="left"        // left, center, right, justify
  leading="normal"    // tight, normal, relaxed, loose
  tracking="normal"   // tight, normal, wide
  as="p"             // HTML element override
>
  Your text content
</Text>
```

## 🎭 Storybook

Visit the live Storybook documentation to explore all components interactively:

[View Storybook Documentation](https://your-netlify-url.netlify.app)

### Local Storybook Development

```bash
pnpm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the documentation.

## 🚀 Publishing

### Publishing to npm

1. **Build the package**

```bash
pnpm run build
```

2. **Login to npm**

```bash
npm login
```

3. **Publish**

```bash
npm publish --access public
```

### Deploying Storybook to Netlify

The repository includes a `netlify.toml` configuration file. Simply:

1. Connect your repository to Netlify
2. The build will automatically run `npm run build-storybook`
3. The built Storybook will be deployed

## 🧪 Testing

```bash
# Run tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Type checking
pnpm run type-check

# Linting
pnpm run lint
pnpm run lint:fix
```

## 📁 Project Structure

```
vromm-storybooks/
├── src/
│   ├── components/           # React components
│   │   └── Typography/       # Typography components
│   ├── tokens/              # Design tokens
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   ├── hooks/               # Custom React hooks
│   ├── i18n/                # Internationalization
│   └── styles/              # Global styles
├── stories/                 # Storybook stories
├── .storybook/              # Storybook configuration
├── dist/                    # Built library (generated)
└── storybook-static/        # Built Storybook (generated)
```

## 🎯 Design Tokens

The design system includes comprehensive design tokens for:

- **Colors**: Primary, secondary, semantic colors with full shade ranges
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation system
- **Border Radius**: Consistent border radius scale

## 🌍 Internationalization

Supported languages:
- English (en) - Default
- Swedish (sv)
- Spanish (es)

Add new languages by creating translation files in `src/i18n/locales/`.

## ♿ Accessibility

All components are built with accessibility in mind:
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and stories
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Storybook Documentation](https://your-netlify-url.netlify.app)
- [npm Package](https://www.npmjs.com/package/@vromm/design-system)
- [GitHub Repository](https://github.com/your-username/vromm-storybooks)

---

Built with ❤️ by the Vromm Team 