'use client';

import React from 'react';
import { useLocalStorage } from '@/libs/hooks/useLocalStorage';
import UserModal from '../modal/UserModal';
import Image from 'next/image';

const ProfileHeader = () => {
  const [userData] = useLocalStorage('userData', {
    name: '',
    email: '',
    avatar: '',
    bio: '',
  });

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <div className="relative group">
        {userData.avatar ? (
          <Image
            src={userData.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-blue-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <UserModal>
            {({ openModal }) => (
              <button
                onClick={openModal}
                className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
                aria-label="Edit profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            )}
          </UserModal>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {userData.name || 'Anonymous User'}
        </h2>
        {userData.email && (
          <p className="text-gray-600 mt-1">{userData.email}</p>
        )}
        {userData.bio && (
          <p className="text-gray-700 mt-2 max-w-md">{userData.bio}</p>
        )}
      </div>

      <div className="mt-4">
        <UserModal>
          {({ openModal }) => (
            <button
              onClick={openModal}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </UserModal>
      </div>
    </div>
  );
};

export default ProfileHeader;