import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Spacer } from "@nextui-org/spacer";
import NextLink from "next/link";

const Form = () => (
  <form>
    <Input label="Email" type="email" required />
    <Spacer y={1} />
    <Input label="Password" type="password" required />
    <Spacer y={1} />
    <Button type="submit" fullWidth>
      Login
    </Button>
    <Link href="/auth/register" className="text-center mt-4" as={NextLink}>
      Don&apos;t have an account? Register
    </Link>
  </form>
);

export default Form;
