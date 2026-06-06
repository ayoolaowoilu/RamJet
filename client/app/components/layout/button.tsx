interface ButtonProps {
  variant: "primary" | "secondary" | "outlined" | "loading";
  disabled?: boolean;
  onClick?: () => void;
  size: "sm" | "md" | "lg";
  text?: string | React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  disabled = false,
  onClick,
  size,
  text,
  className,
}) => {
  const baseStyles = "min-w-min py-2 px-4 m-1 rounded border-2 font-medium transition-all duration-200 focus:outline-2";

  const variantStyles = {
    primary: "bg-orange-700 text-white border-transparent outline-orange-700 hover:outline-2",
    secondary: "bg-black text-white border-transparent outline-gray-900 hover:outline-2",
    outlined: "bg-white text-orange-700 border-orange-700 border-double outline-orange-700 hover:outline-2",
    loading: "bg-gray-500 text-white border-transparent outline-gray-900 hover:outline-2 cursor-wait",
  };

  const sizeStyles = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
  };

  const isLoading = variant === "loading";
  const isDisabled = disabled || isLoading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""} border-2 border-white`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        text || "Button"
      )}
    </button>
  );
};

export default Button;