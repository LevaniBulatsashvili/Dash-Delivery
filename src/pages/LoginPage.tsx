import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { userSelector } from "../store/user/user.slice";
import { getUserRequest } from "../store/user/user.thunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userList } = useAppSelector(userSelector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const user = userList.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      await dispatch(getUserRequest(user._uuid));
      localStorage.setItem("userUuid", user._uuid);
      navigate("dashboard");
    } else setError("User Couldn't Be Found");
  };

  const handleRegisterRedirect = () => navigate("/register");

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
