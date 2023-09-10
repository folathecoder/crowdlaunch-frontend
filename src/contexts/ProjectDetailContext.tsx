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
import useUploadToIpfs from '@/hooks/useUploadToIpfs';
import useNftMetadataCreator from '@/hooks/useNftMetadataCreator';
import useGetTokenId from '@/hooks/ContractHooks/useGetTokenId';

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
  tokenURI: string | null;
  tokenURILoading: boolean;
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
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [tokenURI, setTokenURI] = useState<string | null>(null);
  const [tokenURILoading, setTokenURILoading] = useState(false);

  const { nextTokenId } = useGetTokenId();
  const { uploadFileToIpfs } = useUploadToIpfs();
  const { generateMetaData } = useNftMetadataCreator({
    companyName: project?.project.projectName,
    industry: project?.category.categoryName,
    totalShare: project?.project.targetAmount,
    sharePrice: fundAmount,
    shareId: nextTokenId,
    nftImage: ipfsUrl,
  });

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

  // Callback used to generate NFT image template URL for IPFS
  const generateNftImage = useCallback(async () => {
    if (nftImageRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(nftImageRef.current, { cacheBust: true });

      const link = document.createElement('a');
      link.href = dataUrl;
      setRawNftImageUrl(dataUrl);

      // Upload to IPFS
      const url = await uploadFileToIpfs(dataUrl);
      setIpfsUrl(url);
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftImageRef]);

  // Callback user to generate tokenURI will all required metadata in JSON
  const generateTokenUri = useCallback(async () => {
    if (ipfsUrl)
      try {
        setTokenURILoading(true);
        const metaData = JSON.stringify(generateMetaData(), null, 2);
        const url = await uploadFileToIpfs(metaData);
        setTokenURI(url);

        if (url) setTokenURILoading(false);
      } catch (err) {
        console.error(err);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipfsUrl]);

  // Initiates the token URI generation when the ipfsUrl is available
  useEffect(() => {
    if (ipfsUrl) {
      generateTokenUri();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipfsUrl]);

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
        tokenURI,
        tokenURILoading,
      }}
    >
      {children}
    </ProjectDetailContext.Provider>
  );
};

export default ProjectDetailProvider;
