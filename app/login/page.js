import React from "react";
import LoginClient from "@/components/LoginClient";
import { Toaster } from "react-hot-toast";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Login() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }
  
  return (
    <>
      <Toaster position="bottom-right" />
      <LoginClient />
    </>
  );
}

export default Login;
