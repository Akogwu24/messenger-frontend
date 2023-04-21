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

export const updateGroupChatName = async (payload, setUpdatingGroupName, onClose, setRefresh, setSelectedChat) => {
  setUpdatingGroupName(true);
  try {
    const { data } = await http.put(AUTH_ROUTES.RENAME_GROUP_CHAT, payload);
    successToast('Group Successfully Updated');
    setSelectedChat(data);
    setRefresh();
    await onClose();
  } catch (e) {
    console.log(e.response);
    setRefresh();
    errorToast();
  } finally {
    setUpdatingGroupName(false);
  }
};

export const addNewMemberToGroupChat = async (payload, setUpdatingGroup) => {
  setUpdatingGroup(true);
  try {
    const { data } = await http.put(AUTH_ROUTES.ADD_NEW_MEMBER_TO_GROUP, payload);
    console.log('data', data);
    successToast(data.message);
  } catch (e) {
    console.log(e.response);
    errorToast();
  } finally {
    setUpdatingGroup(false);
  }
};

export const removeMemberFromGroup = async (payload, setSelectedUsersList, setUpdatingGroup) => {
  setUpdatingGroup(true);
  try {
    const { data } = await http.put(AUTH_ROUTES.REMOVE_MEMBER_FROM_GROUP, payload);
    console.log('data', data);
    successToast(data.message);
    setSelectedUsersList(data.removed.users);
  } catch (e) {
    console.log(e.response);
    errorToast();
  } finally {
    setUpdatingGroup(false);
  }
};
