"use client";

import { authClient } from "@/lib/authClient";
import registerReducer from "@/reducers/registerReducer";
import { Eye, EyeClosed, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";

function RegisterClient() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const router = useRouter();
  const [registerState, dispatch] = useReducer(registerReducer, {
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      if (session) {
        router.replace("/");
      }
    };
    checkLogin();
  }, [session]);

  async function emailRegister() {
    if (registerState.password !== registerState.confirm) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    const name = registerState.email.split("@")[0];
    const { data, error } = await authClient.signUp.email(
      {
        email: registerState.email,
        password: registerState.password,
        name: name,
        callbackURL: "/",
      },
      {
        onSuccess: (ctx) => {
          router.replace("/");
        },
        onError: (ctx) => {
          toast.error("Error signing up!");
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
        <h1 className="text-black text-3xl">Register</h1>
        <form className="flex flex-col items-center justify-center text-black mt-12 gap-2">
          <label className="w-full text-left">Email</label>
          <div className="w-full">
            <input
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", email: e.target.value })
              }
              value={registerState.email}
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
              value={registerState.password}
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
          <label className="mt-2 text-left w-full">Confirm Password</label>
          <div className="flex gap-2">
            {" "}
            <input
              onChange={(e) =>
                dispatch({ type: "SET_CONFIRM", confirm: e.target.value })
              }
              value={registerState.confirm}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password..."
              className="border border-black p-2 rounded-lg"
            />
            {showConfirm ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirm((prev) => !prev);
                }}
                className="hover:cursor-pointer"
              >
                <EyeClosed />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirm((prev) => !prev);
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
              emailRegister();
            }}
            className={`bg-green-500 rounded-lg p-2 w-full font-extrabold text-white mt-4 hover:bg-green-600 hover:transition-colors hover:cursor-pointer ${loading && "hover:cursor-wait"}`}
          >
            Register
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
          Have an account? Click{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:cursor-pointer"
          >
            here
          </button>{" "}
          to login
        </p>
      </div>
    </div>
  );
}

export default RegisterClient;
