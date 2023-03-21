import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "1rem",
    "@media (min-width:600px)": {
      padding: "2rem",
    },
  },
  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    "@media (min-width:600px)": {
      fontSize: "3rem",
    },
    "@media (max-width:400px)": {
      fontSize: "2rem",
    },
  },
  message: {
    fontSize: "1.5rem",
    textAlign: "center",
    "@media (min-width:600px)": {
      fontSize: "1.2rem",
    },
    "@media (max-width:400px)": {
      fontSize: "1rem",
    },
  },
  button: {
    marginTop: "1rem",
    "@media (min-width:600px)": {
      marginTop: "0.5rem",
    },
  },
  alert: {
    marginTop: "2rem",
  },
};

const ErrorPage = () => {
  return (
    <Container maxWidth="md" sx={styles.root}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={styles.title}>
          404
        </Typography>
        <Typography variant="body1" sx={styles.message}>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={styles.button}
          component={Link}
          to="/"
        >
          Go to Homepage
        </Button>
        <Alert severity="error" sx={styles.alert}>
          <AlertTitle>Error</AlertTitle>
          The page you're looking for could not be found.
        </Alert>
      </Box>
    </Container>
  );
};

export default ErrorPage;
