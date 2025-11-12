"use client";

import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
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
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

function ProjectNewPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      if (!params.projectId) {
        await axios.post("/api/projects", data);
      } else {
        await axios.put(`/api/projects/${params.projectId}`, data);
      }
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  });

  const handleDelete = async (projectId: string) => {
    const res = await axios.delete(`/api/projects/${projectId}`);
    if (res.status === 200) toast.success("Project deleted successfully");
    router.push("/dashboard");
  };

  useEffect(() => {
    if (params.projectId) {
      axios.get(`/api/projects/${params.projectId}`).then((res) => {
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      });
    }
  }, []);

  return (
    <Container size="1" height="100%" className="px-4 md:px-0">
      <Flex className="h-screen w-full items-center">
        <Card className="w-full" size={"4"}>
          <Heading mb={"2"} className="text-center">
            {params.projectId ? "Edit Project" : "New Project"}
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
              <Button color="jade" size={"3"} loading={isLoading} mt={"2"}>
                <CheckIcon className="size-5" />
                {params.projectId ? "Save" : "Create"}
              </Button>
            </Flex>
          </form>
          {params.projectId && (
            <Flex mt={"2"} justify={"end"}>
              <Button
                onClick={() => handleDelete(params.projectId as string)}
                color="ruby"
                size={"3"}
                mt={"2"}
              >
                <TrashIcon className="size-4" />
                Delete
              </Button>
            </Flex>
          )}
        </Card>
      </Flex>
    </Container>
  );
}

export default ProjectNewPage;
