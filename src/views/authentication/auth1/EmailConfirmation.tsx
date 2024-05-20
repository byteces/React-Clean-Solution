import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, Button, CircularProgress } from '@mui/material';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
// components
import PageContainer from 'src/components/container/PageContainer';
import axios from 'axios';
import { urlAuth } from 'src/endpoint';
import { SignInResponse, verifyEmailDTO } from 'src/guards/identity/IdentityType';
import useAuth from 'src/guards/authGuard/UseAuth';
 
const EmailConfirmation = () => {
  const [status, setStatus] = useState<boolean | null>(null); // Use null for initial loading state
  const [jwtToken, setJwtToken] = useState(""); 

  const navigate = useNavigate();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const params_email = params.get('email');
  const params_emailToken = params.get('email_token')?.replace(/ /g, '+');
  const {signinViaEmailConfirmation} = useAuth();
  // console.log(params_emailToken);  
  // console.log(params_email!  )
 
  const onClickGetStarted = async () =>{
    if(!jwtToken) navigate("/auth/login");
    if(!status) navigate("/auth/login");

    
    await signinViaEmailConfirmation(jwtToken)
  }

  useEffect(() => {
    if (!params_email || !params_emailToken) {
      // Redirect to /404 if either email or emailToken is null
      navigate('/auth/404');
      return;
    }

    const verifyEmail = async () => {
      console.log("validating");
      
      const dataDTO : verifyEmailDTO = {
        email :  params_email, 
        email_token :  params_emailToken, 
      };

      try {
        
        // Make a request to your server to validate the email
        const response = await axios.post<SignInResponse>(`${urlAuth}/verify-email`, dataDTO );

         if(response.data.statusCode == 404){
          navigate('/auth/404');
          return;
        }

        // Assuming your server responds with a property 'isSuccess'
        const isSuccess = response.data.isSuccess;
        // Update the status based on the server response
        setStatus(isSuccess);

        if(isSuccess != true) return;
        if(response.data.data.token)
        {
          setJwtToken(response.data.data.token);
        }

      } catch (error) {
        // Handle error, e.g., display an error message
        console.error('Email verification failed:', error);
      }
    };

    // Call the email verification function when the component mounts
    verifyEmail();
  }, [params_email, params_emailToken]);

  return status !== null ? (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
           <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                {status === null ? (
                  null
                ) : status ? (
                  <IconCircleCheck size={88} color="#0FCC17" />
                ) : (
                  <IconCircleX size={88} color="#CE0909" />
                )}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                {status === null ? (
                    null

                ) : status ? (
                  <Typography color="textprimary" variant="h4" fontWeight="1000" px={2}>
                    Email Verified
                  </Typography>
                ) : (
                  <Typography color="textprimary" variant="h4" fontWeight="1000" px={2}>
                    Email Verification Unsuccessful{' '}
                  </Typography>
                )}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                {status === null ? (
                   null

                ) : status ? (
                  <Typography color="textprimary" variant="h6" fontWeight="400" px={2} mt={2}>
                    Your email address was successfully verified.
                  </Typography>
                ) : (
                  <Typography color="textprimary" variant="h6" fontWeight="400" px={2} mt={2}>
                    Your email address could not be verified successfully{' '}
                  </Typography>
                )}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={status === null} // Disable button during API call
                  onClick={onClickGetStarted}
                >
                  {status === null ? 'Processing...' : status ? 'Get Started' : 'Back to login'}
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  ) : null;
};

export default EmailConfirmation;
