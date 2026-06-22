"use client";

import { useEffect, ReactNode } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-full sm:max-w-2xl sm:rounded-3xl">
        <div className="flex shrink-0 items-center justify-between border-b border-charcoal/10 px-5 py-4 sm:px-6">
          <h2 className="text-[18px] font-medium text-charcoal">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/50 hover:bg-charcoal/5 hover:text-charcoal transition"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-charcoal/10 bg-[#f8f6f3] px-5 py-4 sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}