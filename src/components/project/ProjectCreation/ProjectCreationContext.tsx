import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import { ProjectFormType } from '@/types/projectTypes';
import useWallet from '@/wallet/useWallet';

export const initialProjectFormData: ProjectFormType = {
  main: {
    categoryId: '',
    projectName: '',
    bannerImageUrl: '',
    targetAmount: 0,
    minInvestment: 0,
    noOfDaysLeft: 0,
    projectWalletAddress: '',
    customColour: {
      fontColour: '#ffffff',
      bgColour1: '#21d4fd',
      bgColour2: '#b721ff',
    },
    projectStatus: 0,
    amountRaised: 0,
  },
  detail: {
    projectId: '',
    overview: '',
    competitors: '',
    strategy: '',
    financials: '',
    dividend: '',
    risks: '',
    performance: '',
  },
};

const getInitialFormData = () => {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('projectFormData');
    return savedData ? JSON.parse(savedData) : initialProjectFormData;
  }
  return initialProjectFormData;
};

export interface ProjectCreactionContextReturnTypes {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  projectFormData: ProjectFormType;
  setProjectFormData: React.Dispatch<React.SetStateAction<ProjectFormType>>;
  completedTabs: number[];
  setCompletedTabs: React.Dispatch<React.SetStateAction<number[]>>;
  formCompleted: boolean;
  setFormCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PropTypes {
  children: ReactNode;
}

export const ProjectCreactionContext =
  React.createContext<ProjectCreactionContextReturnTypes | null>(null);

const ProjectCreactionProvider = ({ children }: PropTypes): ReactElement => {
  const { wallet } = useWallet();

  const [formCompleted, setFormCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [completedTabs, setCompletedTabs] = useState<number[] | []>([]);
  const [projectFormData, setProjectFormData] =
    useState<ProjectFormType>(getInitialFormData);

  // Save the form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('projectFormData', JSON.stringify(projectFormData));
  }, [projectFormData]);

  // Save to localStorage whenever activeTab changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab.toString());
  }, [activeTab]);

  // Set project wallet address
  useEffect(() => {
    if (wallet.walletAddress) {
      setProjectFormData((prevState) => ({
        ...prevState,
        main: {
          ...prevState.main,
          projectWalletAddress: wallet.walletAddress || '',
        },
      }));
    }
  }, [wallet.walletAddress]);

  return (
    <ProjectCreactionContext.Provider
      value={{
        activeTab,
        setActiveTab,
        projectFormData,
        setProjectFormData,
        completedTabs,
        setCompletedTabs,
        formCompleted,
        setFormCompleted,
      }}
    >
      {children}
    </ProjectCreactionContext.Provider>
  );
};

export default ProjectCreactionProvider;
