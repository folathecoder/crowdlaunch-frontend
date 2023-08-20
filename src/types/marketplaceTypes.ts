export interface RangeType {
  min: number | '';
  max: number | '';
}

export interface ExploreFilterType {
  price: RangeType;
}

export const initialExploreFilter: ExploreFilterType = {
  price: {
    min: '',
    max: '',
  },
};
