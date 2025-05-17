'use client'

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  overlayClassName?: string;
  modalContentClassName?: string;
  initialFocusRef?: null | React.RefObject<HTMLElement>;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  className = '',
  overlayClassName = '',
  modalContentClassName = '',
  initialFocusRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement> | undefined;

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = initialFocusRef?.current || focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      } else if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen, initialFocusRef]);

  // Handle outside click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
          onClick={handleOverlayClick}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          {/* Modal content */}
          <div
            ref={modalRef}
            className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl ${className}`}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold" id="modal-title">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Body */}
            <div className={`p-4 ${modalContentClassName}`} aria-describedby={title ? "modal-title" : undefined}>
              {children}
            </div>

            {/* Footer (optional) */}
            {!title && (
              <div className="absolute top-2 right-2">
                <button
                  onClick={onClose}
                  className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Modal;