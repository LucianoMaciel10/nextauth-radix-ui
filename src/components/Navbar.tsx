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
import { ExitIcon, GearIcon, MixIcon, PersonIcon } from "@radix-ui/react-icons";

function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav
      className={`bg-zinc-950 px-10 xl:px-0 py-4 w-full ${
        (pathname.includes("auth") ||
          pathname.includes("new") ||
          pathname.includes("projects/")) &&
        "fixed top-0"
      }`}
    >
      <Container>
        <Flex justify={"between"} align={"center"} gap={"4"}>
          <Link href={"/"}>
            <Heading size={'4'} className="sm:hidden">RadixNext</Heading>
            <Heading className="hidden sm:block">RadixNext</Heading>
          </Link>
          <ul className="flex gap-x-4 sm:gap-x-8 items-center">
            {session ? (
              <>
                <li className="hidden sm:block">
                  <RadixLink asChild>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </RadixLink>
                </li>
                <li>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="surface">
                        {session?.user?.name}
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <Link href={'/dashboard'} className="sm:hidden">
                        <DropdownMenu.Item>
                          <MixIcon />
                          Dashboard
                        </DropdownMenu.Item>
                      </Link>
                      <DropdownMenu.Item>
                        <PersonIcon />
                        My Profile
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <GearIcon />
                        Settings
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item color="red" onClick={() => signOut()}>
                        <ExitIcon />
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
