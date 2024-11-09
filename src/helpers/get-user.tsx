export const getUser = () => {
  const user = localStorage.getItem('fingridAccount');
  return user ? JSON.parse(user) : null;
};
