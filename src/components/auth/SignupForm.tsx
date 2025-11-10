
import { Button, Flex, TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon, PersonIcon, LockClosedIcon } from "@radix-ui/react-icons";

function SignupForm() {
  return (
    <Flex direction={"column"} gap={'2'}>
      <label htmlFor="username">Username</label>
      <TextField.Root id="username" type="text" placeholder="Jhon Doe" autoFocus>
        <TextField.Slot>
          <PersonIcon height={"16"} width={"16"} />
        </TextField.Slot>
      </TextField.Root>
      <label htmlFor="email">Email</label>
      <TextField.Root id="email" type="email" placeholder="email@domain.com">
        <TextField.Slot>
          <EnvelopeClosedIcon height={"16"} width={"16"} />
        </TextField.Slot>
      </TextField.Root>
      <label htmlFor="password">Password</label>
      <TextField.Root id="password" type="password" placeholder="********">
        <TextField.Slot>
          <LockClosedIcon height={"16"} width={"16"} />
        </TextField.Slot>
      </TextField.Root>
      <Button>Sign Up</Button>
    </Flex>
  );
}

export default SignupForm;
