import React, {
  ReactElement,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { toPng } from 'html-to-image';
import useGetProjectById from '@/hooks/RequestHooks/GET/useGetProjectById';
import { ProjectDetailType } from '@/types/projectTypes';
import { FetchingStatus } from '@/types/fetchingTypes';
import usePostAuth from '@/hooks/RequestHooks/POST/usePostAuth';
import useGetUserByAddress from '@/hooks/RequestHooks/GET/useGetUserByAddress';
import useWallet from '@/wallet/useWallet';

export interface ProjectDetailContextReturnTypes {
  project: ProjectDetailType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
  isProjectCreator: boolean;
  refetch: () => void;
  projectId: string;
  updateCount: number;
  setUpdateCount: React.Dispatch<React.SetStateAction<number>>;
  fundAmount: number | '';
  setFundAmount: React.Dispatch<React.SetStateAction<number | ''>>;
  rawNftImageUrl: string;
  nftImageRef: React.RefObject<HTMLDivElement>;
  generateNftImage: () => void;
}

interface PropTypes {
  children: ReactNode;
  projectId: string;
}

export const ProjectDetailContext =
  React.createContext<ProjectDetailContextReturnTypes | null>(null);

const ProjectDetailProvider = ({
  children,
  projectId,
}: PropTypes): ReactElement => {
  const { wallet } = useWallet();
  const { userData } = usePostAuth();
  const { user } = useGetUserByAddress({
    jwtToken: userData?.token,
  });

  const { project, fetchingStatus, error, refetch } = useGetProjectById({
    projectId: projectId,
  });

  const [isProjectCreator, setIsProjectCreator] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [fundAmount, setFundAmount] = useState<number | ''>('');
  const [rawNftImageUrl, setRawNftImageUrl] = useState('');

  // Check if the project creator is the active view for the project
  // Make creator functionalities accessible to the user if, a creator
  useEffect(() => {
    setIsProjectCreator(
      user?.user.userId === project?.project.userId &&
        wallet.walletStatus.isConnected
    );
  }, [
    user?.user.userId,
    project?.project.userId,
    wallet.walletStatus.isConnected,
  ]);

  const nftImageRef = useRef<HTMLDivElement>(null);

  // Callback used to generate NFT image template URl for IPFS
  const generateNftImage = useCallback(() => {
    if (nftImageRef.current === null) {
      return;
    }

    toPng(nftImageRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `nft-template.png`;
        link.click();
        setRawNftImageUrl(dataUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nftImageRef]);

  console.log(rawNftImageUrl);

  return (
    <ProjectDetailContext.Provider
      value={{
        project,
        fetchingStatus,
        error,
        isProjectCreator,
        refetch,
        projectId,
        updateCount,
        setUpdateCount,
        fundAmount,
        setFundAmount,
        rawNftImageUrl,
        nftImageRef,
        generateNftImage,
      }}
    >
      {children}
    </ProjectDetailContext.Provider>
  );
};

export default ProjectDetailProvider;
