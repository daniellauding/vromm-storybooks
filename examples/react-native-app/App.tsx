import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Title, Text, useTheme, useTranslation } from '@vromm/design-system';

// Note: Don't import the CSS file in React Native
// import '@vromm/design-system/dist/style.css'; // ❌ Don't do this

function App(): JSX.Element {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t, changeLanguage, language } = useTranslation();

  const styles = createStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor}
      />
      
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Title style={styles.headerTitle}>
            {t('examples.welcome')}
          </Title>
          
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleTheme}
            >
              <Text style={styles.buttonText}>
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const languages = ['en', 'sv', 'es'];
                const currentIndex = languages.indexOf(language);
                const nextIndex = (currentIndex + 1) % languages.length;
                changeLanguage(languages[nextIndex]);
              }}
            >
              <Text style={styles.buttonText}>
                {language === 'en' ? '🇺🇸 EN' : language === 'sv' ? '🇸🇪 SV' : '🇪🇸 ES'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.description}>
            {t('examples.description')}
          </Text>

          {/* Typography Examples */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>
              Typography Examples
            </Title>
            
            <View style={styles.card}>
              <Title style={styles.cardTitle}>
                All Heading Levels
              </Title>
              
              <View style={styles.cardContent}>
                <Title style={[styles.text, { fontSize: 28, fontWeight: 'bold' }]}>
                  Heading 1
                </Title>
                <Title style={[styles.text, { fontSize: 24, fontWeight: '600' }]}>
                  Heading 2
                </Title>
                <Title style={[styles.text, { fontSize: 20, fontWeight: '600' }]}>
                  Heading 3
                </Title>
                <Title style={[styles.text, { fontSize: 18, fontWeight: '500' }]}>
                  Heading 4
                </Title>
                <Title style={[styles.text, { fontSize: 16, fontWeight: '500' }]}>
                  Heading 5
                </Title>
                <Title style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>
                  Heading 6
                </Title>
              </View>
            </View>

            <View style={styles.card}>
              <Title style={styles.cardTitle}>
                Text Variants
              </Title>
              
              <View style={styles.cardContent}>
                <Text style={[styles.text, { color: isDark ? '#f8fafc' : '#0f172a' }]}>
                  Primary text - main content
                </Text>
                <Text style={[styles.text, { color: isDark ? '#cbd5e1' : '#475569' }]}>
                  Secondary text - supporting content
                </Text>
                <Text style={[styles.text, { color: isDark ? '#94a3b8' : '#64748b' }]}>
                  Tertiary text - less important
                </Text>
                <Text style={[styles.text, { color: '#22c55e' }]}>
                  Success text - positive actions
                </Text>
                <Text style={[styles.text, { color: '#f59e0b' }]}>
                  Warning text - attention needed
                </Text>
                <Text style={[styles.text, { color: '#ef4444' }]}>
                  Error text - problems or issues
                </Text>
              </View>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>
              {t('examples.features.title')}
            </Title>
            
            <View style={styles.featuresGrid}>
              {[
                { key: 'responsive', icon: '📱' },
                { key: 'darkMode', icon: '🌙' },
                { key: 'i18n', icon: '🌍' },
                { key: 'a11y', icon: '♿' },
                { key: 'typescript', icon: '📘' },
                { key: 'storybook', icon: '📚' },
              ].map(({ key, icon }) => (
                <View key={key} style={styles.featureCard}>
                  <Text style={styles.featureIcon}>{icon}</Text>
                  <Title style={styles.featureTitle}>
                    {t(`examples.features.${key}`)}
                  </Title>
                  <Text style={styles.featureDescription}>
                    Feature description for {t(`examples.features.${key}`)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#334155' : '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDark ? '#f8fafc' : '#0f172a',
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: isDark ? '#cbd5e1' : '#475569',
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: isDark ? '#f8fafc' : '#0f172a',
    marginBottom: 16,
  },
  card: {
    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: isDark ? '#334155' : '#e2e8f0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: isDark ? '#f8fafc' : '#0f172a',
    marginBottom: 12,
  },
  cardContent: {
    gap: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    borderWidth: 1,
    borderColor: isDark ? '#334155' : '#e2e8f0',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: isDark ? '#f8fafc' : '#0f172a',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: isDark ? '#94a3b8' : '#64748b',
    lineHeight: 16,
  },
});

export default App; 