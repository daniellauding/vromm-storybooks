# Using @vromm/design-system in React Native

## Installation (Local Development)

Since the package isn't published yet, link it locally:

```bash
# In the design-system root
npm run build
npm link

# In your React Native project
npm link @daniellauding/vromm-design-system
```

## Installation (After Publishing)
```bash
npm install @daniellauding/vromm-design-system --legacy-peer-deps
```

## Usage

```tsx
import { Title, Text } from '@daniellauding/vromm-design-system';
// Note: Don't import CSS in React Native

export function MyComponent() {
  return (
    <>
      <Title level={1} size="2xl" weight="bold">Welcome</Title>
      <Text size="base">This works in React Native!</Text>
    </>
  );
}
``` 