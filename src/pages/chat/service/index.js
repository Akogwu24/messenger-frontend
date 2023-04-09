import http, { AUTH_ROUTES } from '../../../services/api';

export const searchUser = async (searchTerm, setLoading, setSearchedUsers) => {
  setLoading(true);
  try {
    const { data } = await http.get(AUTH_ROUTES.SEARCH_USERS(searchTerm));
    setSearchedUsers(data.users);
    console.log('sssss', data.users);
  } catch (e) {
    console.log(e.response);
  } finally {
    setLoading(false);
  }
};
