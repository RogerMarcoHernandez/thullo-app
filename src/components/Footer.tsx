"use client";

import { Link } from "@nextui-org/react";
import Image from "next/image";
import { default as NextLink } from "next/link";
import { FaGithub } from "react-icons/fa";

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
      <div className="bg-white rounded-lg shadow-md p-6 mt-2">
        <NextLink
          href="https://github.com/RogerMarcoHernandez/thullo-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-dark transition duration-300"
        >
          <FaGithub name="github" size={24} className="mb-4" />
          <h3 className="text-lg font-semibold mb-2">GitHub</h3>
          <p className="text-gray-600">Check out our code on GitHub.</p>
        </NextLink>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-2">
        <NextLink
          href="https://devchallenges.io/portfolio/RogerMarcoHernandez"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-dark transition duration-300"
        >
          <Image
            src="/devchallenges.png"
            alt="DevChallenges"
            height={24}
            width={24}
            className="mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">DevChallenges</h3>
          <p className="text-gray-600">View my portfolio on DevChallenges.</p>
        </NextLink>
      </div>
      {/* Contact information */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-2">
        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
        <p className="text-gray-600">
          Have questions or feedback? Feel free to reach out!
        </p>
        <div className="mt-4">
          <p className="font-semibold">Email:</p>
          <Link
            as={NextLink}
            href="mailto:bluntun@gmail.com"
            className="text-primary hover:underline transition duration-300"
          >
            bluntun@gmail.com
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
