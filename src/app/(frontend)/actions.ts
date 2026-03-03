import api from '../../api';
import { error } from 'console';

export const getUser = async () => {
  try {
    const { data } = await api.get('/users/me');
    console.log('data: ', data);
    return data.user || null;
  } catch {
    console.error('Error fetching current user:', error);
    return null;
  }
};
