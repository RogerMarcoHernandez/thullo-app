"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <NextUIProvider>{children}</NextUIProvider>
  </SessionProvider>
);

export default Providers;
