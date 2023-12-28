// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store/Store';
import Spinner from './views/spinner/Spinner';
import './utils/i18n';
import './_mockApis';
import { AuthProvider } from 'src/guards/identity/IdentityContext';
import { GoogleOAuthProvider } from '@react-oauth/google';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <GoogleOAuthProvider
          clientId={'1003996367688-76eqaj974d7thcl6tmf8b1i5t2o17tcu.apps.googleusercontent.com'}
        >
          <AuthProvider>
            <App />
          </AuthProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Suspense>
  </Provider>,
);

/*

ReactDOM.createRoot(document.getElementById('root')!).render(:

This line uses ReactDOM.createRoot to create a root for the React application.
It specifies that the root element in the HTML document is the one with the id 'root'.
The createRoot API is used for concurrent mode rendering in React.

<Provider store={store}>:
The entire application is wrapped with the Provider component from the React Redux library.
This makes the Redux store (store) available to all components in the application.

<Suspense fallback={<Spinner />}>:
The Suspense component is added to handle code-splitting and asynchronous loading states.
It takes a fallback prop, which is a component to be rendered while waiting for asynchronous components to load.
In this case, it's a <Spinner /> component.

<BrowserRouter>:
The application is set up with the BrowserRouter from the React Router library. 
This component enables client-side navigation,
allowing the application to have different views based on the URL.

<AuthProvider>:
The entire application is wrapped with the AuthProvider.
This suggests that the application is using Firebase for authentication,
and AuthProvider is likely a custom component or context provider related to Firebase authentication.

<App />:
The main App component is rendered within the context of the Provider,
Suspense, BrowserRouter, and AuthProvider.
This is the root component of the application,
and it will likely contain the overall structure and routing logic.

In summary,
the code sets up the root of a React application using VDOM (Virtual DOM) with
features such as Redux for state management, React Router for client-side navigation, 
and Firebase for authentication. 

The use of Suspense indicates an approach to handle code-splitting, 
and the loading state is managed with a spinner component.
The specific behavior of AuthProvider would depend on its implementation, 
likely related to managing Firebase authentication context throughout the application.


*/
