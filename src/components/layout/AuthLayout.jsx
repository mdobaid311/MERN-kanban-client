import React, { useEffect, useState } from "react";
import { Container, Box, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Loading from "../../components/common/Loading";
import assets from "../../assets";
import Login from "../../pages/Login";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setLoading(false);
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading />
  ) : (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={assets.images.logoDark}
          style={{ width: "100px" }}
          alt="logo"
        />
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
