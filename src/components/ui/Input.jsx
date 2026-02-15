
const Input = ({
  label,
  type = "text",
  placeholder,
  name,
  register,
  validation,
  error,
  className = "",
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        {...(register && register(name, validation))}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${className}`}
        {...rest}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message || error}
        </p>
      )}
    </div>
  );
};

export default Input;
