import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { CircularProgress, Typography, Box } from "@mui/material";

const ActivationPage = () => {
  const [searchParams] = useSearchParams();
  const activation_token = searchParams.get("activation_token");
  const [response, setResponse] = useState("");
  const [counter, setCounter] = useState(5);
  const cookies = new Cookies();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/activation`,
            { activation_token }
          );
          setResponse(res.data);
          cookies.set("token", res.data.token);
        } catch (err) {
          console.error("Error during activation", err.response);
        }
      };
      sendRequest();
    }
  }, [activation_token, cookies]);

  useEffect(() => {
    if (response) {
      const countdown = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      setTimeout(() => {
        toast.success("Your account has been created successfully!");
        window.location.href = "/login";
      }, 5000);

      return () => clearInterval(countdown);
    }
  }, [response]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      {response ? (
        <Box
          sx={{
            textAlign: "center",
            padding: 3,
            backgroundColor: "white",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Congratulations!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your account has been activated successfully.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Redirecting to login in {counter} seconds...
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            padding: 3,
            backgroundColor: "white",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CircularProgress />
          <Typography variant="body1" gutterBottom>
            Activating your account...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ActivationPage;
