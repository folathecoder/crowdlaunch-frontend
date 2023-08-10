export interface CategoryType {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectType {
  projectId: string;
  userId: string;
  categoryId: string;
  projectName: string;
  bannerImageUrl: string;
  targetAmount: number;
  amountRaised: number;
  minInvestment: number;
  noOfInvestors: number;
  noOfDaysLeft: number;
  noOfLikes: number;
  projectWalletAddress: string;
  customColour: {
    fontColour: string;
    bgColour1: string;
    bgColour2: string;
  };
  projectStatus: number;
  createdAt: string;
  updatedAt: string;
}

export interface DetailsType {
  projectDetailId: string;
  projectId: string;
  overview: string;
  competitors: string;
  strategy: string;
  financials: string;
  dividend: string;
  performance: string;
  risks: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetailType {
  project: ProjectType;
  category: CategoryType;
  projectUpdates: [];
  projectDetails: DetailsType;
}
