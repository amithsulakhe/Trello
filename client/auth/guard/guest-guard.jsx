"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/hooks/use-auth-context";
import UniversalLoader from "@/components/universal-loader";

// Separate component to handle search params
const GuardContent = ({ children }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const { loading, authenticated } = useAuthContext();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/dashboard";

  const checkPermission = async () => {
    if (loading) {
      return;
    }
    if (authenticated) {
      router.replace(returnTo);
      return;
    }
    setIsChecking(false);
  };

  useEffect(() => {
    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, authenticated]);

  if (isChecking) {
    return <UniversalLoader />;
  }

  return <>{children}</>;
};

// Main component with Suspense wrapper
export const GuestGuard = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <GuardContent>{children}</GuardContent>
  </Suspense>
);
