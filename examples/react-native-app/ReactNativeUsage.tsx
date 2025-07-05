// React Native Usage Example
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Import Vromm Design System components (NO CSS import for React Native)
import { Title, Text } from '@vromm/design-system';

export function ReactNativeExample() {
  return (
    <View style={styles.container}>
      {/* Main Title */}
      <Title 
        level={1} 
        size="4xl" 
        weight="bold" 
        variant="primary"
        style={styles.mainTitle}
      >
        Welcome to Vromm
      </Title>

      {/* Subtitle */}
      <Title 
        level={2} 
        size="xl" 
        weight="medium" 
        variant="secondary"
        style={styles.subtitle}
      >
        Your Driving Companion
      </Title>

      {/* Description */}
      <Text 
        size="base" 
        variant="secondary"
        style={styles.description}
      >
        Discover amazing driving routes, share your experiences, and connect with other drivers in your area.
      </Text>

      {/* Feature list */}
      <View style={styles.featureList}>
        <Text size="sm" weight="medium" style={styles.featureText}>
          ✓ Discover scenic routes
        </Text>
        <Text size="sm" weight="medium" style={styles.featureText}>
          ✓ Share your adventures
        </Text>
        <Text size="sm" weight="medium" style={styles.featureText}>
          ✓ Connect with drivers
        </Text>
      </View>

      {/* Different text variants */}
      <View style={styles.variantSection}>
        <Text size="sm" variant="primary" style={styles.variantText}>
          Primary text variant
        </Text>
        <Text size="sm" variant="secondary" style={styles.variantText}>
          Secondary text variant
        </Text>
        <Text size="sm" variant="success" style={styles.variantText}>
          Success text variant
        </Text>
        <Text size="sm" variant="warning" style={styles.variantText}>
          Warning text variant
        </Text>
        <Text size="sm" variant="error" style={styles.variantText}>
          Error text variant
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  mainTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featureList: {
    marginBottom: 32,
  },
  featureText: {
    marginBottom: 8,
  },
  variantSection: {
    marginTop: 20,
  },
  variantText: {
    marginBottom: 8,
  },
});

// Usage in your splash screen:
/*
import { Title, Text } from '@vromm/design-system';

// Replace your existing text components:
<Title 
  level={1} 
  size="5xl" 
  weight="bold" 
  variant="primary"
  style={{ color: 'white', textAlign: 'center' }}
>
  {t('auth.signIn.title')}
</Title>

<Text 
  size="lg" 
  style={{ color: 'white', textAlign: 'center' }}
>
  {t('auth.signIn.slogan')}
</Text>
*/ 