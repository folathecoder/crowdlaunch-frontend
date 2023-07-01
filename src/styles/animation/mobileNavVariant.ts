import { DEFAULT_DURATION, TRANSITION_TYPE } from './constants';

export const mobileNavVariant = (width: string) => {
  return {
    initial: {
      width: '0px',
    },
    hidden: {
      width: '0px',
      transition: {
        type: TRANSITION_TYPE,
        duration: DEFAULT_DURATION,
      },
    },
    show: {
      width: width,
      transition: {
        type: TRANSITION_TYPE,
        duration: DEFAULT_DURATION,
      },
    },
  };
};
