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

export interface UpdateType {
  projectUpdateId: string;
  projectId: string;
  updateTitle: string;
  updateMessage: string;
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
  projectUpdates: UpdateType[];
  projectDetails: DetailsType;
}

export interface PortfolioType {
  portfolioId: string;
  userId: string;
  projectId: string;
  status: number;
  investmentDate: string;
  amountInvested: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileType {
  user: UserType;
  portfolios: PortfolioType[];
  listedProjects: ProjectType[];
  ownedNfts: OwnedNFTsType[];
  projectWatchlist: ProjectType[];
  nftWatchlist: OwnedNFTsType[];
  createdAt: string;
  updatedAt: string;
}

export interface UserType {
  userId: string;
  userName: string;
  walletAddress: string;
  socials: {
    websiteUrl: string;
    twitterUrl: string;
    telegramUrl: string;
    discordUrl: string;
  };
  userProfileImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface OwnedNFTsType {
  userNftId: string;
  userId: string;
  nftId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWatchlistType {
  projectLikeId: string;
  userId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NftType {
  nft: {
    nftId: string;
    creatorId: string;
    nftName: string;
    nftDescription: string;
    price: number;
    noOfLikes: number;
    ownerId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  };
  category: {
    categoryId: string;
    categoryName: string;
    categoryDescription: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LikedProjectType {
  projectLikeId: string;
  userId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectUpdateType {
  projectId: string;
  updateTitle: string;
  updateMessage: string;
}

export interface UserUpdateType {
  userName: string;
  socials: {
    websiteUrl: string;
    twitterUrl: string;
    telegramUrl: string;
    discordUrl: string;
  };
  userProfileImage: string;
  updatedAt: string;
}

export interface ProjectDetailPostType {
  projectId: string;
  overview: string;
  competitors: string;
  strategy: string;
  financials: string;
  dividend: string;
  risks: string;
  performance: string;
}

export interface ProjectPostType {
  categoryId: string;
  projectName: string;
  bannerImageUrl: string;
  targetAmount: number;
  minInvestment: number;
  noOfDaysLeft: number;
  projectWalletAddress: string;
  customColour: {
    fontColour: string;
    bgColour1: string;
    bgColour2: string;
  };
  projectStatus: number;
  amountRaised: number;
}

export interface ProjectFormType {
  main: ProjectPostType;
  detail: ProjectDetailPostType;
}
