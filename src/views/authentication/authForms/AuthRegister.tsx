// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import { Box, Typography, Button, Divider, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import { registerType } from 'src/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import useAuth from 'src/guards/authGuard/UseAuth';
import useMounted from 'src/guards/authGuard/UseMounted';
import { registerDTO } from 'src/guards/identity/IdentityType';

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const { signup, error } = useAuth();

  const registerSchema = Yup.object().shape({
    fullName: Yup.string().required('FullName is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),

    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      policy: true,
      submit: null,
      acceptTerms: false,
    },

    validationSchema: registerSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      console.log('submiting');

      const signUpValue: registerDTO = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      };
      setSubmitting(true);

      await signup(signUpValue);

      if (!error) {
        setStatus({ success: true });
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (error !== null) {
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
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Box>
        {errors.submit && (
          <Box mt={2}>
            <Alert severity="error">{errors.submit}</Alert>
          </Box>
        )}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} placeholder={undefined}>
            <Stack mb={3}>
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField
                id="name"
                variant="outlined"
                fullWidth
                {...getFieldProps('fullName')}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />
              <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <CustomTextField
                id="password"
                variant="outlined"
                fullWidth
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                type="password"
              />
            </Stack>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
          </Form>
        </FormikProvider>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
