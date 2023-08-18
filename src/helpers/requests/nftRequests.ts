import axios from 'axios';
import { NftMainType } from '@/types/projectTypes';

export const fetchAllNfts = async (): Promise<NftMainType[] | null> => {
  try {
    const response = await axios.get<NftMainType[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/Nft}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
