// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import { IconMail } from "@tabler/icons-react";

const SentResetPasswordEmail = (props: SentResetPasswordEmailProps) => {
  return (
    <>
      <Box mt={3}>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <IconMail size={100} color="#0A2B8A" stroke={1} />
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <Typography
            justifyContent="center"
            alignItems="center"
            color="textprimary"
            variant="h3"
            fontWeight="1000"
            px={2}>
            Reset your account password
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
        </Stack>
      </Box>
      <Box>
        <Stack
          direction={"row"}
          justifyContent="center"
          alignItems="center"
          spacing={1}>
          <strong style={{ fontWeight: "bold" }}>{props.email}</strong>
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
            Click on the link to complete the reset password process.
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
    </>
  );
};

interface SentResetPasswordEmailProps {
  email: string;
}

export default SentResetPasswordEmail;
