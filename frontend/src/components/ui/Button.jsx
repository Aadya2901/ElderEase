import React from "react";

export function Button({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) {
  // 🎨 VARIANTS
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
    secondary: "bg-gray-200 hover:bg-gray-300",
  };

  // 📏 SIZES
  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1 text-xs",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center rounded-md font-medium
        transition-all duration-200
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.default}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}