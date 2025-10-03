import { useEffect } from 'react';
import axios from 'axios';
import { useUsers } from '../context/UserContext';

const useUserData = () => {
  const { dispatch, actions } = useUsers();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: actions.SET_LOADING, payload: true });
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        
        dispatch({
          type: actions.SET_USERS,
          payload: response.data
        });
      } catch (error) {
        console.error('Error fetching users:', error);
        dispatch({
          type: actions.SET_ERROR,
          payload: 'Failed to fetch users. Please try again later.'
        });
      }
    };

    fetchUsers();
  }, [dispatch, actions]);

  return null; 
};

export default useUserData;

