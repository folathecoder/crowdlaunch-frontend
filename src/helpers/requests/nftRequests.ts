import axios from 'axios';
import { NftMainType } from '@/types/projectTypes';

/**
 * Fetches all NFTs from the specified backend endpoint.
 *
 * @function
 * @async
 * @returns {Promise<NftMainType[] | null>} Returns a list of NFTs of type NftMainType on success, or null on failure.
 * @throws {Error} If there's a problem fetching the data, it logs the error and returns null.
 */

export const fetchAllNfts = async (): Promise<NftMainType[] | null> => {
  try {
    const response = await axios.get<NftMainType[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/Nft`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
