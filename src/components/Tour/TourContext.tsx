import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CallBackProps, STATUS, Step, EVENTS, ACTIONS, Placement } from 'react-joyride';

export interface TourStep {
  id: string;
  title_en: string;
  title_sv?: string;
  text_en: string;
  text_sv?: string;
  target: string;
  placement?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  disableBeacon?: boolean;
  spotlightClicks?: boolean;
  image_url?: string;
  icon?: string;
  icon_color?: string;
  order: number;
  active: boolean;
  tour_type: 'onboarding' | 'feature' | 'help' | 'component' | 'storybook';
  trigger_condition?: string;
  action_type?: 'button' | 'link' | 'demo' | 'test';
  action_label_en?: string;
  action_label_sv?: string;
  action_function?: string;
  action_params?: unknown;
  requires_auth?: boolean;
  user_type?: 'all' | 'logged_in' | 'logged_out' | 'premium';
  category_id?: string;
  created_at: string;
  updated_at: string;
}

export interface TourOptions {
  theme?: 'light' | 'dark' | 'auto';
  language?: 'en' | 'sv';
  showProgress?: boolean;
  showSkipButton?: boolean;
  continuous?: boolean;
  debug?: boolean;
  styles?: any;
}

export interface TourContextType {
  isRunning: boolean;
  stepIndex: number;
  tourSteps: Step[];
  currentTourType: string | null;
  currentLanguage: string;
  theme: 'light' | 'dark';
  options: TourOptions;
  
  // Tour control functions
  startTour: (tourType?: string, steps?: TourStep[]) => void;
  stopTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  resetTour: () => void;
  handleJoyrideCallback: (data: CallBackProps) => void;
  
  // Configuration functions
  setTourOptions: (options: Partial<TourOptions>) => void;
  setLanguage: (language: 'en' | 'sv') => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  
  // Utility functions
  shouldShowTour: boolean;
  markTourCompleted: (tourType: string) => void;
  markTourSkipped: (tourType: string) => void;
  executeStepAction: (step: TourStep) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
  defaultOptions?: Partial<TourOptions>;
  defaultLanguage?: 'en' | 'sv';
  defaultTheme?: 'light' | 'dark' | 'auto';
}

export const TourProvider: React.FC<TourProviderProps> = ({ 
  children,
  defaultOptions = {},
  defaultLanguage = 'en',
  defaultTheme = 'auto'
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [tourSteps, setTourSteps] = useState<Step[]>([]);
  const [currentTourType, setCurrentTourType] = useState<string | null>(null);
  const [shouldShowTour, setShouldShowTour] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [theme, setThemeState] = useState<'light' | 'dark'>(
    defaultTheme === 'auto' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : defaultTheme
  );
  const [options, setOptionsState] = useState<TourOptions>({
    theme: defaultTheme,
    language: defaultLanguage,
    showProgress: true,
    showSkipButton: true,
    continuous: true,
    debug: false,
    ...defaultOptions
  });

  // Auto-detect theme changes
  useEffect(() => {
    if (options.theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setThemeState(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [options.theme]);

  // Utility function to convert TourStep to Joyride Step
  const convertToJoyrideStep = (tourStep: TourStep): Step => {
    const title = tourStep[`title_${currentLanguage}` as keyof TourStep] || tourStep.title_en;
    const text = tourStep[`text_${currentLanguage}` as keyof TourStep] || tourStep.text_en;

    return {
      target: tourStep.target,
      content: (
        <div className="tour-step-content">
          <div className="flex items-center gap-2 mb-2">
            {tourStep.icon && <span className="text-2xl">{tourStep.icon}</span>}
            <h3 className="text-lg font-semibold" style={{ color: tourStep.icon_color || '#3498db' }}>
              {String(title)}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {String(text)}
          </p>
          {tourStep.image_url && (
            <img 
              src={tourStep.image_url} 
              alt={String(title)} 
              className="mt-2 rounded-lg max-w-full h-auto"
            />
          )}
        </div>
      ),
      placement: (tourStep.placement || 'auto') as Placement,
      disableBeacon: tourStep.disableBeacon || false,
      styles: {
        options: {
          primaryColor: tourStep.icon_color || '#3498db',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 8,
          padding: 16,
        },
        tooltipContent: {
          padding: 0,
        },
      },
    };
  };

  // Start tour function
  const startTour = (tourType: string = 'storybook', steps?: TourStep[]) => {
    if (steps) {
      const joyrideSteps = steps
        .filter(step => step.active)
        .sort((a, b) => a.order - b.order)
        .map(convertToJoyrideStep);
      
      setTourSteps(joyrideSteps);
      setCurrentTourType(tourType);
      setStepIndex(0);
      setIsRunning(true);
      setShouldShowTour(true);
    }
  };

  // Stop tour
  const stopTour = () => {
    setIsRunning(false);
    setStepIndex(0);
    setShouldShowTour(false);
  };

  // Skip tour
  const skipTour = () => {
    setIsRunning(false);
    setStepIndex(0);
    setShouldShowTour(false);
    if (currentTourType) {
      markTourSkipped(currentTourType);
    }
  };

  // Navigate steps
  const nextStep = () => {
    if (stepIndex < tourSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const resetTour = () => {
    setStepIndex(0);
  };

  // Configuration functions
  const setTourOptions = (newOptions: Partial<TourOptions>) => {
    setOptionsState(prev => ({ ...prev, ...newOptions }));
  };

  const setLanguage = (language: 'en' | 'sv') => {
    setCurrentLanguage(language);
    setTourOptions({ language });
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    if (newTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    } else {
      setThemeState(newTheme);
    }
    setTourOptions({ theme: newTheme });
  };

  // Handle Joyride callbacks
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      if (status === STATUS.FINISHED && currentTourType) {
        markTourCompleted(currentTourType);
      }
      setIsRunning(false);
      setStepIndex(0);
      setShouldShowTour(false);
    } else if (([STATUS.RUNNING] as string[]).includes(status)) {
      if (type === 'step:after') {
        if (action === 'next') {
          if (index < tourSteps.length - 1) {
            setStepIndex(index + 1);
          } else {
            // Tour completed
            setIsRunning(false);
            setStepIndex(0);
            setShouldShowTour(false);
            if (currentTourType) {
              markTourCompleted(currentTourType);
            }
          }
        } else if (action === 'prev' && index > 0) {
          setStepIndex(index - 1);
        } else if (action === 'close' || action === 'skip') {
          setIsRunning(false);
          setStepIndex(0);
          setShouldShowTour(false);
        }
      } else if (type === 'step:before') {
        setStepIndex(index);
      }
    }
  };

  // Simple state management for Storybook (no persistence)
  const markTourCompleted = (tourType: string) => {
    console.log(`Tour "${tourType}" completed`);
  };

  const markTourSkipped = (tourType: string) => {
    console.log(`Tour "${tourType}" skipped`);
  };

  const executeStepAction = (step: TourStep) => {
    if (step.action_function) {
      console.log(`Executing action: ${step.action_function}`, step.action_params);
    }
  };

  return (
    <TourContext.Provider
      value={{
        isRunning,
        stepIndex,
        tourSteps,
        currentTourType,
        currentLanguage,
        theme,
        options,
        startTour,
        stopTour,
        nextStep,
        prevStep,
        skipTour,
        resetTour,
        handleJoyrideCallback,
        setTourOptions,
        setLanguage,
        setTheme,
        shouldShowTour,
        markTourCompleted,
        markTourSkipped,
        executeStepAction,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}; 