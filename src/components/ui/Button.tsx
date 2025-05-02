import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  disabled = false,
  type = "button",
  fullWidth = false,
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-poppins font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-fitness-600 hover:bg-fitness-700 text-white focus:ring-fitness-500",
    secondary:
      "bg-energy-500 hover:bg-energy-600 text-white focus:ring-energy-400",
    outline:
      "bg-transparent border border-fitness-500 text-fitness-600 hover:bg-fitness-50 focus:ring-fitness-400",
  };

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      whileTap={{ scale: 0.98 }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export const IconButton = ({
  icon,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ariaLabel,
}: {
  icon: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  ariaLabel: string;
}) => {
  const baseClasses =
    "flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-fitness-600 hover:bg-fitness-700 text-white focus:ring-fitness-500",
    secondary:
      "bg-energy-500 hover:bg-energy-600 text-white focus:ring-energy-400",
    outline:
      "bg-transparent border border-fitness-500 text-fitness-600 hover:bg-fitness-50 focus:ring-fitness-400",
  };

  const sizeClasses = {
    sm: "p-1.5 text-sm",
    md: "p-2 text-base",
    lg: "p-2.5 text-lg",
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.button>
  );
};
