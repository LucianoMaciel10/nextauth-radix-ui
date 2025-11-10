/* eslint-disable react/no-unescaped-entities */
import SigninForm from "@/src/components/auth/SigninForm";
import {
  Container,
  Card,
  Link as RadixLink,
  Heading,
  Flex,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";

function LoginPage() {
  return (
    <>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full" size={"4"}>
            <Heading className="text-center">Sign In</Heading>
            <SigninForm />
            <Flex justify={"between"} mt={"3"}>
              <Text>Don't have an Account?</Text>
              <RadixLink asChild>
                <Link href={"/auth/register"}>Sign Up</Link>
              </RadixLink>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </>
  );
}

export default LoginPage;
