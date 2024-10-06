"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { FcSynchronize } from "react-icons/fc";
import { usePathname, useRouter } from "next/navigation";

export default function () {
  const router = useRouter();

  const path = usePathname();

  const supabase = createClientComponentClient();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const isAuthPage = path === "/auth";
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <FcSynchronize className="text-xl" />
        <h1 className="font-bold">LogSync</h1>
      </div>
      {!isAuthPage && (
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      )}
    </div>
  );
}
