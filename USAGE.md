# Using the VROMM Design System

## ✅ Font Setup Required

The VROMM Design System uses the **Rubik** font family. You need to include it in your project for the design system to display correctly.

### Option 1: Add to HTML (Recommended)

Add this to your `public/index.html` file in the `<head>` section:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
```

### Option 2: Add to CSS (Alternative)

Add this import at the very top of your main CSS file (before any other CSS):

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
```

### Option 3: NPM Package (Advanced)

Install the font package:

```bash
npm install @fontsource/rubik
```

Then import it in your app entry point:

```javascript
import '@fontsource/rubik/300.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/600.css';
import '@fontsource/rubik/700.css';
import '@fontsource/rubik/800.css';
import '@fontsource/rubik/900.css';
```

## Basic Usage

Once you have the VROMM Design System installed and imported, you can start using the components:

```jsx
import React from 'react';
import { Button, Modal, Text, Title } from '@daniellauding/vromm-design-system';
import '@daniellauding/vromm-design-system/style.css';

function App() {
  return (
    <div>
      <Title size="2xl" variant="page-title">
        Welcome to VROMM
      </Title>
      <Text variant="body">
        This text will display in the beautiful Rubik font!
      </Text>
      <Button variant="primary" size="md">
        Click me
      </Button>
    </div>
  );
}
```

The Rubik font will now be applied automatically to all VROMM components.

## Installation

```bash
npm install @daniellauding/vromm-design-system
```

## Available Components

- **Button** - Various button styles and variants
- **Modal** - Flexible modal system
- **Typography** - Title and Text components
- **Forms** - Input, Select, Textarea, etc.
- **And many more...**

## Customization

The design system uses CSS custom properties (variables) for theming. You can override these in your own CSS to customize the appearance.

## Support

For issues, questions, or contributions, please refer to the project repository. 