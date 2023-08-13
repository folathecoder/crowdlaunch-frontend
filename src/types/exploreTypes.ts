export interface RangeType {
  gt: number;
  lt: number;
}

export interface ExploreFilterType {
  minInvestment: RangeType;
  amountRaised: RangeType;
  targetAmount: RangeType;
  noOfInvestors: RangeType;
  noOfDaysLeft: RangeType;
  noOfLikes: RangeType;
  categories: string[];
}

export const initialExploreFilter: ExploreFilterType = {
  minInvestment: {
    gt: 0,
    lt: 0,
  },
  amountRaised: {
    gt: 0,
    lt: 0,
  },
  targetAmount: {
    gt: 0,
    lt: 0,
  },
  noOfInvestors: {
    gt: 0,
    lt: 0,
  },
  noOfDaysLeft: {
    gt: 0,
    lt: 0,
  },
  noOfLikes: {
    gt: 0,
    lt: 0,
  },
  categories: [],
};
