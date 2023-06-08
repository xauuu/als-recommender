import React from "react";
import { Formik } from "formik";
import { Box, Button, FormHelperText, TextField, Typography } from "@mui/material";
import { register } from "./../../apis/auth";

const FormikRegister = ({ toggleForm }) => {
  return (
    <Formik
      initialValues={{
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        submit: null
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        try {
          const res = await register(values.fullname, values.email, values.password, values.confirmPassword);
          if (res.code === 200) {
            resetForm({});
            toggleForm(true);
          } else {
            setStatus({ success: false });
            setErrors({ submit: res.message });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            autoFocus
            label="Full name"
            margin="normal"
            size="medium"
            name="fullname"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.fullname}
            variant="outlined"
          />
          <TextField
            fullWidth
            autoFocus
            label="Email"
            margin="normal"
            size="medium"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            margin="normal"
            name="password"
            size="medium"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
            minLength={6}
          />
          <TextField
            fullWidth
            label="Nhập lại mật khẩu"
            margin="normal"
            name="confirmPassword"
            size="medium"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.confirmPassword}
            variant="outlined"
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
              Register
            </Button>
          </Box>
          <Box mt={3}>
            <Typography color="textPrimary" variant="body1">
              Already have an account?{" "}
              <span className="hover_login" onClick={(e) => toggleForm(true)}>
                Login here
              </span>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormikRegister;
