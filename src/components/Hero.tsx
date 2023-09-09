"use client";
import { Button } from "@nextui-org/react";

const Hero = () => (
  <section className="bg-cover bg-center h-screen flex items-center">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-semibold mb-4">Welcome to Thullo</h1>
      <p className="text-lg text-gray-600">
        Organize tasks, collaborate seamlessly, and boost productivity.
      </p>
      <div className="mt-6">
        <Button size="lg" color="primary">
          Get Started
        </Button>
        <Button size="lg" color="secondary" className="ml-4">
          Learn More
        </Button>
      </div>
    </div>
  </section>
);

export default Hero;
