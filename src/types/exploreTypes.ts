export interface RangeType {
  gt: number;
  lt: number;
}

export interface ExploreFilterType {
  newest: boolean;
  trending: boolean;
  active: boolean;
  mostLiked: boolean;
  minInvestment: RangeType;
  amountRaised: RangeType;
  targetAmount: RangeType;
  noOfInvestors: RangeType;
  noOfDaysLeft: RangeType;
  categoryId: string[] | [];
}

export const initialExploreFilter: ExploreFilterType = {
  newest: false,
  trending: false,
  active: false,
  mostLiked: false,
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
  categoryId: [],
};
