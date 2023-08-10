import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ProjectPageTemplate } from '@/components/project';
import { fetchAllProjects } from '@/helpers/requests/projectRequests';
import ProjectDetailProvider from '@/contexts/ProjectDetailContext';

interface PropsType {
  projectId: string;
}

const Project = ({ projectId }: PropsType) => {
  return (
    <ProjectDetailProvider projectId={projectId}>
      <ProjectPageTemplate />
    </ProjectDetailProvider>
  );
};

export const getStaticProps: GetStaticProps<
  PropsType,
  { projectId: string }
> = async ({ params }) => {
  if (!params || !params.projectId) {
    return {
      notFound: true,
    };
  }

  return {
    props: { projectId: params.projectId },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await fetchAllProjects();

  return {
    paths:
      projects?.map((project) => ({
        params: { projectId: project.projectId },
      })) || [],
    fallback: false,
  };
};

export default Project;
