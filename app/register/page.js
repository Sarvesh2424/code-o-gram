import React from "react";
import { Toaster } from "react-hot-toast";
import RegisterClient from "@/components/RegisterClient";

function Register() {
  return (
    <>
      <Toaster position="bottom-right"/>
      <RegisterClient />
    </>
  );
}

export default Register;