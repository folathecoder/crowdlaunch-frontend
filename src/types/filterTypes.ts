export interface FilterTypes {
  minInvestment: {
    min: number | null;
    max: number | null;
  };
  amountRaised: {
    min: number | null;
    max: number | null;
  };
  targetAmount: {
    min: number | null;
    max: number | null;
  };
  categories: string[] | [];
  noOfInvestors: {
    min: number | null;
    max: number | null;
  };
  noOfDaysLeft: {
    min: number | null;
    max: number | null;
  };
  noOfLikes: {
    min: number | null;
    max: number | null;
  };
}

export const initialFilter: FilterTypes = {
  minInvestment: {
    min: null,
    max: null,
  },
  amountRaised: {
    min: null,
    max: null,
  },
  targetAmount: {
    min: null,
    max: null,
  },
  categories: [],
  noOfInvestors: {
    min: null,
    max: null,
  },
  noOfDaysLeft: {
    min: null,
    max: null,
  },
  noOfLikes: {
    min: null,
    max: null,
  },
};
