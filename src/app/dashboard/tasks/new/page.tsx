"use client";

import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

function TaskNewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);

    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Container size="1" height="100%" className="p-3 md:p-0">
      <Flex className="h-screen w-full items-center">
        <Card className="w-full" size={"4"}>
          <Heading mb={"2"} className="text-center">
            Create New Project
          </Heading>
          <form onSubmit={onSubmit}>
            <Flex direction={"column"} gap={"2"}>
              <label htmlFor="title">Project Title</label>
              <Controller
                name="title"
                rules={{
                  required: { message: "Title is required", value: true },
                }}
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    autoFocus
                    {...field}
                    size={"3"}
                    placeholder="Enter a title"
                    id="title"
                  />
                )}
              />
              {errors.title && <Text color="red">{errors.title.message}</Text>}
              <label htmlFor="description">Project Description</label>
              <Controller
                control={control}
                rules={{
                  required: { message: "Description is required", value: true },
                }}
                name="description"
                render={({ field }) => (
                  <TextArea
                    size={"3"}
                    {...field}
                    placeholder="Enter a description"
                    id="description"
                  />
                )}
              />
              {errors.description && (
                <Text color="red">{errors.description.message}</Text>
              )}
              <Button loading={isLoading} mt={"2"}>
                Create Project
              </Button>
            </Flex>
          </form>
        </Card>
      </Flex>
    </Container>
  );
}

export default TaskNewPage;
