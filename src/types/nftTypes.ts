import { StaticImageData } from 'next/image';

export interface NFTCardTypes {
  id: number;
  NFTName: string;
  NFTImage: StaticImageData;
  NFTCreatorName: string;
  NFTCreatorImage: StaticImageData;
}
