import { errorToast, successToast } from '../../../components/NotificationHandler';
import http, { AUTH_ROUTES } from '../../../services/api';

export const searchUser = async (searchTerm, setLoading, setSearchedUsers) => {
  setLoading(true);
  try {
    const { data } = await http.get(AUTH_ROUTES.SEARCH_USERS(searchTerm));
    setSearchedUsers(data.users);
  } catch (e) {
    console.log(e.response);
  } finally {
    setLoading(false);
  }
};

export const createChat = async (setLoading, userId, onClose, setSelectedChat, chats, setChats) => {
  setLoading(true);
  try {
    const { data } = await http.post(AUTH_ROUTES.CREATE_CHAT, { userId });

    if (!chats.find((chat) => chat._id === data._id)) setChats([data.fullChat, ...chats]);
    setSelectedChat(data.fullChat);
    console.log('data', data.fullChat);
    onClose();
  } catch (e) {
    errorToast();
    console.log(e.response);
  } finally {
    setLoading(false);
  }
};

export const getChats = async (setLoadingChats, setChats) => {
  setLoadingChats(true);
  try {
    const { data } = await http.get(AUTH_ROUTES.GET_CHATS);
    setChats(data.results);
  } catch (e) {
    console.log(e.response);
  } finally {
    setLoadingChats(false);
  }
};

export const createGroupChat = async (payload, setLoading, onClose) => {
  setLoading(true);
  try {
    const { data } = await http.post(AUTH_ROUTES.CREAT_GROUP_CHAT, payload);
    console.log('data', data);
    successToast('Group Created Successfully');
    onClose();
  } catch (e) {
    console.log(e.reponse);
    errorToast();
  } finally {
    setLoading(false);
  }
};

export const updateGroupChatName = async (payload, setUpdatingGroupName, onClose, setRefresh) => {
  setUpdatingGroupName(true);
  try {
    const { data } = await http.put(AUTH_ROUTES.RENAME_GROUP_CHAT, payload);
    console.log(data);
    successToast();
    setRefresh();
    onClose();
  } catch (e) {
    console.log(e.response);
    errorToast();
  } finally {
    setUpdatingGroupName(false);
  }
};
