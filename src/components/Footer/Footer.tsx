import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';
import { ExternalLink } from 'lucide-react';
import './Footer.scss';

export interface FooterLogo {
  src?: string;
  alt?: string;
  href?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  component?: React.ReactNode;
}

export interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  disabled?: boolean;
  badge?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterCTA {
  title: string;
  description: string;
  button: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary';
    icon?: React.ComponentType<{ className?: string }>;
  };
  background?: 'default' | 'gradient' | 'dark' | 'primary';
}

export interface FooterSocial {
  platform: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface FooterProps {
  /**
   * Footer variant
   */
  variant?: 'default' | 'minimal' | 'extended';
  /**
   * Logo configuration
   */
  logo?: FooterLogo;
  /**
   * Description text
   */
  description?: string;
  /**
   * Footer sections
   */
  sections?: FooterSection[];
  /**
   * Social media links
   */
  social?: FooterSocial[];
  /**
   * Call-to-action section
   */
  cta?: FooterCTA;
  /**
   * Copyright text (year will be auto-added)
   */
  copyright?: string;
  /**
   * Additional bottom links (privacy, terms, etc.)
   */
  bottomLinks?: FooterLink[];
  /**
   * Language/locale selector
   */
  languageSelector?: {
    current: string;
    options: Array<{
      code: string;
      label: string;
      onClick?: () => void;
    }>;
  };
  /**
   * Background style
   */
  background?: 'white' | 'gray' | 'dark' | 'primary';
  /**
   * Border style
   */
  border?: 'none' | 'top' | 'shadow';
  /**
   * Custom CSS classes
   */
  className?: string;
  /**
   * Additional content
   */
  children?: React.ReactNode;
}

/**
 * Footer component with multiple layouts and configurations.
 * Supports logos, multi-section navigation, CTA sections, social links, and mobile responsiveness.
 */
export const Footer: React.FC<FooterProps> = ({
  variant = 'default',
  logo = {
    src: '/logo_vromm.svg',
    alt: 'VROMM Logo',
    href: '/'
  },
  description,
  sections = [],
  social = [],
  cta,
  copyright,
  bottomLinks = [],
  languageSelector,
  background = 'white',
  border = 'top',
  className,
  children,
}) => {
  const currentYear = new Date().getFullYear();

  const handleLogoClick = () => {
    if (logo?.onClick) {
      logo.onClick();
    } else if (logo?.href) {
      window.location.href = logo.href;
    }
  };

  const handleLinkClick = (link: FooterLink) => {
    if (link.href && !link.onClick) {
      if (link.external) {
        window.open(link.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = link.href;
      }
    } else if (link.onClick) {
      link.onClick();
    }
  };

  const renderLogo = () => {
    if (!logo) return null;

    const logoContent = logo.component ? logo.component : (
      <img
        src={logo.src || '/logo_vromm.svg'}
        alt={logo.alt || 'VROMM Logo'}
        width={logo.width}
        height={logo.height}
        className="vromm-footer__logo-image"
      />
    );

    if (logo.href || logo.onClick) {
      return (
        <button
          onClick={handleLogoClick}
          className="vromm-footer__logo-button"
        >
          {logoContent}
        </button>
      );
    }

    return logoContent;
  };

  const renderCTA = () => {
    if (!cta) return null;

    return (
      <div className={cn(
        "vromm-footer__cta",
        `vromm-footer__cta--${cta.background || 'default'}`
      )}>
        <div className="vromm-footer__container">
          <div className="vromm-footer__cta-content">
            <div className="vromm-footer__cta-text">
              <h2 className="vromm-footer__cta-title">{cta.title}</h2>
              <p className="vromm-footer__cta-description">{cta.description}</p>
            </div>
            <div className="vromm-footer__cta-action">
              <Button
                variant={cta.button.variant || 'primary'}
                size="lg"
                onClick={cta.button.onClick}
                href={cta.button.href}
                icon={cta.button.icon}
                className="vromm-footer__cta-button"
              >
                {cta.button.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    if (variant === 'minimal') {
      return (
        <div className="vromm-footer__minimal">
          <div className="vromm-footer__minimal-left">
            {logo && (
              <div className="vromm-footer__logo">
                {renderLogo()}
              </div>
            )}
            {description && (
              <p className="vromm-footer__description">{description}</p>
            )}
          </div>
          
          <div className="vromm-footer__minimal-right">
            {sections.length > 0 && (
              <nav className="vromm-footer__minimal-nav">
                {sections.flatMap(section => section.links).map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleLinkClick(link)}
                    disabled={link.disabled}
                    className={cn(
                      "vromm-footer__minimal-link",
                      link.disabled && "vromm-footer__minimal-link--disabled"
                    )}
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3 ml-1" />}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="vromm-footer__main">
        {/* Logo and Description */}
        <div className="vromm-footer__brand">
          {logo && (
            <div className="vromm-footer__logo">
              {renderLogo()}
            </div>
          )}
          
          {description && (
            <p className="vromm-footer__description">{description}</p>
          )}

          {/* Social Links */}
          {social.length > 0 && (
            <div className="vromm-footer__social">
              {social.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vromm-footer__social-link"
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        {sections.length > 0 && (
          <div className="vromm-footer__sections">
            {sections.map((section, index) => (
              <div key={index} className="vromm-footer__section">
                <h3 className="vromm-footer__section-title">{section.title}</h3>
                <nav className="vromm-footer__section-nav">
                  {section.links.map((link, linkIndex) => (
                    <button
                      key={linkIndex}
                      onClick={() => handleLinkClick(link)}
                      disabled={link.disabled}
                      className={cn(
                        "vromm-footer__section-link",
                        link.disabled && "vromm-footer__section-link--disabled"
                      )}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="vromm-footer__section-link-badge">
                          {link.badge}
                        </span>
                      )}
                      {link.external && <ExternalLink className="w-3 h-3 ml-1" />}
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        )}

        {/* Additional Content */}
        {children && (
          <div className="vromm-footer__custom">
            {children}
          </div>
        )}
      </div>
    );
  };

  const renderBottom = () => {
    if (variant === 'minimal' && !copyright && !bottomLinks.length && !languageSelector) {
      return null;
    }

    return (
      <div className="vromm-footer__bottom">
        <div className="vromm-footer__bottom-left">
          {/* Language Selector */}
          {languageSelector && (
            <div className="vromm-footer__language">
              <select
                className="vromm-footer__language-select"
                value={languageSelector.current}
                onChange={(e) => {
                  const selected = languageSelector.options.find(
                    option => option.code === e.target.value
                  );
                  if (selected?.onClick) {
                    selected.onClick();
                  }
                }}
              >
                {languageSelector.options.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Copyright */}
          {copyright && (
            <div className="vromm-footer__copyright">
              © {currentYear} {copyright}. All rights reserved.
            </div>
          )}
        </div>

        {/* Bottom Links */}
        {bottomLinks.length > 0 && (
          <nav className="vromm-footer__bottom-nav">
            {bottomLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link)}
                disabled={link.disabled}
                className={cn(
                  "vromm-footer__bottom-link",
                  link.disabled && "vromm-footer__bottom-link--disabled"
                )}
              >
                {link.label}
                {link.external && <ExternalLink className="w-3 h-3 ml-1" />}
              </button>
            ))}
          </nav>
        )}
      </div>
    );
  };

  return (
    <footer className={cn(
      "vromm-footer",
      `vromm-footer--${variant}`,
      `vromm-footer--bg-${background}`,
      `vromm-footer--border-${border}`,
      className
    )}>
      {/* CTA Section */}
      {renderCTA()}

      {/* Main Footer Content */}
      <div className="vromm-footer__content">
        <div className="vromm-footer__container">
          {renderMainContent()}
        </div>
      </div>

      {/* Bottom Section */}
      {renderBottom() && (
        <div className="vromm-footer__bottom-section">
          <div className="vromm-footer__container">
            {renderBottom()}
          </div>
        </div>
      )}
    </footer>
  );
};

Footer.displayName = 'Footer'; 