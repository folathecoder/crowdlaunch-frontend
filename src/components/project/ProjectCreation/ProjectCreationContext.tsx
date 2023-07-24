import React, { ReactElement, ReactNode, useState } from 'react';

export interface ProjectCreactionContextReturnTypes {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

interface PropTypes {
  children: ReactNode;
}

export const ProjectCreactionContext =
  React.createContext<ProjectCreactionContextReturnTypes | null>(null);

const ProjectCreactionProvider = ({ children }: PropTypes): ReactElement => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ProjectCreactionContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ProjectCreactionContext.Provider>
  );
};

export default ProjectCreactionProvider;
