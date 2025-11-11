"use client";

import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  PersonIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

function SignupForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", username: "", password: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)

    const res = await axios.post('/api/auth/register', data)
    console.log(res);
  });

  return (
    <form onSubmit={onSubmit}>
      <Flex direction={"column"} gap={"2"}>
        <label htmlFor="username">Username</label>
        <Controller
          control={control}
          name="username"
          rules={{ required: { message: "Username is required", value: true } }}
          render={({ field }) => (
            <TextField.Root
              {...field}
              id="username"
              type="text"
              placeholder="Jhon Doe"
              autoFocus
            >
              <TextField.Slot>
                <PersonIcon height={"16"} width={"16"} />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.username && (
          <Text color="red" size={"2"}>
            {errors.username.message}
          </Text>
        )}
        <label htmlFor="email">Email</label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: { message: "Email is required", value: true },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <TextField.Root
              {...field}
              id="email"
              type="email"
              placeholder="email@domain.com"
            >
              <TextField.Slot>
                <EnvelopeClosedIcon height={"16"} width={"16"} />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.email && (
          <Text color="red" size={"2"}>
            {errors.email.message}
          </Text>
        )}
        <label htmlFor="password">Password</label>
        <Controller
          control={control}
          name="password"
          rules={{
            required: { message: "Password is required", value: true },
            minLength: {
              message: "Password must be at least 6 characters",
              value: 6,
            },
          }}
          render={({ field }) => (
            <TextField.Root
              {...field}
              id="password"
              type="password"
              placeholder="********"
            >
              <TextField.Slot>
                <LockClosedIcon height={"16"} width={"16"} />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.password && (
          <Text color="red" size={"2"}>
            {errors.password.message}
          </Text>
        )}
        <Button>Sign Up</Button>
      </Flex>
    </form>
  );
}

export default SignupForm;
