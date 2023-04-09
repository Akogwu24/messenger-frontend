export const AUTH_ROUTES = {
  REGISTER_USER: '/user',
  LOGIN: '/user/login',

  SEARCH_USERS: (searchTerm) => `/user?search=${searchTerm}`,
};
