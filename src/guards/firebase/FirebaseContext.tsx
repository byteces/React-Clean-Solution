import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

export interface InitialStateType {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
}

const initialState: InitialStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: InitialStateType, action: any) => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext<any | null>({
  ...initialState,
  platform: 'ASP.NET Core',
  signup: () => Promise.resolve(),
  signin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  onceGetUsers: () => Promise.resolve(),
  CreateUser: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      // You can decode the token here to get user information
      const decodedToken = decodeToken(token);

      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: true,
          user: {
            id: decodedToken.userId,
            // Include other user properties as needed
          },
        },
      });
    } else {
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  const decodeToken = (token: string) => {
    // You'll need to use a library or a custom function to decode the JWT token
    // For example, you can use the 'jsonwebtoken' library
    // import jwt from 'jsonwebtoken';
    // const decoded = jwt.decode(token);
    // return decoded;

    // This is a simplified example, replace it with your actual decoding logic
    return { userId: '123' /* Include other decoded properties */ };
  };

  const signup = (email: string, password: string) =>
    axios.post('/api/auth/register', { email, password });

  const signin = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const token = response.data.token;

    localStorage.setItem('authToken', token);

    // Decode the token to get user information
    const decodedToken = decodeToken(token);

    dispatch({
      type: 'AUTH_STATE_CHANGED',
      payload: {
        isAuthenticated: true,
        user: {
          id: decodedToken.userId,
          // Include other user properties as needed
        },
      },
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({
      type: 'AUTH_STATE_CHANGED',
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  const CreateUser = (id: string, username: string, email: string) =>
    axios.post('/api/users', { id, username, email });

  const onceGetUsers = () => axios.get('/api/users');

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'ASP.NET Core',
        signup,
        signin,
        CreateUser,
        onceGetUsers,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
