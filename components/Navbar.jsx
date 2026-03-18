"use client";

import { authClient } from "@/lib/authClient";
import { CircleUserRound, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const router = useRouter();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
        },
      },
    });
  };
  return (
    <div className="w-1/6 min-h-screen text-white flex flex-col items-center justify-between border-r border-t-0 border-r-gray-700 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl mt-2">Code-O-Gram</h1>
        <button className="mt-8">Home</button>
        <button>Post</button>
        <button>Find</button>
      </div>

      <div className="flex flex-col gap-4 w-1/2 items-center mb-8">
        {session ? (
          <>
            <button className="flex hover:cursor-pointer hover:text-gray-200 transition-colors gap-2 p-2">
              <CircleUserRound /> {session.user.name}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                logOut();
              }}
              className=" text-red-500 p-2 rounded-lg flex gap-2 items-center hover:cursor-pointer hover:text-red-600 transition-colors"
            >
              <LogOut /> Logout
            </button>
          </>
        ) : (
          <>
            <div className="w-full">
              <Link href={"/login"}>
                <button className=" bg-white w-full text-black p-2 rounded-lg hover:cursor-pointer flex items-center gap-2 justify-center hover:bg-gray-100 transition-colors">
                  <LogIn />
                  Log in
                </button>
              </Link>
            </div>

            <Link href={"/register"}>
              <button className="hover:cursor-pointer">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
