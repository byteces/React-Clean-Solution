// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Form, useFormik, FormikProvider } from "formik";
import axios from "axios";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../../components/forms/theme-elements/CustomFormLabel";
import {
  ApiResponse,
  ResetPasswordDTO,
} from "src/guards/identity/IdentityType";
import { urlAuth } from "src/endpoint";

const AuthForgotPassword = (props: AuthForgotPasswordProps) => {
  const _initialValues = {
    email: "",
  };

  const _validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });

  const formik = useFormik({
    initialValues: _initialValues,

    validationSchema: _validationSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      setSubmitting(true);

      try {
        const response = await axios.post<ApiResponse>(
          `${urlAuth}/forgot-password`,
          { email: values.email }
        );

        console.log(response);
        props.setEmail(values.email);
        props.setSubmitStatus(true);

        // Your async logic here
      } catch (error) {
        // Handle errors here
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} placeholder={undefined}>
          <Stack mt={4} spacing={2}>
            <CustomFormLabel htmlFor="reset-email">
              Email Address
            </CustomFormLabel>
            <CustomTextField
              id="reset-email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              variant="outlined"
              fullWidth
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              fullWidth>
              Forgot Password
            </Button>
            <Button
              color="primary"
              size="large"
              fullWidth
              component={Link}
              to="/auth/login">
              Back to Login
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
};

interface AuthForgotPasswordProps {
  setSubmitStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default AuthForgotPassword;
