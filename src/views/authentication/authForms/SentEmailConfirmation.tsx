// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { IconMail, IconArrowRight } from "@tabler/icons-react";
import styled from "styled-components";
import { Container } from "@mui/system";
import useAuth from "src/guards/authGuard/UseAuth";

const StyledButton = styled.button`
  background-color: transparent;
  color: #5d87ff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    color: #0a2b8a;
  }
`;

const SentEmailConfirmation = (props: SentEmailConfirmation) => {
  const [isResendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const { user } = useAuth();

  useEffect(() => {
    if (isResendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev: any) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isResendDisabled]);

  useEffect(() => {
    if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
  }, [countdown]);

  const handleResendClick = () => {
    // Your resend logic goes here
    // For example, you might want to send another verification email

    // Disable the button and start the countdown
    setResendDisabled(true);
  };

  return (
    <>
      <Box mt={3}>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <IconMail size={100} color="#0A2B8A" stroke={1} />
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <Typography color="textprimary" variant="h1" fontWeight="1000" px={2}>
            Verify your email address
          </Typography>
        </Grid>
      </Box>
      <Box mt={6}>
        <Stack
          direction={"row"}
          justifyContent="center"
          alignItems="center"
          spacing={1}>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400">
            We have sent a verification link to
          </Typography>
          <Typography color="textSecondary" variant="h6" fontWeight="900">
            {props.email ? props.email : user.email}
          </Typography>
        </Stack>
      </Box>
      <Box mt={5}>
        <Stack justifyContent="center" alignItems="center" spacing={1}>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            px={1}>
            Click on the link to complete the verification process.
          </Typography>
          <Typography
            color="textSecondary"
            variant="h6"
            fontWeight="900"
            px={1}>
            You might need to check your spam folder.
          </Typography>
        </Stack>
      </Box>
      <Box mt={5}>
        <Container>
          <Stack
            direction={"row"}
            justifyContent="center"
            alignItems="center"
            spacing={1}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              component={Link}
              to="/"
              onClick={handleResendClick}
              disabled={isResendDisabled}>
              Resend {isResendDisabled ? `(${countdown})` : ""}
            </Button>
            <Link to={"/auth/login"}>
              <StyledButton>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  Return to Login
                  <IconArrowRight />
                </Stack>
              </StyledButton>
            </Link>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

interface SentEmailConfirmation {
  email?: string;
}

export default SentEmailConfirmation;
