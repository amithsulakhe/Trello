import React from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/hooks/use-auth-context";

import { setSession } from "@/auth/context/jwt/utils";

import { DropdownMenuItem } from "./ui/dropdown-menu";

const LogoutComponent = () => {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const handleLogout = () => {
    setSession(null);
    checkUserSession?.();
    router.refresh();
  };
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
      <span className="text-sm">Log out</span>
    </DropdownMenuItem>
  );
};

export default LogoutComponent;
