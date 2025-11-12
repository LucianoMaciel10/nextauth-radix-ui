"use client";

import { Project } from "@prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Props {
  project: Project;
}

function ProjectCard({ project }: Props) {
  const router = useRouter();
  const { description, id, title } = project;

  return (
    <Card
      onClick={() => router.push(`/dashboard/projects/${id}`)}
      key={id}
      className="hover:cursor-pointer hover:opacity-85"
    >
      <Heading>{title}</Heading>
      <Text className="text-slate-500">{description}</Text>
    </Card>
  );
}

export default ProjectCard;
