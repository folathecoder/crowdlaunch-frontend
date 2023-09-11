import { useEffect, useState } from 'react';
import { MetadataType } from '@/hooks/useNftMetadataCreator';

interface ReturnType {
  data: MetadataType | null;
  loading: boolean;
  error: string | null;
}

interface PropType {
  tokenURI: string;
}

const useReadTokenURI = ({ tokenURI }: PropType): ReturnType => {
  const [data, setData] = useState<MetadataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data from the tokenURI
        const response = await fetch(tokenURI);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const jsonData: MetadataType = await response.json();

        // Set the data
        setData(jsonData);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err as any);
        setLoading(false);
      }
    };

    if (tokenURI) {
      fetchData();
    }
  }, [tokenURI]);

  return { data, loading, error };
};

export default useReadTokenURI;
