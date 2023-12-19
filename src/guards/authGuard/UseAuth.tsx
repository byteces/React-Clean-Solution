import { useContext } from 'react';
import AuthContext from '../identity/IdentityContext';

//import { AuthContext } from '../jwt/JwtContext';
//import { AuthContext } from '../auth0/Auth0Context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
