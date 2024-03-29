/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { useState } from "react";

import * as yup from "yup";

import { ErrorMessage, Form, Formik } from "formik";

import { Box, FormControl, FormHelperText, TextField } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { DEMO_EMAIL, DEMO_PASSWORD } from "config";

import type { LoginForm } from "types";

import { useSnackbar } from "./Snackbar/SnackbarContext";

const defaultValues: {
  email: string;
  password: string;
} = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const auth = getAuth();

  const submitForm = (data: { email: string; password: string }) => {
    setIsSubmitting(true);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          snackbar.setMessage({
            severity: "error",
            message: error.toString(),
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  const demoLogin = () => {
    setIsSubmitting(true);
    const auth = getAuth();

    signInWithEmailAndPassword(auth, DEMO_EMAIL, DEMO_PASSWORD)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          snackbar.setMessage({
            severity: "error",
            message: error.toString(),
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 96px)",
      }}
    >
      <Formik
        initialValues={defaultValues}
        onSubmit={(values: LoginForm) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ errors, handleChange, handleSubmit, touched }) => (
          <Form autoComplete="off" id="login-form" onSubmit={handleSubmit}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 300,
                }}
              >
                <FormControl
                  error={Boolean(errors.email && touched.email)}
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <TextField
                    id="email"
                    label="Email"
                    defaultValue=""
                    variant="filled"
                    autoFocus
                    name="email"
                    onChange={handleChange}
                  />

                  <ErrorMessage name="email">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>

                <FormControl
                  error={Boolean(errors.password && touched.password)}
                  fullWidth
                >
                  <TextField
                    id="password"
                    label="Password"
                    defaultValue=""
                    variant="filled"
                    name="password"
                    type="password"
                    onChange={handleChange}
                  />

                  <ErrorMessage name="password">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
                <Box>
                  <LoadingButton
                    sx={{ mt: 2, mx: 1 }}
                    loading={isSubmitting}
                    loadingPosition="start"
                    startIcon={<LockOpenIcon />}
                    variant="outlined"
                    form="login-form"
                    type="submit"
                  >
                    Login
                  </LoadingButton>
                  <LoadingButton
                    sx={{ mt: 2, mx: 1 }}
                    loading={isSubmitting}
                    loadingPosition="start"
                    startIcon={<VisibilityIcon />}
                    variant="outlined"
                    onClick={demoLogin}
                  >
                    Demo
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
