
'use client';

import React from 'react';
import CookieModal from '@/layouts/components/modal/CookieModal';
import NotificationModal from '@/layouts/components/modal/NotificationModal';
import ProfileHeader from '@/layouts/components/profile/ProfileHeader';
import SettingsModal from '@/layouts/components/modal/SettingsModal';

const App = () => {
  const [notification, setNotification] = React.useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  const showNotification = () => {
    setNotification({
      message: 'Profile updated successfully!',
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My App</h1>
          <SettingsModal />
        </header>

        <ProfileHeader />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <p className="text-gray-700 mb-4">
            Welcome to your personalized dashboard. Here you can see all your activities and updates.
          </p>
          <button
            onClick={showNotification}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Test Notification
          </button>
        </div>
      </div>

      {/* Global modals */}
      <CookieModal />
      {notification && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
};

export default App;