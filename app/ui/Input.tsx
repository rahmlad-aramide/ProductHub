import React from "react";
import { InputProps } from "../definitions/types";

export const Input: React.FC<InputProps> = ({
  id,
  name,
  value,
  type,
  onChange,
  placeholder,
  className,
  isDisabled,
}) => {
  return (
    <input
      id={id}
      name={name}
      disabled={isDisabled || false}
      onChange={onChange}
      className={`${className} transition duration-200 outline-none flex w-full text-sm placeholder:text-grey-200 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:ring-1 text-paragraph p-2`}
      type={type}
      value={value}
      placeholder={placeholder}
    />
  );
};
