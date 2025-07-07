import React from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useTour } from './TourContext';

export interface TourProps {
  className?: string;
}

export const Tour: React.FC<TourProps> = ({ className }) => {
  const {
    isRunning,
    stepIndex,
    tourSteps,
    handleJoyrideCallback,
    currentLanguage,
    theme,
    options,
  } = useTour();

  // Don't render if no steps or not running
  if (!isRunning || tourSteps.length === 0) {
    return null;
  }

  // Custom labels for different languages
  const labels = {
    back: currentLanguage === 'sv' ? 'Tillbaka' : 'Back',
    close: currentLanguage === 'sv' ? 'Stäng' : 'Close',
    last: currentLanguage === 'sv' ? 'Slutför' : 'Finish',
    next: currentLanguage === 'sv' ? 'Nästa' : 'Next',
    open: currentLanguage === 'sv' ? 'Öppna dialog' : 'Open the dialog',
    skip: currentLanguage === 'sv' ? 'Hoppa över' : 'Skip tour'
  };

  // Dynamic styles based on theme
  const getThemeStyles = () => {
    const baseStyles = {
      options: {
        primaryColor: '#3498db',
        width: undefined,
        zIndex: 10000,
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      spotlight: {
        borderRadius: '8px',
      },
      tooltip: {
        borderRadius: '12px',
        fontSize: '15px',
        fontFamily: 'inherit',
        padding: '16px',
        maxWidth: '360px',
        minWidth: '260px',
        position: 'relative' as const,
        boxSizing: 'border-box' as const,
        lineHeight: '1.4',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? '#f9fafb' : '#1f2937',
      },
      tooltipContainer: {
        textAlign: 'left' as const,
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'visible' as const,
      },
      tooltipTitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '6px',
        color: theme === 'dark' ? '#f9fafb' : '#1f2937',
        lineHeight: '1.3',
      },
      tooltipContent: {
        fontSize: '13px',
        lineHeight: '1.4',
        color: theme === 'dark' ? '#d1d5db' : '#4b5563',
      },
      buttonNext: {
        backgroundColor: '#3498db',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        color: '#ffffff',
      },
      buttonBack: {
        marginRight: '12px',
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: 'transparent',
        border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '10px 16px',
        cursor: 'pointer',
        transition: 'all 0.2s',
      },
      buttonSkip: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 16px',
        transition: 'color 0.2s',
      },
      beacon: {
        inner: '#3498db',
        outer: '#3498db',
      },
      // Mobile-specific styles
      '@media (max-width: 768px)': {
        tooltip: {
          maxWidth: 'calc(100vw - 20px)',
          minWidth: '280px',
          width: 'calc(100vw - 20px)',
          padding: '16px',
          fontSize: '14px',
          margin: '0 10px',
          left: '10px !important',
          right: '10px !important',
          transform: 'none !important',
          position: 'fixed' as const,
        },
        tooltipContainer: {
          maxWidth: 'calc(100vw - 20px)',
          width: '100%',
          margin: '0',
          padding: '0',
        },
        tooltipTitle: {
          fontSize: '16px',
          lineHeight: '1.4',
        },
        tooltipContent: {
          fontSize: '13px',
          lineHeight: '1.4',
        },
        buttonNext: {
          fontSize: '13px',
          padding: '8px 14px',
          minWidth: '70px',
        },
        buttonBack: {
          fontSize: '13px',
          padding: '8px 12px',
          minWidth: '60px',
          marginRight: '8px',
        },
        buttonSkip: {
          fontSize: '13px',
          padding: '8px 12px',
          minWidth: '50px',
        },
      },
    };

    // Merge with custom styles if provided
    return options.styles ? { ...baseStyles, ...options.styles } : baseStyles;
  };

  return (
    <div className={className}>
      <Joyride
        steps={tourSteps}
        run={isRunning}
        stepIndex={stepIndex}
        continuous={options.continuous !== false}
        showProgress={options.showProgress !== false}
        showSkipButton={options.showSkipButton !== false}
        spotlightClicks={true}
        disableOverlayClose={false}
        disableScrollParentFix={false}
        hideCloseButton={false}
        scrollToFirstStep={false}
        floaterProps={{
          disableAnimation: true,
          styles: {
            floater: {
              filter: 'none',
            },
          },
          options: {
            preventOverflow: {
              boundariesElement: 'viewport',
              padding: 20,
            },
            flip: {
              enabled: true,
            },
            offset: {
              enabled: true,
              offset: '0, 10px',
            },
          },
        }}
        locale={{ labels } as any}
        styles={getThemeStyles()}
        callback={handleJoyrideCallback}
        debug={options.debug || false}
      />
    </div>
  );
};

Tour.displayName = 'Tour'; 