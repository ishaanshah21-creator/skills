export const getAvatarUrl = (profilePicture) => {
  // Use default avatar if no profile picture is provided or if it's a placeholder URL
  if (!profilePicture || profilePicture.includes('placeholder') || profilePicture.includes('via.placeholder')) {
    return '/default-avatar.svg';
  }
  return profilePicture;
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
