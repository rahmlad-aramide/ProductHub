export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  onDelete: (id: number) => void;
}

export interface InputProps {
  id: string;
  name: string;
  value: string;
  type: React.HTMLInputTypeAttribute;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
  disabled?: boolean;
  variant?: "primary" | "text" | "outlined";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  loading?: boolean;
}

export interface BreadcrumbLink {
  label: string;
  url: string;
}

export interface BreadcrumbProps {
  links: BreadcrumbLink[];
}

export type NotificationType = "success" | "error" | "inform" | "warn";
export interface Notification {
  message: string;
  type: NotificationType;
  link?: string;
  linkText?: string;
  autoClose?: boolean;
}

export interface NotificationContextType {
  notify: (message: string, type: NotificationType) => void;
  action: (
    message: string,
    type: NotificationType,
    link: string,
    linkText: string
  ) => void;
  close: () => void;
}
