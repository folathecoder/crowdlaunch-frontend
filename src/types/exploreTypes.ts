export interface RangeType {
  gt: number | '';
  lt: number | '';
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
    gt: '',
    lt: '',
  },
  amountRaised: {
    gt: '',
    lt: '',
  },
  targetAmount: {
    gt: '',
    lt: '',
  },
  noOfInvestors: {
    gt: '',
    lt: '',
  },
  noOfDaysLeft: {
    gt: '',
    lt: '',
  },
  categoryId: [],
};
