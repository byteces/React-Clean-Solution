// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Link } from "react-router-dom";

import { loginType } from "src/types/auth/auth";
import CustomCheckbox from "src/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { Form, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import useAuth from "src/guards/authGuard/UseAuth";
import useMounted from "src/guards/authGuard/UseMounted";

const AuthLogin = ({ title, subtitle, subtext, setEmail }: loginType) => {
  const mounted = useMounted();
  const {
    signin,
    error,
    resetPasswordRedirect,
    closeResetPasswordResultMessage,
    emailConfirmation,
  } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "user@example.com",
      password: "Axz223!",
      submit: null,
    },

    validationSchema: LoginSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      setSubmitting(true);
      await signin(values.email, values.password);

      if (!error) {
        if (emailConfirmation == false) {
          setEmail(values.email);
          return;
        }
        setStatus({ success: true });
        setSubmitting(true);
      }
    },
  });

  useEffect(() => {
    if (error) {
      // Handle the error
      formik.setStatus({ success: false });
      formik.setErrors({ submit: error });
      formik.setSubmitting(false);
    }
  }, [error]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}>
            or sign in with
          </Typography>
        </Divider>
      </Box>

      {resetPasswordRedirect === true ? (
        <Box mt={2}>
          <Alert
            variant="filled"
            onClose={closeResetPasswordResultMessage}
            severity="success">
            <AlertTitle>Success</AlertTitle>
            Password Reset Successful! —{" "}
            <strong>You can now log in with your new password.</strong>
          </Alert>
        </Box>
      ) : resetPasswordRedirect === false ? (
        <Box mt={2}>
          <Alert
            variant="filled"
            severity="error"
            onClose={closeResetPasswordResultMessage}>
            <AlertTitle>Error</AlertTitle>
            Oops! —{" "}
            <strong>
              Something went wrong. Unable to reset your password. Please try
              again later.
            </strong>
          </Alert>
        </Box>
      ) : null}

      {errors.submit && (
        <Box mt={2}>
          <Alert severity="error">{errors.submit}</Alert>
        </Box>
      )}
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} placeholder={undefined}>
          <Stack>
            <Box>
              <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <CustomTextField
                id="password"
                type="password"
                variant="outlined"
                fullWidth
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Stack
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              my={2}>
              <FormGroup>
                <FormControlLabel
                  control={<CustomCheckbox defaultChecked />}
                  label="Remeber this Device"
                />
              </FormGroup>
              <Typography
                component={Link}
                to="/auth/forgot-password"
                fontWeight="500"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                }}>
                Forgot Password ?
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}>
              Sign In
            </Button>
          </Box>
        </Form>
      </FormikProvider>
      {subtitle}
    </>
  );
};

export default AuthLogin;
