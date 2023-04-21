export const AUTH_ROUTES = {
  REGISTER_USER: '/user',
  LOGIN: '/user/login',

  SEARCH_USERS: (searchTerm) => `/user?search=${searchTerm}`,

  //chat
  CREATE_CHAT: '/chat',
  GET_CHATS: '/chat',
  CREAT_GROUP_CHAT: '/chat/group',
  RENAME_GROUP_CHAT: '/chat/group',
  ADD_NEW_MEMBER_TO_GROUP: '/chat/groupadd',
  REMOVE_MEMBER_FROM_GROUP: '/chat/groupremove',
};
