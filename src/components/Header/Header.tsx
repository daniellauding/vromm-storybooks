import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Bell, 
  MessageCircle,
  Search,
  Globe,
  User
} from 'lucide-react';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Avatar } from '../Avatar/Avatar';
import { VrommLogo } from '../VrommLogo/VrommLogo';
import './Header.scss';

export interface HeaderNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface HeaderMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}

export interface HeaderLogo {
  src?: string;
  alt?: string;
  component?: React.ReactNode;
  href?: string;
}

export interface HeaderNavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  dropdown?: {
    items: Array<{
      id: string;
      label: string;
      href?: string;
      onClick?: () => void;
      badge?: string;
      icon?: React.ReactNode;
    }>;
  };
  badge?: string;
  icon?: React.ReactNode;
}

export interface HeaderUser {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface HeaderProps {
  /** Header variant */
  variant?: 'app' | 'website';
  /** Logo configuration */
  logo?: HeaderLogo;
  /** Navigation items */
  navigation?: HeaderNavItem[];
  /** User information */
  user?: HeaderUser;
  /** Notifications */
  notifications?: HeaderNotification[];
  /** Messages */
  messages?: HeaderMessage[];
  /** Show search */
  showSearch?: boolean;
  /** Header background style */
  background?: 'white' | 'transparent' | 'blur' | 'dark';
  /** Show border */
  showBorder?: boolean;
  /** Sticky positioning */
  sticky?: boolean;
  /** Action buttons */
  actions?: React.ReactNode;
  /** Language selector */
  language?: {
    current: string;
    options: Array<{
      code: string;
      label: string;
      flag?: string;
    }>;
    onChange: (code: string) => void;
  };
  /** Mobile menu open state */
  mobileMenuOpen?: boolean;
  /** Mobile menu toggle handler */
  onMobileMenuToggle?: (open: boolean) => void;
  /** Notification click handler */
  onNotificationClick?: (notification: HeaderNotification) => void;
  /** Message click handler */
  onMessageClick?: (message: HeaderMessage) => void;
  /** Clear all notifications */
  onClearNotifications?: () => void;
  /** Clear all messages */
  onClearMessages?: () => void;
  /** Custom className */
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  variant = 'app',
  logo,
  navigation = [],
  user,
  notifications = [],
  messages = [],
  showSearch = false,
  background = 'white',
  showBorder = true,
  sticky = false,
  actions,
  language,
  mobileMenuOpen = false,
  onMobileMenuToggle,
  onNotificationClick,
  onMessageClick,
  onClearNotifications,
  onClearMessages,
  className,
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const renderLogo = () => {
    if (logo?.component) {
      return logo.component;
    }
    
    if (logo?.src) {
      const logoContent = (
        <img 
          src={logo.src} 
          alt={logo.alt || 'Logo'} 
          className="vromm-header__logo-image"
        />
      );
      
      if (logo.href) {
        return (
          <a href={logo.href} className="vromm-header__logo-link">
            {logoContent}
          </a>
        );
      }
      
      return logoContent;
    }
    
    // Default to VrommLogo
    const defaultLogo = <VrommLogo size="sm" showWordmark={variant === 'website'} />;
    
    if (logo?.href || variant === 'website') {
      return (
        <a href={logo?.href || '/'} className="vromm-header__logo-link">
          {defaultLogo}
        </a>
      );
    }
    
    return defaultLogo;
  };

  const renderNotificationDropdown = () => (
    <div className="vromm-header__dropdown">
      <div className="vromm-header__dropdown-header">
        <h3>Notifications</h3>
        {notifications.length > 0 && (
          <Button 
            variant="tertiary" 
            size="sm" 
            onClick={onClearNotifications}
          >
            Clear All
          </Button>
        )}
      </div>
      
      <div className="vromm-header__dropdown-content">
        {notifications.length === 0 ? (
          <div className="vromm-header__dropdown-empty">
            <Bell size={24} />
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`vromm-header__notification-item ${
                !notification.read ? 'vromm-header__notification-item--unread' : ''
              }`}
              onClick={() => onNotificationClick?.(notification)}
            >
              <div className="vromm-header__notification-content">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <time>{notification.time}</time>
              </div>
              {!notification.read && (
                <div className="vromm-header__notification-indicator" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderMessageDropdown = () => (
    <div className="vromm-header__dropdown">
      <div className="vromm-header__dropdown-header">
        <h3>Messages</h3>
        {messages.length > 0 && (
          <Button 
            variant="tertiary" 
            size="sm"
            onClick={onClearMessages}
          >
            Clear All
          </Button>
        )}
      </div>
      
      <div className="vromm-header__dropdown-content">
        {messages.length === 0 ? (
          <div className="vromm-header__dropdown-empty">
            <MessageCircle size={24} />
            <p>No messages</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`vromm-header__message-item ${
                !message.read ? 'vromm-header__message-item--unread' : ''
              }`}
              onClick={() => onMessageClick?.(message)}
            >
              <Avatar
                src={message.avatar}
                fallback={message.sender.charAt(0)}
                size="sm"
              />
              <div className="vromm-header__message-content">
                <h4>{message.sender}</h4>
                <p>{message.message}</p>
                <time>{message.time}</time>
              </div>
              {!message.read && (
                <div className="vromm-header__message-indicator" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const baseClasses = [
    'vromm-header',
    `vromm-header--${variant}`,
    `vromm-header--${background}`,
    sticky && 'vromm-header--sticky',
    showBorder && 'vromm-header--bordered',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={baseClasses}>
      <div className="vromm-header__container">
        {/* Logo */}
        <div className="vromm-header__logo">
          {renderLogo()}
        </div>

        {/* Desktop Navigation */}
        <nav className="vromm-header__nav">
          {navigation.map((item) => (
            <div key={item.id} className="vromm-header__nav-item">
              {item.dropdown ? (
                <div className="vromm-header__dropdown-wrapper">
                  <button
                    className="vromm-header__nav-button"
                    onClick={() => toggleDropdown(item.id)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && <Badge variant="secondary" size="sm">{item.badge}</Badge>}
                    <ChevronDown size={16} />
                  </button>
                  
                  {openDropdowns.includes(item.id) && (
                    <div className="vromm-header__dropdown">
                      {item.dropdown.items.map((dropdownItem) => (
                        <a
                          key={dropdownItem.id}
                          href={dropdownItem.href}
                          onClick={dropdownItem.onClick}
                          className="vromm-header__dropdown-item"
                        >
                          {dropdownItem.icon}
                          <span>{dropdownItem.label}</span>
                          {dropdownItem.badge && (
                            <Badge variant="secondary" size="sm">
                              {dropdownItem.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="vromm-header__nav-link"
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && <Badge variant="secondary" size="sm">{item.badge}</Badge>}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="vromm-header__actions">
          {/* Language Selector */}
          {language && (
            <div className="vromm-header__language">
              <button className="vromm-header__language-button">
                <Globe size={16} />
                <span>{language.current}</span>
              </button>
            </div>
          )}

          {/* Custom Actions */}
          {actions}

          {/* Messages */}
          <div className="vromm-header__dropdown-wrapper">
            <button
              className="vromm-header__action-button"
              onClick={() => setIsMessageOpen(!isMessageOpen)}
            >
              <MessageCircle size={20} />
              {unreadMessages > 0 && (
                <Badge 
                  variant="error" 
                  size="sm" 
                  className="vromm-header__notification-badge"
                >
                  {unreadMessages}
                </Badge>
              )}
            </button>
            
            {isMessageOpen && renderMessageDropdown()}
          </div>

          {/* Notifications */}
          <div className="vromm-header__dropdown-wrapper">
            <button
              className="vromm-header__action-button"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <Badge 
                  variant="error" 
                  size="sm" 
                  className="vromm-header__notification-badge"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </button>
            
            {isNotificationOpen && renderNotificationDropdown()}
          </div>

          {/* User Menu */}
          {user && (
            <div className="vromm-header__dropdown-wrapper">
              <button
                className="vromm-header__user-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <Avatar
                  src={user.avatar}
                  fallback={user.name.charAt(0)}
                  size="sm"
                />
              </button>
              
              {isUserMenuOpen && (
                <div className="vromm-header__dropdown vromm-header__dropdown--user">
                  <div className="vromm-header__user-info">
                    <Avatar
                      src={user.avatar}
                      fallback={user.name.charAt(0)}
                      size="md"
                    />
                    <div>
                      <h4>{user.name}</h4>
                      {user.email && <p>{user.email}</p>}
                      {user.role && <span className="vromm-header__user-role">{user.role}</span>}
                    </div>
                  </div>
                  
                  <div className="vromm-header__dropdown-divider" />
                  
                  <a href="/profile" className="vromm-header__dropdown-item">
                    <User size={16} />
                    <span>Profile</span>
                  </a>
                  <a href="/settings" className="vromm-header__dropdown-item">
                    <span>Settings</span>
                  </a>
                  <a href="/logout" className="vromm-header__dropdown-item">
                    <span>Sign Out</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="vromm-header__mobile-toggle"
            onClick={() => onMobileMenuToggle?.(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="vromm-header__mobile-menu">
          <nav className="vromm-header__mobile-nav">
            {navigation.map((item) => (
              <div key={item.id} className="vromm-header__mobile-nav-item">
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="vromm-header__mobile-nav-link"
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && <Badge variant="secondary" size="sm">{item.badge}</Badge>}
                </a>
                
                {item.dropdown && (
                  <div className="vromm-header__mobile-dropdown">
                    {item.dropdown.items.map((dropdownItem) => (
                      <a
                        key={dropdownItem.id}
                        href={dropdownItem.href}
                        onClick={dropdownItem.onClick}
                        className="vromm-header__mobile-dropdown-item"
                      >
                        {dropdownItem.icon}
                        <span>{dropdownItem.label}</span>
                        {dropdownItem.badge && (
                          <Badge variant="secondary" size="sm">
                            {dropdownItem.badge}
                          </Badge>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}; 