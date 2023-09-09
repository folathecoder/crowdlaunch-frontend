import { useState } from 'react';
import { create as ipfsHttpClient, Options } from 'ipfs-http-client';

//IPFS project information
const authorization =
  'Basic ' +
  Buffer.from(
    process.env.NEXT_PUBLIC_IPFS_API_KEY +
      ':' +
      process.env.NEXT_PUBLIC_IPFS_SECRET_KEY
  ).toString('base64');

// Define your options
const options: Options = {
  url: 'https://ipfs.infura.io:5001',
  headers: {
    authorization,
  },
};

// Create an IPFS client with the provided options
const client = ipfsHttpClient(options);

interface UploadToIpfsResult {
  uploading: boolean;
  uploadFileToIpfs: (file: string) => Promise<string | null>;
}

const useUploadToIpfs = (): UploadToIpfsResult => {
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadFileToIpfs = async (file: string): Promise<string | null> => {
    try {
      setUploading(true);

      const added = await client.add({ content: file });
      const url = `https://crowdlaunch.infura-ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (err) {
      console.log(err || 'An error occurred while uploading to IPFS');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, uploadFileToIpfs };
};

export default useUploadToIpfs;
