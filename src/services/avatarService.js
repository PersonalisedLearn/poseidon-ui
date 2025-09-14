/**
 * Service for generating avatar URLs using DiceBear's Avataaars API
 * API Docs: https://avatars.dicebear.com/docs/http-api/avataaars.html
 */

const AVATAR_API_BASE = 'https://api.dicebear.com/7.x/avataaars/svg';

/**
 * Generate an avatar URL using DiceBear's Avataaars API
 * @param {string} username - The username to generate avatar for
 * @param {string} [name] - Fallback name if username is not available
 * @param {string} [gender] - Optional gender ('male' or 'female')
 * @returns {string} The generated avatar URL
 */
export const getAvatarUrl = (username, name, gender = '') => {
  const seed = username || name || 'default';
  const params = new URLSearchParams();
  
  // Add seed for consistent avatars
  params.append('seed', seed);
  
  // Add gender if specified
  if (gender && ['male', 'female'].includes(gender.toLowerCase())) {
    params.append('gender', gender.toLowerCase());
  }
  
  // Add some default styling
  params.append('backgroundColor', 'b6e3f4,ffd5dc,d5d7e1,f0d986,85daef,92e1c0,9cbbf9,ffb5cf');
  params.append('backgroundType', 'gradientLinear');
  params.append('radius', '25');
  
  return `${AVATAR_API_BASE}?${params.toString()}`;
};

/**
 * Get avatar URL for a user object
 * @param {Object} user - The user object
 * @param {string} [user.username] - The user's username
 * @param {string} [user.name] - The user's display name (fallback)
 * @param {string} [user.firstName] - The user's first name (fallback)
 * @param {string} [user.avatar] - Custom avatar URL (if available)
 * @param {string} [user.gender] - User's gender ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY')
 * @returns {string} The avatar URL
 */
export const getUserAvatar = (user = {}) => {
  // Return custom avatar if available
  if (user?.avatar) {
    return user.avatar;
  }
  
  // Map application gender values to API's expected values
  let genderParam = '';
  if (user?.gender) {
    const genderMap = {
      'MALE': 'male',
      'FEMALE': 'female',
      'OTHER': 'female', // Default to female for non-binary/other
      'PREFER_NOT_TO_SAY': '' // Omit gender if user prefers not to say
    };
    genderParam = genderMap[user.gender] || '';
  }
  
  // Use username, name, or firstName as seed
  const seed = user?.username || user?.name || user?.firstName || 'user';
  return getAvatarUrl(seed, null, genderParam);
};

export default {
  getAvatarUrl,
  getUserAvatar
};
