"use client";

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

const GithubButton = () => (
  <Button
    className="text-lg"
    color="primary"
    endContent={<FaGithub />}
    onClick={() => signIn("github")}
  >
    Join with
  </Button>
);

export default GithubButton;
