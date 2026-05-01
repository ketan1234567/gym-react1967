import { useState } from 'react';

export function Tabs({ defaultValue, value, onValueChange, className = '', children }) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (val) => {
    if (onValueChange) onValueChange(val);
    else setInternalValue(val);
  };

  return (
    <div className={className} data-value={currentValue}>
      {typeof children === 'function'
        ? children({ value: currentValue, onValueChange: handleValueChange })
        : Array.isArray(children)
        ? children.map((child) => {
            if (child.type?.displayName === 'TabsList') {
              return <child.type key="list" {...child.props} value={currentValue} onValueChange={handleValueChange} />;
            }
            if (child.type?.displayName === 'TabsContent') {
              if (child.props.value === currentValue) return child;
              return null;
            }
            return child;
          })
        : children}
    </div>
  );
}

Tabs.displayName = 'Tabs';

export function TabsList({ value, onValueChange, className = '', children, ...props }) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500 ${className}`} role="tablist" {...props}>
      {Array.isArray(children) && children.map((child) => (
        <child.type
          key={child.props.value}
          {...child.props}
          isActive={value === child.props.value}
          onClick={() => onValueChange(child.props.value)}
        />
      ))}
    </div>
  );
}

TabsList.displayName = 'TabsList';

export function TabsTrigger({ value, isActive, onClick, className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none cursor-pointer ${
        isActive
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-900'
      } ${className}`}
      role="tab"
      data-state={isActive ? 'active' : 'inactive'}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

TabsTrigger.displayName = 'TabsTrigger';

export function TabsContent({ value, className = '', children, ...props }) {
  return (
    <div className={`mt-2 focus-visible:outline-none ${className}`} role="tabpanel" {...props}>
      {children}
    </div>
  );
}

TabsContent.displayName = 'TabsContent';
