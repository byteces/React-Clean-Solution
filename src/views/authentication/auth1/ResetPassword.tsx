import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
// components
import PageContainer from "src/components/container/PageContainer";
import axios from "axios";
import { urlAuth } from "src/endpoint";
import {
  SignInResponse,
  verifyEmailDTO,
} from "src/guards/identity/IdentityType";
import useAuth from "src/guards/authGuard/UseAuth";
import AuthResetPassword from "../authForms/AuthResetPassword";

const ResetPassword = () => {
  const [status, setStatus] = useState<boolean | null>(null); // Use null for initial loading state

  const navigate = useNavigate();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const params_email = params.get("email");
  const params_ResetToken = params.get("code")?.replace(/ /g, "+");

  //    useEffect(() => {
  //     if (!params_email || !params_ResetToken) {
  //       // Redirect to /404 if either email or emailToken is null
  //       navigate('/auth/404');
  //       return;
  //     }
  //     }, [params_email, params_ResetToken]);

  return status == null ? (
    <PageContainer
      title="ResetPassword"
      description="this is Reset password page">
      <Box
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
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}>
              <Box display="flex" flexDirection={"column"}>
                <Typography color="textprimary" variant="h4" fontWeight="1000">
                  Reset your password.
                </Typography>
                <AuthResetPassword
                  email={params_email}
                  token={params_ResetToken}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  ) : null;
};

export default ResetPassword;
