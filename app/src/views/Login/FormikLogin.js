import React from "react";
import { Formik } from "formik";
import { Box, Button, FormHelperText, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "./../../apis/auth";
import { login as dispatchLogin } from "../../store/features/userSlice.js";

const FormikLogin = ({ toggleForm }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        user_id: 1,
        submit: null
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        try {
          localStorage.setItem("user", JSON.stringify(values));
          dispatch(dispatchLogin(values));
          resetForm({});
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
            label="User ID"
            margin="normal"
            size="medium"
            name="user_id"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.user_id}
            variant="outlined"
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
              Login
            </Button>
          </Box>
          <Box mt={3}>
            <Typography color="textPrimary" variant="body1">
              Don't have an account?{" "}
              <span className="hover_login" onClick={(e) => toggleForm(false)}>
                Register here
              </span>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormikLogin;
