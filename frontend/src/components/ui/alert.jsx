import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const variants = {
  default: 'bg-white border-gray-200 text-gray-900',
  destructive: 'bg-red-50 border-red-200 text-red-900',
  success: 'bg-green-50 border-green-200 text-green-900',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  info: 'bg-blue-50 border-blue-200 text-blue-900'
};

const icons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info
};

export function Alert({ className = '', variant = 'default', children, ...props }) {
  const Icon = icons[variant];
  return (
    <div
      className={`relative flex gap-3 rounded-lg border p-4 ${variants[variant]} ${className}`}
      role="alert"
      {...props}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-sm">{children}</div>
    </div>
  );
}

export function AlertTitle({ className = '', children }) {
  return (
    <h5 className={`mb-1 font-medium leading-none tracking-tight ${className}`}>
      {children}
    </h5>
  );
}

export function AlertDescription({ className = '', children }) {
  return (
    <div className={`text-sm opacity-90 ${className}`}>
      {children}
    </div>
  );
}
