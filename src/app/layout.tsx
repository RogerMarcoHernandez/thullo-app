import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thullo - Collaborative Task Management",
  description:
    "Thullo is a powerful collaborative task management application inspired by Trello. Organize your projects, manage tasks, and work seamlessly with your team.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="dark">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
