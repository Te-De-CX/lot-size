'use client';

import React from 'react';
import Modal from './Modal';
import { useLocalStorage } from '@/libs/hooks/useLocalStorage';
import { useModal } from '@/libs/hooks/useLocalStorage';

const CookieModal = () => {
  const [cookiesAccepted, setCookiesAccepted] = useLocalStorage<boolean>('cookiesAccepted', false);
  const { isOpen, closeModal } = useModal(!cookiesAccepted);

  const handleAccept = () => {
    setCookiesAccepted(true);
    closeModal();
  };

  const handleDecline = () => {
    setCookiesAccepted(false);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Cookie Consent"
      closeOnOutsideClick={false}
    >
      <div className="space-y-4">
        <p>
          We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CookieModal;