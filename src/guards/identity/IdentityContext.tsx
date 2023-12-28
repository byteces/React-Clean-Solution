import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { urlAuth } from 'src/endpoint.ts';
import { useGoogleLogin } from '@react-oauth/google';
import { SignInResponse, registerDTO } from './IdentityType';
import React from 'react';

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
    urlAuth;
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
  error: null, // Add a new property to hold the error message
});

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = React.useState<string | null>(null); // Initialize error state

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
            email: decodedToken.email,
            tokenExp: decodedToken.tokenExp,
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
    const dataToken = JSON.parse(atob(token.split('.')[1]));

    console.log(dataToken);

    return { email: dataToken.email, tokenExp: dataToken.exp };
  };

  const signup = async (registerInfo: registerDTO) => {
    setError(null);

    const response = await axios.post<SignInResponse>(`${urlAuth}/create`, registerInfo);

    if (!response.data.isSuccess) {
      console.log(response.data.error);
      await setError(response.data.error);
      return;
    }

    const token = response.data.data.token;

    localStorage.setItem('authToken', token);
    //console.log('Debug :' + token);

    // Decode the token to get user information
    const decodedToken = decodeToken(token);

    dispatch({
      type: 'AUTH_STATE_CHANGED',
      payload: {
        isAuthenticated: true,
        user: {
          email: decodedToken.email,
          tokenExp: decodedToken.tokenExp,
          // Include other user properties as needed
        },
      },
    });
  };

  const signin = async (email: string, password: string) => {
    setError(null);

    const response = await axios.post<SignInResponse>(`${urlAuth}/login`, { email, password });

    if (!response.data.isSuccess) {
      console.log(response.data.error);
      await setError(response.data.error); // Set the error in the state
      return;
    }

    const token = response.data.data.token;

    localStorage.setItem('authToken', token);
    //console.log('Debug :' + token);

    // Decode the token to get user information
    const decodedToken = decodeToken(token);

    dispatch({
      type: 'AUTH_STATE_CHANGED',
      payload: {
        isAuthenticated: true,
        user: {
          email: decodedToken.email,
          tokenExp: decodedToken.tokenExp,
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

  const hanldeGoogleLogin = async (tokenResponse: any) => {
    setError(null);
    console.log(tokenResponse);
    console.log(tokenResponse.access_token);

    const access_token = tokenResponse.access_token;

    if (access_token) {
      const response = await axios.post<SignInResponse>(
        `${urlAuth}/google-login`,
        { AccessToken: access_token }, // Wrap the access_token in a GoogleTokenDto
      );

      if (!response.data.isSuccess) {
        console.log(response.data.error);
        setError(response.data.error);
        return;
      }

      const token = response.data.data.token;

      if (!token) return;

      localStorage.setItem('authToken', token);
      const decodedToken = decodeToken(token);

      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: true,
          user: {
            email: decodedToken.email,
            tokenExp: decodedToken.tokenExp,
            // Include other user properties as needed
          },
        },
      });
    }
  };

  const handleFacebookLogin = async (tokenResponse: any) => {
    setError(null);
    console.log(tokenResponse);
  
    const access_token = tokenResponse;
  
    if (access_token) {
      try {
        // Make a request to your server for Facebook login
        const response = await axios.post<SignInResponse>(
          `${urlAuth}/facebook-login`,
          { accessToken: access_token },
        );
  
        if (!response.data.isSuccess) {
          console.log(response.data.error);
          setError(response.data.error);
          return;
        }
  
        const token = response.data.data.token;
  
        if (!token) return;
  
        localStorage.setItem('authToken', token);
        const decodedToken = decodeToken(token);
  
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: true,
            user: {
              email: decodedToken.email,
              tokenExp: decodedToken.tokenExp,
              // Include other user properties as needed
            },
          },
        });
      } catch (error) {
        console.error('Error logging in with Facebook:', error);
        setError('An error occurred during Facebook login.');
      }
    }
  };


  // Login with FB
  const loginWithFaceBook = async (response: any) => {
    // Extract the access token from the response
    const { accessToken } = response;
  
    // Now you can use the accessToken as needed
    await handleFacebookLogin(accessToken);
  };
  

  // Login with Google
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse: any) => hanldeGoogleLogin(tokenResponse),
  });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'ASP.NET Core',
        signup,
        signin,
        logout,
        loginWithGoogle,
        loginWithFaceBook,
        error, // Expose the error to the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
