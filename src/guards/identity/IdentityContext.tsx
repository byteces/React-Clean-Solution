import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { urlAuth } from "src/endpoint.ts";
import { useGoogleLogin } from "@react-oauth/google";
import {
  ApiResponse,
  ResetPasswordDTO,
  SignInResponse,
  UserSession,
  registerDTO,
} from "./IdentityType";
import React from "react";
import { useNavigate } from "react-router";

export interface InitialStateType {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
  resetPasswordRedirect: boolean | null | undefined;
  emailConfirmation: boolean | null | undefined; // New state for email confirmation
}

const initialState: InitialStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  resetPasswordRedirect: null,
  emailConfirmation: null, // Initialize email confirmation state
};

const reducer = (state: InitialStateType, action: any) => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  if (action.type === "AUTH_CHANGED_PASSWORD") {
    const { resetPasswordRedirect } = action.payload;
    urlAuth;
    return {
      ...state,
      resetPasswordRedirect,
    };
  }

  if (action.type === "AUTH_EMAIL_CONFIRMATION") {
    const { emailConfirmation } = action.payload;
    return {
      ...state,
      emailConfirmation,
    };
  }

  return state;
};

const AuthContext = createContext<any | null>({
  ...initialState,
  platform: "ASP.NET Core",
  signup: () => Promise.resolve(),
  signin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  onceGetUsers: () => Promise.resolve(),
  CreateUser: () => Promise.resolve(),
  signinViaEmailConfirmation: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  checkAuthentication: () => Promise.resolve(),
  error: null, // Add a new property to hold the error message
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true); // 新增isLoading状态

  const [error, setError] = React.useState<string | null>(null); // Initialize error state
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    setIsLoading(true); // 开始检查前设置isLoading为true

    const token = localStorage.getItem("authToken");

    if (token) {
      // You can decode the token here to get user information
      const decodedToken = decodeToken(token);

      dispatch({
        type: "AUTH_STATE_CHANGED",
        payload: {
          isAuthenticated: true,
          user: {
            decodedToken,
          },
        },
      });
      setIsLoading(false); // 检查完成后设置isLoading为false

      return true;
    } else {
      dispatch({
        type: "AUTH_STATE_CHANGED",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      setIsLoading(false); // 检查完成后设置isLoading为false
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const decodeToken = (token: string) => {
    const dataToken = JSON.parse(atob(token.split(".")[1]));

    console.log(dataToken);

    return {
      uid: dataToken.Uid,
      email:
        dataToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
      tokenExp: dataToken.exp,
      profilePictureURL: dataToken.profilePictureURL,
      name: dataToken.Name,
    };
  };

  const signup = async (
    registerInfo: registerDTO,
    needVerify: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setError(null);

    const response = await axios.post<ApiResponse>(
      `${urlAuth}/create`,
      registerInfo
    );

    if (!response.data.isSuccess) {
      console.log(response.data.error);
      await setError(response.data.error);
      return;
    }

    dispatch({
      type: "AUTH_STATE_CHANGED",
      payload: {
        isAuthenticated: false,
        user: {
          email: registerInfo.email,
        },
      },
    });

    needVerify(true);
  };

  const signin = async (email: string, password: string) => {
    setError(null);

    try {
      const response = await axios.post<SignInResponse>(`${urlAuth}/login`, {
        email,
        password,
      });

      if (!response.data.isSuccess) {
        console.log(response.data.error);
        await setError(response.data.error);
        return;
      }

      if (response.data.statusCode == 401) {
        // Dispatch the email confirmation action
        dispatch({
          type: "AUTH_EMAIL_CONFIRMATION",
          payload: {
            emailConfirmation: false,
          },
        });

        return;
      }

      const token = response.data.data.token;

      localStorage.setItem("authToken", token);
      //console.log('Debug :' + token);

      // Decode the token to get user information
      const decodedToken = decodeToken(token);

      dispatch({
        type: "AUTH_STATE_CHANGED",
        payload: {
          isAuthenticated: true,
          user: {
            decodedToken,
          },
        },
      });
    } catch (error) {
      console.error("An error occurred during login:", error);
      // Handle other errors if needed
    }
  };

  const signinViaEmailConfirmation = async (token: string) => {
    localStorage.setItem("authToken", token);

    const decodedToken = decodeToken(token);

    dispatch({
      type: "AUTH_STATE_CHANGED",
      payload: {
        isAuthenticated: true,
        user: {
          decodedToken,
        },
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch({
      type: "AUTH_STATE_CHANGED",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
    navigate("/auth/login"); // 添加这行代码来导航到登录页面
  };

  const hanldeGoogleLogin = async (tokenResponse: any) => {
    setError(null);
    console.log(tokenResponse);
    console.log(tokenResponse.access_token);

    const access_token = tokenResponse.access_token;

    if (access_token) {
      const response = await axios.post<SignInResponse>(
        `${urlAuth}/google-login`,
        { AccessToken: access_token } // Wrap the access_token in a GoogleTokenDto
      );

      if (!response.data.isSuccess) {
        console.log(response.data.error);
        setError(response.data.error);
        return;
      }

      const token = response.data.data.token;

      if (!token) return;

      localStorage.setItem("authToken", token);
      const decodedToken = decodeToken(token);

      dispatch({
        type: "AUTH_STATE_CHANGED",
        payload: {
          isAuthenticated: true,
          user: {
            decodedToken,
          },
        },
      });
    }
  };

  // Login with Google
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse: any) => hanldeGoogleLogin(tokenResponse),
  });

  // Login with FB
  const loginWithFaceBook = () => {};

  const resetPassword = async (resetPasswordData: ResetPasswordDTO) => {
    try {
      const response = await axios.post<ApiResponse>(
        `${urlAuth}/reset-password`,
        resetPasswordData
      );

      dispatch({
        type: "AUTH_CHANGED_PASSWORD",
        payload: {
          resetPasswordRedirect: response.data.isSuccess,
        },
      });

      navigate("login");

      console.log(response.data);
    } catch (error) {
      dispatch({
        type: "AUTH_CHANGED_PASSWORD",
        payload: {
          resetPasswordRedirect: false,
        },
      });

      navigate("login");
    }
  };

  const closeResetPasswordResultMessage = () => {
    dispatch({
      type: "AUTH_CHANGED_PASSWORD",
      payload: {
        resetPasswordRedirect: null,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isLoading, // 将isLoading状态传递给context
        platform: "ASP.NET Core",
        signup,
        signin,
        logout,
        loginWithGoogle,
        loginWithFaceBook,
        signinViaEmailConfirmation,
        resetPassword,
        closeResetPasswordResultMessage,
        checkAuthentication,
        error, // Expose the error to the context
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
