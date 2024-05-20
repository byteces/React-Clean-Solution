// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from "react";
import { Grid, Box, Typography, Stack } from "@mui/material";

import Logo from "src/layouts/full/shared/logo/Logo";
import PageContainer from "src/components/container/PageContainer";

import img1 from "src/assets/images/backgrounds/login-bg.svg";

import AuthForgotPassword from "../authForms/AuthForgotPassword";
import { IconMail } from "@tabler/icons-react";
import SentResetPasswordEmail from "../authForms/SentResetPasswordEmail";

const ForgotPassword = () => {
  const [submitStatus, setSumbitStatus] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <PageContainer title="Login" description="this is Login page">
      <Grid container spacing={0} sx={{ overflowX: "hidden" }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}>
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={"calc(100vh - 75px)"}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
              }}>
              <img
                src={img1}
                alt="bg"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center">
          <Box p={4}>
            {submitStatus ? (
              <SentResetPasswordEmail email={email} />
            ) : (
              <>
                <Typography variant="h4" fontWeight="700">
                  Forgot your password?
                </Typography>

                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontWeight="400"
                  mt={2}>
                  Please enter the email address associated with your account,
                  and we will email you a link to reset your password.
                </Typography>

                <AuthForgotPassword
                  setSubmitStatus={setSumbitStatus} // Fixed typo in setSubmitStatus
                  setEmail={setEmail}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ForgotPassword;
