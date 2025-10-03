import React, { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();


const ACTIONS = {
  SET_USERS: 'SET_USERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};


const initialState = {
  users: [],
  loading: false,
  error: null
};


const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null
      };
    case ACTIONS.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        )
      };
    case ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};


export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = {
    ...state,
    dispatch,
    actions: ACTIONS
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

