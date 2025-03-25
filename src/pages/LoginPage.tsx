import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/login/login.thunk";
import { TextField, Button, Box } from "@mui/material";
import { AppDispatch } from "../store";
import { RootState } from "../store";
import { loginSuccess } from "../store/login/login.slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    isAuthenticated,
    error: loginError,
    user,
  } = useSelector((state: RootState) => state.login);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await dispatch(loginUser(email, password));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/dashboard");
      return; 
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser && !isAuthenticated) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(
        loginSuccess({
          user: parsedUser.user,
          admin: parsedUser.admin || null,
          courier: parsedUser.courier || null,
          role: parsedUser.role,
        })
      );
      navigate("/dashboard");
    }
    if (loginError) {
      setError(loginError);
    }
  }, [isAuthenticated, loginError, user, navigate, dispatch]);

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ maxWidth: 400, mx: "auto", p: 2 }}
    >
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <Button
        variant="text"
        color="primary"
        onClick={handleRegisterRedirect}
        fullWidth
        sx={{ mt: 2 }}
      >
        Don't have an account? Register
      </Button>
    </Box>
  );
};

export default Login;
