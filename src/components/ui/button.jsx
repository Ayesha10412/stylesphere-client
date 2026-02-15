export const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  ...rest
}) => {
  // Base style
  const baseStyle =
    "rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";

  // Variants (colors)
  const variants = {
    primary: "bg-green-500 hover:bg-green-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    outline:
      "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
  };

  // Sizes
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
