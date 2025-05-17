'use client';

import React from 'react';
import Modal from './Modal';
import { useLocalStorage } from '@/libs/hooks/useLocalStorage';
import { useModal } from '@/libs/hooks/useLocalStorage';

type Settings = {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  fontSize: 'small' | 'medium' | 'large';
};

const SettingsModal = () => {
  const { isOpen, openModal, closeModal } = useModal(false);
  const [settings, setSettings] = useLocalStorage<Settings>('appSettings', {
    theme: 'system',
    notifications: true,
    fontSize: 'medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <>
      <button
        onClick={openModal}
        className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700"
        aria-label="Settings"
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Settings"
        modalContentClassName="space-y-4"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
              Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div>
            <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
              Font Size
            </label>
            <select
              id="fontSize"
              name="fontSize"
              value={settings.fontSize}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              id="notifications"
              name="notifications"
              type="checkbox"
              checked={settings.notifications}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="notifications" className="ml-2 text-sm font-medium text-gray-700">
              Enable Notifications
            </label>
          </div>

          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingsModal;