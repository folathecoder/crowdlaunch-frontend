const currentDate = new Date();

interface ReturnType {
  generateMetaData: () => MetadataType;
}

export interface MetadataType {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number | Date;
  }[];
}

interface PropType {
  companyName?: string;
  industry?: string;
  totalShare?: number;
  sharePrice: number | '';
  shareId: string | number;
  nftImage: string | null;
}

const useNftMetadataCreator = ({
  companyName,
  industry,
  totalShare,
  sharePrice,
  shareId,
  nftImage,
}: PropType): ReturnType => {
  //Function that dynamically generates NFT metadata
  const generateMetaData = (): MetadataType => {
    return {
      name: `${companyName} Share #${shareId}`,
      description: `This NFT represents shares in ${companyName}, a renowned and innovative ${industry} company with a history of pioneering advancements in ${industry}-specific technology/innovations. As a shareholder, you will have a stake in the company's future, allowing you to participate in important decisions, receive dividends, and benefit from the potential growth of your investment. Join us in shaping the future of the ${industry} sector with your ownership stake in ${companyName}.`,
      image: nftImage ?? '',
      attributes: [
        {
          trait_type: 'Company',
          value: companyName ?? '',
        },
        {
          trait_type: 'Industry',
          value: industry ?? '',
        },
        {
          trait_type: 'Total Shares',
          value: totalShare ?? '',
        },
        {
          trait_type: 'Ownership Percentage',
          value: sharePrice && totalShare ? (sharePrice * totalShare) / 100 : 0,
        },
        {
          trait_type: 'Share Price',
          value: sharePrice,
        },
        {
          trait_type: 'Share Class',
          value: 'Profit Share',
        },
        {
          trait_type: 'Date Issued',
          value: currentDate,
        },
      ],
    };
  };

  return { generateMetaData };
};

export default useNftMetadataCreator;
