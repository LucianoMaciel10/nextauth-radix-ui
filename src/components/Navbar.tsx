"use client";

import {
  Button,
  Container,
  DropdownMenu,
  Flex,
  Heading,
} from "@radix-ui/themes";
import Link from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav
      className={`bg-zinc-950 px-8 py-4 w-full ${
        !pathname.includes("dashboard") && pathname !== "/" && "fixed top-0"
      }`}
    >
      <Container>
        <Flex justify={"between"} align={"center"}>
          <Link href={"/"}>
            <Heading>RadixNext</Heading>
          </Link>
          <ul className="flex gap-x-8 items-center">
            {session ? (
              <>
                <li>
                  <RadixLink asChild>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </RadixLink>
                </li>
                <li>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="soft">
                        {session?.user?.name}
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item>My Profile</DropdownMenu.Item>
                      <DropdownMenu.Item>Settings</DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item color="red" onClick={() => signOut()}>
                        Logout
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </li>
              </>
            ) : (
              <>
                <li>
                  <RadixLink asChild>
                    <Link href={"/auth/login"}>Login</Link>
                  </RadixLink>
                </li>
                <li>
                  <RadixLink asChild>
                    <Link href={"/auth/register"}>Register</Link>
                  </RadixLink>
                </li>
              </>
            )}
          </ul>
        </Flex>
      </Container>
    </nav>
  );
}

export default Navbar;
