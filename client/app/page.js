"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // redirect to dashboard only
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return null;
}
