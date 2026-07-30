import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  isLoading = false, 
  className = '', 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-wellness-500 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-wellness-600 hover:bg-wellness-700 text-white shadow-sm shadow-wellness-600/20",
    outline: "border-2 border-slate-200 bg-transparent hover:border-wellness-300 hover:bg-wellness-50 text-slate-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
    link: "bg-transparent text-wellness-600 hover:text-wellness-800 underline-offset-4 hover:underline p-0 h-auto"
  };

  const sizes = {
    default: "h-12 px-6",
    sm: "h-10 px-4 text-sm",
    link: "p-0"
  };

  const variantStyles = variants[variant] || variants.primary;
  // Determine size based on variant or explicitly passed size (if any)
  // Currently size isn't passed as prop, but if added later, it would override.
  const sizeStyles = variant === 'link' ? sizes.link : sizes.default;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default React.memo(Button);
