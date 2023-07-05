import { StaticImageData } from 'next/image';

export interface ServicesContentTypes {
  id: number;
  title: string;
  subTitle: string;
  text?: string;
  icon: StaticImageData;
  link: string;
}

export interface BenefitContentTypes {
  subHeading: string;
  mainHeading: string;
  description: string;
  mainBenefit: MainBenefitTypes[];
  primaryContent: {
    heading: string;
    mainDescription: string;
    miniDescription: string;
    miniService: MainBenefitTypes[];
  };
  secondaryContent: {
    marketContent: {
      heading: string;
      icon: string;
      title: string;
    };
    experienceContent: {
      heading: string;
      miniContent: string[];
    };
    revenueContent: {
      heading: string;
      title: string;
    };
  };
}

interface MainBenefitTypes {
  id: number;
  icon: StaticImageData;
  title: string;
}
