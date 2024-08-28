"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Notification,
  NotificationContextType,
  NotificationType,
} from "../definitions/types";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = (message: string, type: NotificationType) => {
    setNotification({ message, type, autoClose: true });
    setTimeout(() => setNotification(null), 3000);
  };

  const action = (
    message: string,
    type: NotificationType,
    link: string,
    linkText: string,
  ) => {
    setNotification({ message, type, link, linkText, autoClose: false });
  };

  const close = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ notify, action, close }}>
      {children}
      {notification && (
        <NotificationComponent
          message={notification.message}
          type={notification.type}
          link={notification.link}
          linkText={notification.linkText}
          autoClose={notification.autoClose}
          onClose={close}
        />
      )}
    </NotificationContext.Provider>
  );
};

// Notification Component
interface NotificationProps extends Notification {
  onClose: () => void;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  message,
  type,
  link,
  linkText,
  autoClose,
  onClose,
}) => {
  const getBackgroundColor = (type: Notification["type"]): string => {
    switch (type) {
      case "error":
        return "#ffcccc"; // Light red
      case "success":
        return "#ccffcc"; // Light green
      case "warn":
        return "#fff3cd"; // Light yellow
      case "inform":
        return "#cce5ff"; // Light blue
      default:
        return "#ffffff"; // Default to white if none match
    }
  };

  const getTextColor = (type: Notification["type"]): string => {
    switch (type) {
      case "error":
        return "#ff0000"; // Red
      case "success":
        return "#008000"; // Green
      case "warn":
        return "#856404"; // Dark yellow
      case "inform":
        return "#004085"; // Dark blue
      default:
        return "#000000"; // Default to black if none match
    }
  };

  const getIcon = (type: Notification["type"]): JSX.Element => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#008000"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 17l-5-5 1.41-1.41L10 13.17l7.59-7.59L19 7l-9 9z" />
          </svg>
        );
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#ff0000"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
      case "warn":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#856404"
            viewBox="0 0 24 24"
          >
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
        );
      case "inform":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#004085"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        );
      default:
        return <></>;
    }
  };

  const notificationStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "50px",
    backgroundColor: getBackgroundColor(type),
    color: getTextColor(type),
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    zIndex: 1000,
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div style={notificationStyle}>
      {getIcon(type)}
      <div>
        <div>{message}</div>
        {link && linkText && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {linkText}
          </a>
        )}
      </div>
      {!autoClose && (
        <button
          className="ml-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default NotificationComponent;
