"use client";

import { authClient } from "@/lib/authClient";
import loginReducer from "@/reducers/loginReducer";
import { Eye, EyeClosed, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";

function LoginClient() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const router = useRouter();
  const [loginState, dispatch] = useReducer(loginReducer, {
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      if (session) {
        router.replace("/");
      }
    };
    checkLogin();
  }, [session]);

  async function emailLogin() {
    setLoading(true);
    const { data, error } = await authClient.signIn.email(
      {
        email: loginState.email,
        password: loginState.password,
      },
      {
        onSuccess: (ctx) => {
          router.replace("/");
        },
        onError: (ctx) => {
          toast.error("Error logging in!");
        },
      },
    );
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex bg-gray-900">
      <div className="w-1/2 min-h-screen flex items-center justify-center">
        <h1 className="text-white text-6xl">Code-O-Gram</h1>
      </div>
      <div className="bg-white flex flex-col items-center justify-center w-1/2 min-h-screen">
        <h1 className="text-black text-3xl">Login</h1>
        <form className="flex flex-col items-center justify-center text-black mt-12 gap-2">
          <label className="w-full text-left">Email</label>
          <div className="w-full">
            <input
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", email: e.target.value })
              }
              value={loginState.email}
              type="email"
              placeholder="Enter email..."
              className="border border-black p-2 rounded-lg "
            />
          </div>

          <label className="mt-2 text-left w-full">Password</label>
          <div className="flex gap-2">
            <input
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", password: e.target.value })
              }
              value={loginState.password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password..."
              className="border border-black p-2 rounded-lg"
            />
            {showPassword ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
                className="hover:cursor-pointer"
              >
                <EyeClosed />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
                className="hover:cursor-pointer"
              >
                <Eye />
              </button>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              emailLogin();
            }}
            className={`bg-green-500 rounded-lg p-2 w-full font-extrabold ${loading && "hover:cursor-wait"} text-white mt-4 hover:bg-green-600 hover:transition-colors hover:cursor-pointer`}
          >
            Login
          </button>
          <p className="mt-4">OR</p>
          <button className="mt-2 p-2 bg-red-500 text-white w-full rounded-lg hover:bg-red-600 hover:transition-colors hover:cursor-pointer">
            Continue with G
          </button>
          <button className="p-2 mt-2 bg-blue-500 w-full text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 hover:transition-colors hover:cursor-pointer">
            Continue with <Github />
          </button>
        </form>
        <p className="mt-12 flex gap-2">
          New to Code-O-Gram? Click{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-blue-500 hover:cursor-pointer"
          >
            here
          </button>{" "}
          to register
        </p>
      </div>
    </div>
  );
}

export default LoginClient;
