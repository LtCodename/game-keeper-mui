import React, { useState } from "react";

import * as yup from "yup";

import { Formik, Form, ErrorMessage } from "formik";

import { Box, FormControl, FormHelperText, TextField } from "@mui/material";

const defaultValues: {
  login: string;
  password: string;
} = {
  login: "",
  password: "",
};

const validationSchema = yup.object().shape({
  login: yup.string().required("Login is a required field"),
  password: yup.string().required("Password is a required field"),
});

const Login = () => {
  const [isSubmittimg, setIsSubmitting] = useState<boolean>(false);
  console.log(isSubmittimg);

  const submitForm = (data: { login: string; password: string }) => {
    const params = {
      login: data.login,
      password: data.password,
    };

    setIsSubmitting(true);
    console.log(params);
    // call
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
        onSubmit={(values: any) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ errors, handleChange, handleSubmit, touched }) => (
          <Form autoComplete="off" id="article-form" onSubmit={handleSubmit}>
            <Box
              sx={{
                maxWidth: 400,
              }}
            >
              <Box>
                <FormControl
                  error={Boolean(errors.login && touched.login)}
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <TextField
                    id="login"
                    label="Login"
                    defaultValue="Enter Login"
                    variant="filled"
                    autoFocus
                    name="login"
                    onChange={handleChange}
                  />

                  <ErrorMessage name="login">
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
                    defaultValue="Enter Password"
                    variant="filled"
                    name="password"
                    onChange={handleChange}
                  />

                  <ErrorMessage name="password">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
