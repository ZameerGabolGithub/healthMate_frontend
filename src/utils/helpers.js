export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const getToken = () => localStorage.getItem('healthmate_token');
export const setToken = (token) => localStorage.setItem('healthmate_token', token);
export const removeToken = () => localStorage.removeItem('healthmate_token');

export const getUser = () => {
  const user = localStorage.getItem('healthmate_user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => localStorage.setItem('healthmate_user', JSON.stringify(user));
export const removeUser = () => localStorage.removeItem('healthmate_user');
