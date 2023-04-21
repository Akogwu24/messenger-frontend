import { errorToast, successToast } from '../../../components/NotificationHandler';
import http, { AUTH_ROUTES } from '../../../services/api';

export const registerUser = async (setLoading, payload) => {
  try {
    const { data } = await http.post(AUTH_ROUTES.REGISTER_USER, payload);

    successToast(data.success);
  } catch (e) {
    errorToast(e.response.data.message);
  } finally {
    setLoading(false);
  }
};

export const login = async (setLoading, payload, navigate) => {
  setLoading(true);
  try {
    const { data } = await http.post(AUTH_ROUTES.LOGIN, payload);

    localStorage.setItem('userInfo', JSON.stringify(data));
    successToast('User successfully logged in');
    navigate('/chats');
  } catch (e) {
    errorToast(e.response.data.message);
  } finally {
    setLoading(false);
  }
};
