'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { useModal } from '@/libs/hooks/useLocalStorage';
import { useLocalStorage } from '@/libs/hooks/useLocalStorage';
// import Image from 'next/image';

const avatars = [
  { id: 1, src: '/avatars/avatar1.png', alt: 'Avatar 1' },
  { id: 2, src: '/avatars/avatar2.png', alt: 'Avatar 2' },
  { id: 3, src: '/avatars/avatar3.png', alt: 'Avatar 3' },
  { id: 4, src: '/avatars/avatar4.png', alt: 'Avatar 4' },
  { id: 5, src: '/avatars/avatar5.png', alt: 'Avatar 5' },
  { id: 6, src: '/avatars/avatar6.png', alt: 'Avatar 6' },
];

type UserData = {
  name: string;
  email: string;
  avatar: string;
  bio: string;
};

const UserModal: React.FC<{ children?: (props: { openModal: () => void }) => React.ReactNode }> = ({ children }) => {
  const { isOpen, openModal, closeModal } = useModal(false);
  const [userData, setUserData] = useLocalStorage<UserData>('userData', {
    name: '',
    email: '',
    avatar: '',
    bio: '',
  });
  const [selectedAvatar, setSelectedAvatar] = useState(userData.avatar || '');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (avatarSrc: string) => {
    setSelectedAvatar(avatarSrc);
    setUserData(prev => ({ ...prev, avatar: avatarSrc }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
  };

return (
    <>
      {children ? children({ openModal }) : (
        <button
          onClick={openModal}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Edit Profile
        </button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Edit Your Profile"
        modalContentClassName="space-y-4"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Choose Avatar</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {avatars.map(avatar => (
                <div
                  key={avatar.id}
                  onClick={() => handleAvatarSelect(avatar.src)}
                  className={`p-1 border-2 rounded-full cursor-pointer ${
                    selectedAvatar === avatar.src ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  {/* <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    className="w-full rounded-full"
                  /> */}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UserModal;