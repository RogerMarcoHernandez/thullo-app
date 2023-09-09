"use client";

import { Button } from "@nextui-org/react";

const Cta = () => (
  <section className="bg-primary py-12 text-center">
    <div className="container mx-auto text-white">
      <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
      <p className="text-lg mb-8">
        Join thousands of users who are already enjoying the benefits of Thullo.
      </p>
      <div>
        <Button size="lg" color="secondary" className="mx-auto">
          Sign Up for Free
        </Button>
      </div>
    </div>
  </section>
);

export default Cta;
