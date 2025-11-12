import HeaderDashboard from "@/src/components/dashboard/HeaderDashboard";
import prisma from "@/src/libs/prisma";
import { Container } from "@radix-ui/themes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectCard from "@/src/components/projects/ProjectCard";

const loadProjects = async () => {
  const session = await getServerSession(authOptions);
  return await prisma.project.findMany({ where: { userId: session?.user.id } });
};

async function DashboardPage() {
  const projects = await loadProjects();

  return (
    <Container className="mt-10 px-10">
      <HeaderDashboard />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Container>
  );
}

export default DashboardPage;
