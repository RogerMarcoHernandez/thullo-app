"use client";

import { Link } from "@nextui-org/react";
import { default as NextLink } from "next/link";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Thullo. All rights reserved.
      </p>
      <div className="mt-4 flex gap-2 justify-center">
        <Link href="/privacy" as={NextLink}>
          Privacy Policy
        </Link>
        <Link href="/terms" as={NextLink}>
          Terms of Service
        </Link>
      </div>
      {/* Social media icons */}
      {/* Contact information */}
    </div>
  </footer>
);

export default Footer;
