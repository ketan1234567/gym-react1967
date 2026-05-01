import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export function Sheet({ open, onOpenChange, children, side = 'right' }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !open) return null;

  const positionClass = side === 'right' ? 'right-0' : side === 'left' ? 'left-0' : '';

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className={`fixed inset-y-0 ${positionClass} z-50 w-full max-w-sm bg-white shadow-xl flex flex-col`}>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function SheetHeader({ className = '', children }) {
  return (
    <div className={`flex flex-col space-y-2 p-6 border-b ${className}`}>
      {children}
    </div>
  );
}

export function SheetTitle({ className = '', children }) {
  return (
    <h2 className={`text-lg font-semibold ${className}`}>
      {children}
    </h2>
  );
}

export function SheetContent({ className = '', children }) {
  return (
    <div className={`flex-1 overflow-y-auto p-6 ${className}`}>
      {children}
    </div>
  );
}

export function SheetFooter({ className = '', children }) {
  return (
    <div className={`border-t p-6 flex justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
}
