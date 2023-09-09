import { StaticImageData } from 'next/image';

export interface NFTCardTypes {
  id: number;
  NFTName: string;
  NFTImage: StaticImageData;
  NFTCreatorName: string;
  NFTCreatorImage: StaticImageData;
}

export interface NFTPostData {
  nftName: string;
  nftDescription: string;
  price: number;
  nftImage: string;
  nftWalletAddress: string;
  categoryId: string;
}
