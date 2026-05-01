export function Separator({ className = '', orientation = 'horizontal' }) {
  if (orientation === 'vertical') {
    return <div className={`inline-block h-full w-px bg-gray-200 ${className}`} />;
  }
  return <div className={`h-px w-full bg-gray-200 ${className}`} />;
}
