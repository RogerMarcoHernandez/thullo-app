import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Spacer } from "@nextui-org/spacer";
import NextLink from "next/link";

const Form = () => (
  <form>
    <Input label="Name" type="text" required />
    <Spacer y={1} />
    <Input label="Email" type="email" required />
    <Spacer y={1} />
    <Input label="Password" type="password" required />
    <Spacer y={1} />
    <Input label="Confirm Password" type="password" required />
    <Spacer y={1} />
    <Button type="submit" fullWidth>
      Register
    </Button>
    <Link href="/auth/login" className="text-center mt-4" as={NextLink}>
      Already have an account? Login
    </Link>
  </form>
);

export default Form;
