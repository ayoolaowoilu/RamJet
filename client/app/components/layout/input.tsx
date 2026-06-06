interface InputProps {
  variant?: "default" | "outlined" | "filled" | "error";
  disabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  value?: string;
  type?: "text" | "email" | "password" | "number";
  label?: string | React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  variant = "default",
  disabled = false,
  onChange,
  onBlur,
  onFocus,
  size = "md",
  placeholder,
  value,
  type = "text",
  label,
  error,
  required = false,
  className,
  name,
}) => {
  const baseStyles = "w-full rounded border font-medium transition-all duration-200 focus:outline-2 bg-white";

  const variantStyles = {
    default: "border-gray-300 text-gray-900 outline-orange-700 hover:border-gray-400 focus:border-orange-700",
    outlined: "border-orange-700 border-2 text-gray-900 outline-orange-700 focus:bg-orange-50",
    filled: "bg-gray-100 border-transparent text-gray-900 outline-gray-900 hover:bg-gray-200 focus:bg-white focus:border-gray-300",
    error: "border-red-500 border-2 text-red-900 outline-red-500 bg-red-50 focus:bg-white",
  };

  const sizeStyles = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-5",
  };

  const isError = variant === "error" || error;

  return (
    <div className={`flex flex-col gap-1 ${className || ""}`}>
      {label && (
        <label className={`text-sm font-semibold ${isError ? "text-red-600" : "text-gray-700"}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
  
        onBlur={onBlur}
        onFocus={onFocus}
        className={`
          ${baseStyles}
          ${variantStyles[error ? "error" : variant]}
          ${sizeStyles[size]}
          ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}
        `}
      />
      
      {error && !variant.includes("error") && (
        <span className="text-sm text-red-600 font-medium">{error}</span>
      )}
    </div>
  );
};

export default Input;