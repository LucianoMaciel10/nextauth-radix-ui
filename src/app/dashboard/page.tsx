'use client'

import { Button, Container, Flex, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const router = useRouter()

  return (
    <Container className="mt-10 px-10">
      <Flex justify={"between"}>
        <Heading>Projects</Heading>
        <Button onClick={() => router.push('/dashboard/projects/new')}>Add Project</Button>
      </Flex>
    </Container>
  );
}

export default DashboardPage;
