"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/hooks/use-auth-context";

// Separate component to handle route protection logic
const AuthContent = ({ children }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const { loading, authenticated } = useAuthContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const signInPath = "/login";

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const checkPermission = async () => {
    if (loading) {
      return;
    }

    if (!authenticated) {
      const href = `${signInPath}?${createQueryString("returnTo", pathname)}`;
      router.replace(href);
      return;
    }
    setIsChecking(false);
  };

  useEffect(() => {
    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, authenticated]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

// Main component with Suspense wrapper
export const AuthGuard = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <AuthContent>{children}</AuthContent>
  </Suspense>
);
