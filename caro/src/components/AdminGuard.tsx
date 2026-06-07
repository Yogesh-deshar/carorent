"use client";

import { getAuthUser, isAdmin } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const user = getAuthUser();

    if (!user) {
      router.replace("/Login");
      return;
    }

    if (!isAdmin(user)) {
      router.replace("/Home");
      return;
    }

    setTimeout(() => {
      setAllowed(true);
    }, 100);
  }, [router]);

  if (!allowed) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Checking access...
      </div>
    );
  }

  return <>{children}</>;
}
