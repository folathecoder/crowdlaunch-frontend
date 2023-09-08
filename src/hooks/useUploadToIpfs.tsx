import { useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';

// Replace with your IPFS HTTP API endpoint
const ipfsOptions = {
  url: 'https://ipfs.infura.io:5001/api/v0',
};

const client = ipfsHttpClient(ipfsOptions);

interface UploadToIpfsResult {
  ipfsUrl: string | null;
  uploading: boolean;
  uploadFileToIpfs: (file: File) => Promise<void>;
}

const useUploadToIpfs = (): UploadToIpfsResult => {
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadFileToIpfs = async (file: File): Promise<void> => {
    try {
      setUploading(true);

      const added = await client.add({ content: file });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setIpfsUrl(url);
    } catch (err) {
      console.log(err || 'An error occurred while uploading to IPFS');
    } finally {
      setUploading(false);
    }
  };

  return { ipfsUrl, uploading, uploadFileToIpfs };
};

export default useUploadToIpfs;
