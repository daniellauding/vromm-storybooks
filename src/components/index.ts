// Import component styles
import './Button/Button.scss';
import './Typography/Typography.scss';
import './Modal/Modal.scss';
import './Forms/Forms.scss';
import './Icon/Icon.scss';
import './Dropdown/Dropdown.scss';
import './Tooltip/Tooltip.scss';
import './Popover/Popover.scss';
import './Toast/Toast.scss';
import './Carousel/Carousel.scss';
import './Badge/Badge.scss';
import './Card/Card.scss';
import './Label/Label.scss';
import './Header/Header.scss';
import './Footer/Footer.scss';
import './SystemAlert/SystemAlert.scss';

// Component exports
export { Button, LinkButton } from './Button';
export { Modal, AlertModal } from './Modal';
export { Icon } from './Icon';
export { Dropdown } from './Dropdown';
export { Tooltip } from './Tooltip';
export { Popover } from './Popover';
export { Toast, ToastProvider } from './Toast';
export { Carousel } from './Carousel';
export { Badge } from './Badge';
export { DatePicker } from './DatePicker';
export { MultiSelect } from './MultiSelect';
export { Chip } from './Chip';
export { Label } from './Label';
export { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle, 
  CardDescription 
} from './Card';
export { Skeleton } from './Skeleton';

// Typography components
export { Title } from './Typography/Title';
export { Text } from './Typography/Text';

// Form components
export { 
  Input, 
  TextArea, 
  Select, 
  Checkbox, 
  Switch, 
  FileUpload, 
  Slider,
  Search
} from './Forms';

// New Data Display Components
export { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableHeaderCell 
} from './Table';

export { 
  List, 
  ListItem,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails
} from './List';

export { 
  Accordion, 
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from './Accordion';

export { 
  Tabs, 
  TabsList,
  TabsTrigger,
  TabsContent
} from './Tabs';

export { 
  Avatar, 
  AvatarImage,
  AvatarFallback,
  AvatarGroup
} from './Avatar';

// Layout components
export { Header } from './Header';
export { Footer } from './Footer';
export { SystemAlert } from './SystemAlert';

// Re-export types for convenience
export type { ButtonProps, LinkButtonProps } from './Button';
export type { ModalProps, AlertModalProps } from './Modal';
export type { IconProps } from './Icon';
export type { DropdownProps } from './Dropdown';
export type { TooltipProps } from './Tooltip';
export type { PopoverProps } from './Popover';
export type { ToastProps } from './Toast';
export type { CarouselProps } from './Carousel';
export type { BadgeProps } from './Badge';
export type { DatePickerProps } from './DatePicker';
export type { MultiSelectProps, MultiSelectOption } from './MultiSelect';
export type { ChipProps } from './Chip';
export type { LabelProps } from './Label';
export type { 
  CardProps, 
  CardHeaderProps, 
  CardContentProps, 
  CardFooterProps, 
  CardTitleProps, 
  CardDescriptionProps 
} from './Card';
export type { SkeletonProps } from './Skeleton';
export type { TitleProps } from './Typography/Title';
export type { TextProps } from './Typography/Text';
export type { 
  InputProps, 
  TextAreaProps, 
  SelectProps, 
  CheckboxProps, 
  SwitchProps, 
  FileUploadProps, 
  SliderProps,
  SearchProps,
  SearchOption
} from './Forms';

// New Data Display Component Types
export type { 
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableHeaderCellProps
} from './Table';

export type { 
  ListProps,
  ListItemProps,
  DescriptionListProps,
  DescriptionTermProps,
  DescriptionDetailsProps
} from './List';

export type { 
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps
} from './Accordion';

export type { 
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps
} from './Tabs';

export type { 
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarGroupProps
} from './Avatar';

// Layout component types
export type { 
  HeaderProps, 
  HeaderLogo, 
  HeaderNavItem, 
  HeaderButton,
  HeaderDropdown
} from './Header';

export type { 
  FooterProps, 
  FooterLogo, 
  FooterLink, 
  FooterSection,
  FooterCTA,
  FooterSocial
} from './Footer';

export type { 
  SystemAlertProps, 
  SystemAlertAction
} from './SystemAlert';

// Utils
export { cn } from '../utils/cn';
export { 
  transformMediaForCard, 
  transformMediaWithDetection,
  isLocalFile,
  isVideoFile,
  getFileExtension,
  type UserMediaItem 
} from '../utils/mediaTransformers';

// Branding
export * from './VrommLogo';
