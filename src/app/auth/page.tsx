"use client";
import GithubButton from "@/components/auth/GithubButton";
import { Image } from "@nextui-org/image";
import { useSession } from "next-auth/react";
import NextImage from "next/image";
import { redirect } from "next/navigation";

const AuthPage = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-gradient-to-br from-blue-200 to-cyan-200 flex flex-col items-center justify-center px-2 gap-8 h-screen">
      <Image
        as={NextImage}
        width={300}
        height={200}
        src="/logo.svg"
        alt="Thullo logo"
      />
      <div className="flex flex-col justify-center items-center">
        <GithubButton />
      </div>
    </div>
  );
};

export default AuthPage;
