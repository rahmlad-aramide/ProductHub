import React from "react";
import { LoadingIndicator } from "../assets/svg";
import { ButtonProps } from "../definitions/types";

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  variant = "primary",
  type,
  onClick,
  loading,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`${className} ${
        variant === "outlined"
          ? "bg-transparent border border-grey-200 text-cuneutral-700"
          : "bg-primary-500 text-white"
      } h-10 text-sm md:text-base px-[14px] md:px-6 items-center justify-center flex font-medium rounded-[32px] disabled:cursor-not-allowed hover:scale-90 active:scale-100 transition duration-200`}
    >
      {loading ? <LoadingIndicator /> : children}
    </button>
  );
};
