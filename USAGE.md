# 🚀 Vromm Design System Usage Guide

## 📦 Installation

### For React Web Projects
```bash
npm install @daniellauding/vromm-design-system
```

### For React Native Projects  
```bash
npm install @daniellauding/vromm-design-system --legacy-peer-deps
```

### Local Development (Package not published yet)
```bash
# In the design-system folder
npm run build
npm link

# In your project folder
npm link @daniellauding/vromm-design-system
```

## 🌐 React Web Usage

### Basic Setup
```tsx
// Import components - CSS is automatically included!
import { Title, Text, Button } from '@daniellauding/vromm-design-system';

function App() {
  return (
    <div>
      <Title level={1} size="4xl" weight="bold">
        Welcome to My App
      </Title>
      
      <Text size="lg" variant="weak">
        This is a subtitle using the design system
      </Text>
      
      <div className="flex gap-4 mt-6">
        <Button variant="primary">
          Get Started
        </Button>
        
        <Button variant="secondary" fill="outline">
          Learn More
        </Button>
      </div>
    </div>
  );
}
```

### With Icons
```tsx
import { Button } from '@daniellauding/vromm-design-system';
import { Play, Download, Settings } from 'lucide-react';

function IconExamples() {
  return (
    <div className="flex gap-3">
      <Button icon={Play} iconPosition="left">
        Play Video
      </Button>
      
      <Button icon={Download} iconOnly tooltip="Download" />
      
      <Button icon={Settings} iconPosition="right" variant="secondary">
        Settings
      </Button>
    </div>
  );
}
```

## 📱 React Native Usage

### Basic Setup
```tsx
// Import components - NO CSS import for React Native!
import { Title, Text, Button } from '@daniellauding/vromm-design-system';

function MyScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Title level={1} size="3xl" weight="bold">
        Mobile App
      </Title>
      
      <Text size="base" style={{ marginVertical: 16 }}>
        This text will look great on mobile
      </Text>
      
      <Button variant="primary" fullWidth>
        Mobile Button
      </Button>
    </View>
  );
}
```

### React Native Considerations
- ✅ All components work out of the box
- ✅ No CSS imports needed
- ✅ Typography scales properly
- ✅ Touch targets are optimized
- ⚠️ Icons need to be React Native compatible

## 🎨 Brand Customization

### Easy Color Customization

```tsx
// Import brand colors
import { generateBrandCSS, purpleBrand, orangeBrand } from '@daniellauding/vromm-design-system';

// Option 1: Use a preset
const css = generateBrandCSS(purpleBrand);
console.log(css); // Copy this to your globals.css

// Option 2: Custom brand colors
const myBrand = {
  primary: '#ff6b35',    // Your brand orange
  secondary: '#2d3748',  // Dark gray
  success: '#38a169',    // Green
  error: '#e53e3e',      // Red
};

const customCSS = generateBrandCSS(myBrand);
// Copy this CSS to your globals.css file
```

### Apply Custom Colors (Web)
```css
/* Add to your globals.css or main CSS file */
:root {
  --vromm-color-primary-50: 255, 241, 235;
  --vromm-color-primary-100: 255, 221, 204;
  --vromm-color-primary-200: 255, 188, 158;
  --vromm-color-primary-300: 255, 147, 102;
  --vromm-color-primary-400: 255, 107, 53;
  --vromm-color-primary-500: 255, 107, 53;  /* Your brand color */
  --vromm-color-primary-600: 230, 96, 48;
  --vromm-color-primary-700: 204, 85, 42;
  --vromm-color-primary-800: 179, 75, 37;
  --vromm-color-primary-900: 153, 64, 32;
}
```

### React Native Colors
React Native automatically uses the component's built-in color logic - no CSS needed!

## 🔧 Component Examples

### Button Variants
```tsx
// Primary action - use sparingly, one per page
<Button variant="primary">Save Changes</Button>

// Secondary actions - most common
<Button variant="secondary">Cancel</Button>

// Destructive actions - deletion, removal
<Button variant="destructive">Delete Account</Button>

// Success actions - confirmations
<Button variant="success">Confirm Payment</Button>

// Different fills
<Button variant="primary" fill="solid">Solid</Button>
<Button variant="primary" fill="outline">Outline</Button>
<Button variant="primary" fill="text">Text Only</Button>

// Loading states
<Button loading>Processing...</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

### Typography
```tsx
// Titles with levels (h1-h6)
<Title level={1} size="4xl">Main Heading</Title>
<Title level={2} size="2xl">Section Heading</Title>
<Title level={3} size="xl">Subsection</Title>

// Text variants
<Text size="lg">Large text</Text>
<Text size="base">Regular text</Text>
<Text size="sm" variant="weak">Small secondary text</Text>

// Text colors
<Text variant="primary">Primary brand text</Text>
<Text variant="success">Success message</Text>
<Text variant="error">Error message</Text>

// Font families
<Title family="title">Rubik Font (Default for titles)</Title>
<Text family="sans">System font (Default for text)</Text>
<Text family="mono">Monospace font</Text>
```

## 📋 Integration Examples

### Form Example
```tsx
function LoginForm() {
  return (
    <form className="max-w-md mx-auto space-y-6">
      <Title level={2} size="2xl" align="center">
        Sign In
      </Title>
      
      <div>
        <Text as="label" size="sm" weight="medium" className="block mb-2">
          Email Address
        </Text>
        <input 
          type="email" 
          className="w-full p-3 border rounded-lg"
          placeholder="Enter your email"
        />
      </div>
      
      <div>
        <Text as="label" size="sm" weight="medium" className="block mb-2">
          Password
        </Text>
        <input 
          type="password" 
          className="w-full p-3 border rounded-lg"
          placeholder="Enter your password"
        />
      </div>
      
      <Button variant="primary" fullWidth>
        Sign In
      </Button>
      
      <Text size="sm" align="center" variant="weak">
        Don't have an account?{' '}
        <LinkButton href="/signup" fill="text" size="sm">
          Sign up
        </LinkButton>
      </Text>
    </form>
  );
}
```

### Status Cards
```tsx
function StatusCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Success Card */}
      <div className="p-6 bg-success-50 border border-success-200 rounded-lg">
        <Title level={4} size="lg" variant="success" className="mb-2">
          ✓ Success
        </Title>
        <Text size="sm" variant="success">
          Your changes have been saved successfully.
        </Text>
      </div>
      
      {/* Warning Card */}
      <div className="p-6 bg-warning-50 border border-warning-200 rounded-lg">
        <Title level={4} size="lg" variant="warning" className="mb-2">
          ⚠ Warning
        </Title>
        <Text size="sm" variant="warning">
          This action cannot be undone.
        </Text>
      </div>
      
      {/* Error Card */}
      <div className="p-6 bg-error-50 border border-error-200 rounded-lg">
        <Title level={4} size="lg" variant="error" className="mb-2">
          ✗ Error
        </Title>
        <Text size="sm" variant="error">
          There was an error processing your request.
        </Text>
      </div>
    </div>
  );
}
```

## 🌓 Dark Mode Support

The design system automatically supports dark mode:

```tsx
// Add dark mode class to your root element
<html className="dark">
  <body>
    {/* All components automatically adapt */}
    <Title level={1}>This text adapts to dark mode</Title>
    <Button variant="primary">This button too</Button>
  </body>
</html>
```

## 🔍 Troubleshooting

### Common Issues

1. **"Package not found"**
   - Make sure you've linked the package: `npm link @daniellauding/vromm-design-system`
   - Or publish it first: `npm publish`

2. **React Native peer dependency conflicts**
   - Use `--legacy-peer-deps` flag: `npm install @daniellauding/vromm-design-system --legacy-peer-deps`

3. **Styles not working in web**
   - Update to version 1.0.1 or later: `npm update @daniellauding/vromm-design-system`
   - CSS is now automatically bundled - no separate import needed!

4. **Colors not updating**
   - Check your CSS custom properties are properly defined
   - Make sure you're not overriding with more specific selectors

5. **TypeScript errors**
   - Make sure TypeScript is configured properly
   - Check that you're importing types correctly

## 📚 Advanced Usage

### Custom Component Wrapper
```tsx
// Create your own branded button
function MyBrandButton({ children, ...props }) {
  return (
    <Button 
      variant="primary" 
      className="shadow-lg transform hover:scale-105 transition-transform"
      {...props}
    >
      {children}
    </Button>
  );
}
```

### Theme Provider (Advanced)
```tsx
// For complex theming needs
import { createContext, useContext } from 'react';

const ThemeContext = createContext({
  primaryColor: '#0ea5e9',
  // ... other theme values
});

export function useTheme() {
  return useContext(ThemeContext);
}
```

## 🎯 Best Practices

1. **Accessibility**
   - Always provide meaningful labels for icon-only buttons
   - Use proper heading hierarchy (h1 → h2 → h3)
   - Test with screen readers

2. **Performance**
   - Import only the components you need
   - Use CSS custom properties for dynamic theming

3. **Consistency**
   - Stick to the design system variants
   - Use semantic color names (primary, success, error) not specific colors
   - Follow the size scale (xs, sm, md, lg)

4. **Maintenance**
   - Keep the design system updated
   - Document any customizations
   - Test across different devices and themes

## 🔄 **Publishing Workflow**

### **When do you need to republish?**

**✅ REPUBLISH REQUIRED:**
- Changes to `/src/components/` (Button, Title, Text components)
- Changes to `/src/tokens/` (colors, spacing, typography)
- Changes to `/src/hooks/` (useTheme, useTranslation)
- Changes to `/src/utils/` (utility functions)
- Changes to `package.json` (dependencies, version)

**❌ NO REPUBLISH NEEDED:**
- Changes to `/stories/` (Storybook files)
- Changes to `.storybook/` (Storybook configuration)
- Changes to `README.md` or documentation files
- Local development and testing

### **How to republish:**

```bash
# 1. Update version (choose one)
npm version patch  # For bug fixes (1.0.0 → 1.0.1)
npm version minor  # For new features (1.0.0 → 1.1.0)  
npm version major  # For breaking changes (1.0.0 → 2.0.0)

# 2. Build and publish
npm run build
npm publish

# That's it! 🎉
```

### **Check your published package:**
Visit: https://www.npmjs.com/package/@daniellauding/vromm-design-system

---

## 🎯 **Quick Reference Guide**

### **Title Component Props**
```tsx
<Title 
  level={1-6}              // Semantic heading level (h1-h6)
  size="xs|sm|base|lg|xl|2xl|3xl|4xl"  // Visual size
  weight="normal|medium|semibold|bold|extrabold"
  variant="default|weak|primary|success|warning|error"
  align="left|center|right"
  family="title|sans|mono" // Font family
  className="custom-classes"
>
  Your title text
</Title>
```

### **Text Component Props**  
```tsx
<Text 
  size="xs|sm|base|lg|xl"  // Visual size
  weight="normal|medium|semibold|bold"
  variant="default|weak|primary|success|warning|error"
  align="left|center|right"
  family="sans|mono"       // Font family
  as="span|p|div|label"    // HTML element
  className="custom-classes"
>
  Your text content
</Text>
```

### **Button Component Props**
```tsx
<Button 
  variant="primary|secondary|destructive|success"
  fill="solid|outline|text"
  size="xs|sm|md|lg"
  loading={boolean}
  disabled={boolean}
  fullWidth={boolean}
  icon={<IconComponent />}
  iconPosition="left|right"
  iconOnly={boolean}
  onClick={() => {}}
  className="custom-classes"
>
  Button text
</Button>
```

---

## 🚀 **Complete Working Examples**

### **React Web Project Setup**

```bash
# 1. Create new React project
npx create-react-app my-vromm-app
cd my-vromm-app

# 2. Install design system
npm install @daniellauding/vromm-design-system

# 3. Install icons (optional)
npm install lucide-react
```

**App.js:**
```tsx
import React from 'react';
// CSS is automatically included - no separate import needed!
import { Title, Text, Button } from '@daniellauding/vromm-design-system';
import { Play, Download, Heart, Settings } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Title level={1} size="4xl" weight="bold" align="center">
          🚀 My Vromm App
        </Title>
        
        <Text size="lg" variant="weak" align="center" className="mt-4">
          Built with the Vromm Design System
        </Text>

        {/* Hero Section */}
        <div className="mt-12 text-center">
          <Title level={2} size="2xl" className="mb-4">
            Ready to get started?
          </Title>
          
          <Text size="base" className="mb-8 max-w-2xl mx-auto">
            This is a complete example showing how to use Title, Text, and Button 
            components with icons, different variants, and responsive design.
          </Text>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" icon={<Play />}>
              Watch Demo
            </Button>
            
            <Button variant="secondary" size="lg" icon={<Download />}>
              Download
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Title level={3} size="lg" className="mb-3">
              ⚡ Fast Setup
            </Title>
            <Text size="sm" variant="weak" className="mb-4">
              Get started in minutes with our pre-built components.
            </Text>
            <Button variant="primary" fill="outline" size="sm" fullWidth>
              Learn More
            </Button>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Title level={3} size="lg" className="mb-3">
              🎨 Customizable
            </Title>
            <Text size="sm" variant="weak" className="mb-4">
              Easy brand customization with CSS custom properties.
            </Text>
            <Button variant="secondary" fill="outline" size="sm" fullWidth>
              Customize
            </Button>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Title level={3} size="lg" className="mb-3">
              📱 Responsive
            </Title>
            <Text size="sm" variant="weak" className="mb-4">
              Works perfectly on web and React Native.
            </Text>
            <Button variant="success" fill="outline" size="sm" fullWidth>
              Try Now
            </Button>
          </div>
        </div>

        {/* Button Showcase */}
        <div className="mt-16">
          <Title level={2} size="2xl" className="mb-8">Button Examples</Title>
          
          <div className="space-y-6">
            {/* Primary Actions */}
            <div>
              <Text size="sm" weight="medium" className="mb-3">Primary Actions:</Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Save Changes</Button>
                <Button variant="primary" icon={<Heart />}>Like Post</Button>
                <Button variant="primary" loading>Saving...</Button>
                <Button variant="primary" size="lg">Large Primary</Button>
              </div>
            </div>

            {/* Secondary Actions */}
            <div>
              <Text size="sm" weight="medium" className="mb-3">Secondary Actions:</Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary">Cancel</Button>
                <Button variant="secondary" fill="outline">Edit</Button>
                <Button variant="secondary" fill="text" icon={<Settings />}>Settings</Button>
                <Button variant="secondary" disabled>Disabled</Button>
              </div>
            </div>

            {/* Status Actions */}
            <div>
              <Text size="sm" weight="medium" className="mb-3">Status Actions:</Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="success">Confirm</Button>
                <Button variant="destructive">Delete</Button>
                <Button variant="success" fill="outline">Approve</Button>
                <Button variant="destructive" fill="text">Remove</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

### **React Native Project Setup**

```bash
# 1. Create new React Native project
npx react-native init MyVrommApp
cd MyVrommApp

# 2. Install design system  
npm install @daniellauding/vromm-design-system --legacy-peer-deps
```

**App.tsx:**
```tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Title, Text, Button } from '@daniellauding/vromm-design-system';
// Note: NO CSS import for React Native!

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header */}
          <Title level={1} size="3xl" weight="bold" align="center" style={styles.header}>
            📱 My Vromm App
          </Title>
          
          <Text size="lg" variant="weak" align="center" style={styles.subtitle}>
            React Native + Vromm Design System
          </Text>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Title level={2} size="xl" style={styles.heroTitle}>
              Native Mobile Experience
            </Title>
            
            <Text size="base" style={styles.heroText}>
              All components work seamlessly in React Native with proper 
              touch targets and mobile-optimized spacing.
            </Text>

            <View style={styles.heroButtons}>
              <Button variant="primary" size="lg" style={styles.heroButton}>
                Get Started
              </Button>
              
              <Button variant="secondary" size="lg" style={styles.heroButton}>
                Learn More
              </Button>
            </View>
          </View>

          {/* Feature Cards */}
          <View style={styles.featuresSection}>
            <Title level={2} size="lg" style={styles.sectionTitle}>
              Key Features
            </Title>

            {/* Feature 1 */}
            <View style={styles.featureCard}>
              <Title level={3} size="base" style={styles.featureTitle}>
                ⚡ Touch Optimized
              </Title>
              <Text size="sm" variant="weak" style={styles.featureText}>
                All components have proper touch targets for mobile.
              </Text>
              <Button variant="primary" fill="outline" size="sm" fullWidth style={styles.featureButton}>
                Try Now
              </Button>
            </View>

            {/* Feature 2 */}
            <View style={styles.featureCard}>
              <Title level={3} size="base" style={styles.featureTitle}>
                🎨 Theme Ready
              </Title>
              <Text size="sm" variant="weak" style={styles.featureText}>
                Supports light and dark themes automatically.
              </Text>
              <Button variant="secondary" fill="outline" size="sm" fullWidth style={styles.featureButton}>
                Explore
              </Button>
            </View>

            {/* Feature 3 */}
            <View style={styles.featureCard}>
              <Title level={3} size="base" style={styles.featureTitle}>
                📱 Cross Platform
              </Title>
              <Text size="sm" variant="weak" style={styles.featureText}>
                Same components work on iOS and Android.
              </Text>
              <Button variant="success" fill="outline" size="sm" fullWidth style={styles.featureButton}>
                Learn More
              </Button>
            </View>
          </View>

          {/* Button Examples */}
          <View style={styles.buttonsSection}>
            <Title level={2} size="lg" style={styles.sectionTitle}>
              Button Examples
            </Title>

            <Text size="sm" weight="medium" style={styles.subsectionTitle}>
              Different Variants:
            </Text>
            <View style={styles.buttonGroup}>
              <Button variant="primary" style={styles.exampleButton}>Primary</Button>
              <Button variant="secondary" style={styles.exampleButton}>Secondary</Button>
              <Button variant="success" style={styles.exampleButton}>Success</Button>
              <Button variant="destructive" style={styles.exampleButton}>Destructive</Button>
            </View>

            <Text size="sm" weight="medium" style={styles.subsectionTitle}>
              Different Fills:
            </Text>
            <View style={styles.buttonGroup}>
              <Button variant="primary" fill="solid" style={styles.exampleButton}>Solid</Button>
              <Button variant="primary" fill="outline" style={styles.exampleButton}>Outline</Button>
              <Button variant="primary" fill="text" style={styles.exampleButton}>Text</Button>
            </View>

            <Text size="sm" weight="medium" style={styles.subsectionTitle}>
              Different Sizes:
            </Text>
            <View style={styles.buttonGroup}>
              <Button size="xs" variant="secondary" style={styles.exampleButton}>XS</Button>
              <Button size="sm" variant="secondary" style={styles.exampleButton}>Small</Button>
              <Button size="md" variant="secondary" style={styles.exampleButton}>Medium</Button>
              <Button size="lg" variant="secondary" style={styles.exampleButton}>Large</Button>
            </View>

            <Text size="sm" weight="medium" style={styles.subsectionTitle}>
              States:
            </Text>
            <View style={styles.buttonGroup}>
              <Button loading style={styles.exampleButton}>Loading...</Button>
              <Button disabled style={styles.exampleButton}>Disabled</Button>
              <Button fullWidth style={styles.exampleButton}>Full Width</Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginTop: 20,
  },
  subtitle: {
    marginTop: 12,
  },
  heroSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  heroTitle: {
    marginBottom: 16,
  },
  heroText: {
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  heroButton: {
    flex: 1,
  },
  featuresSection: {
    marginTop: 48,
  },
  sectionTitle: {
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  featureTitle: {
    marginBottom: 8,
  },
  featureText: {
    marginBottom: 16,
  },
  featureButton: {
    marginTop: 8,
  },
  buttonsSection: {
    marginTop: 48,
  },
  subsectionTitle: {
    marginTop: 20,
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  exampleButton: {
    marginBottom: 8,
  },
});

export default App;
```

---

## ✅ **Quick Start Checklist**

### **React Web Setup:**
- [ ] `npm install @daniellauding/vromm-design-system`
- [ ] Import components: `import { Title, Text, Button } from '@daniellauding/vromm-design-system'`
- [ ] (Optional) Install icons: `npm install lucide-react`
- [ ] ✨ **CSS is automatically included - no separate import needed!**

### **React Native Setup:**
- [ ] `npm install @daniellauding/vromm-design-system --legacy-peer-deps`  
- [ ] Import components: `import { Title, Text, Button } from '@daniellauding/vromm-design-system'`
- [ ] **DO NOT** import CSS
- [ ] Use StyleSheet for additional styling

### **Publishing Updates:**
- [ ] Make component changes in `/src/`
- [ ] Run `npm version patch` (or minor/major)
- [ ] Run `npm run build && npm publish`
- [ ] Users can update with `npm update @daniellauding/vromm-design-system`

**🎉 That's it! You're ready to build beautiful UIs with the Vromm Design System!** 