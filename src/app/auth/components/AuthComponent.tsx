"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import React from "react";

export default function AuthComponent() {
  const supabase = createClientComponentClient();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="p-5">
      <Navbar />
      <div className="flex justify-center items-center max-h-screen">
        <div className="text-center space-y-5 mt-20">
          <p className="font-semibold">
            Track your productivity for each day!!
          </p>
          <Button onClick={handleLogin}>Login with Google</Button>
        </div>
      </div>
    </div>
  );
}
