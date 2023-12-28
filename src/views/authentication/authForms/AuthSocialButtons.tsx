// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import icon1 from 'src/assets/images/svgs/google-icon.svg';
import icon2 from 'src/assets/images/svgs/facebook-icon.svg';
import CustomSocialButton from '../../../components/forms/theme-elements/CustomSocialButton';
import { Avatar, Box, Stack } from '@mui/material';
import useAuth from 'src/guards/authGuard/UseAuth';
import { signInType } from 'src/types/auth/auth';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


const AuthSocialButtons = ({ title }: signInType) => {
  const { loginWithGoogle, loginWithFaceBook } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFaceBook = async (response:any) => {
    console.log(response);
    try {
      await loginWithFaceBook(response);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <CustomSocialButton onClick={handleLoginGoogle}>
          <Avatar
            src={icon1}
            alt={icon1}
            sx={{
              width: 16,
              height: 16,
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Box
            sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}
          >
            {title}
          </Box>{' '}
          Google
        </CustomSocialButton>
        <FacebookLogin
        appId="1018982909212326"
        autoLoad={false}
        callback={handleLoginFaceBook}
        render={(renderProps:any) => (
        <CustomSocialButton onClick={renderProps.onClick} title="Facebook" icon={icon2}>
          <Avatar
            src={icon2}
            alt={icon2}
            sx={{
              width: 25,
              height: 25,
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Box
            sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}
          >
            Sign in with Facebook
          </Box>
        </CustomSocialButton>
      )}
    />
      </Stack>
    </>
  );
};
export default AuthSocialButtons;
