import React from "react";
import LoginClient from "@/components/LoginClient";
import { Toaster } from "react-hot-toast";

function Login() {
  return (
    <>
      <Toaster position="bottom-right"/>
      <LoginClient />
    </>
  );
}

export default Login;
