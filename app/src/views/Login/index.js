import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import FormikLogin from "./FormikLogin";
import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MdClose } from "react-icons/md";
import FormikRegister from "./FormikRegister";

const useStyles = makeStyles(() => ({
  card: {
    overflow: "visible",
    display: "flex",
    position: "relative",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
      width: "50%"
    },
    maxWidth: "475px",
    margin: "0 auto"
  },
  content: {
    padding: "40px 32px 24px 32px !important"
  },
  close: {
    position: "absolute!important",
    top: "25px",
    right: "20px",
    zIndex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Login = ({ isOpen, handleClose }) => {
  const classes = useStyles();

  const [isLoginForm, setisLoginForm] = React.useState(true);

  const toggleForm = (state) => {
    setisLoginForm(state);
  };

  return (
    <Dialog open={isOpen} TransitionComponent={Transition} keepMounted>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Grid container direction="column" spacing={4} justifyContent="center">
            <Grid item xs={12}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    Login
                  </Typography>
                  <IconButton className={classes.close} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <MdClose />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {isLoginForm ? <FormikLogin toggleForm={toggleForm} /> : <FormikRegister toggleForm={toggleForm} />}
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default Login;
