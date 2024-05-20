import { Box, Button, Stack } from "@mui/material";
import { IconEyeCheck } from "@tabler/icons-react";
import { Form, useFormik, FormikProvider } from "formik";
import { useNavigate } from "react-router";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import useAuth from "src/guards/authGuard/UseAuth";
import { ResetPasswordDTO } from "src/guards/identity/IdentityType";
import * as Yup from "yup";

const AuthResetPassword = (props: AuthResetPasswordProps) => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const initValues = {
    email: props.email,
    password: "",
    password2: "",
    token: props.token,
  };

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/,
        "Password must include at least one uppercase letter, one special character, and be at least 6 characters long"
      )
      .required("Password is required"),

    password2: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: initValues,

    validationSchema: ResetPasswordSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      setSubmitting(true);

      const data: ResetPasswordDTO = {
        email: values.email!,
        token: values.token!,
        password: values.password,
      };

      await resetPassword(data);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} placeholder={undefined}>
          <Stack>
            <Box>
              <CustomFormLabel htmlFor="pwd">Password</CustomFormLabel>
              <CustomTextField
                id="pwd"
                variant="outlined"
                type="password"
                fullWidth
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="pwd2">
                Password Confirmation
              </CustomFormLabel>
              <CustomTextField
                id="pwd2"
                variant="outlined"
                type="password"
                fullWidth
                {...getFieldProps("password2")}
                error={Boolean(touched.password2 && errors.password2)}
                helperText={touched.password2 && errors.password2}
              />
            </Box>
          </Stack>
          <Box mt={3}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}>
              Reset
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
};

interface AuthResetPasswordProps {
  email: string | null | undefined;
  token: string | null | undefined;
}

export default AuthResetPassword;
