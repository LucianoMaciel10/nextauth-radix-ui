import SignupForm from "@/src/components/auth/SignupForm";
import {
  Container,
  Card,
  Link as RadixLink,
  Heading,
  Flex,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";

function RegisterPage() {
  return (
    <>
      <Container size="1" height="100%" className="px-4 md:px-0">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full" size={"4"}>
            <Heading className="text-center">Sign Up</Heading>
            <SignupForm />
            <Flex justify={"between"} mt={"3"}>
              <Text>Already have an Account?</Text>
              <RadixLink asChild>
                <Link href={"/auth/login"}>Sign In</Link>
              </RadixLink>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </>
  );
}

export default RegisterPage;
