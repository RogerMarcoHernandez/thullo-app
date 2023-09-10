"use client";
import GithubButton from "@/components/auth/GithubButton";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { signOut } from "next-auth/react";
import NextImage from "next/image";

const AuthPage = () => {
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
        <Button color="danger" className="mt-4" onClick={() => signOut()}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
