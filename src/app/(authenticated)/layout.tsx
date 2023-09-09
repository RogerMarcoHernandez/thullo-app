"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  if (!session) {
    redirect("/auth");
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
