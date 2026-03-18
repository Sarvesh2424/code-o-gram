"use client";

import { authClient } from "@/lib/authClient";
import Navbar from "./Navbar";

function CodeOGramClient() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  return (
    <div className="min-h-screen flex bg-gray-900">
      {isPending ? (
        <div className="flex w-full items-center justify-center">
          <div className="w-10 border-white animate-spin rounded-full border-4 border-t-0 h-10"></div>
        </div>
      ) : (
        <Navbar />
      )}
    </div>
  );
}

export default CodeOGramClient;
