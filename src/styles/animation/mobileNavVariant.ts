import { DEFAULT_DURATION, TRANSITION_TYPE } from './constants';

export const mobileNavVariant = (width: string) => {
  return {
    initial: {
      width: '0px',
      opacity: 0,
    },
    hidden: {
      width: '0px',
      opacity: 0,
      transition: {
        type: TRANSITION_TYPE,
        duration: DEFAULT_DURATION,
      },
    },
    show: {
      width: width,
      opacity: 1,
      transition: {
        type: TRANSITION_TYPE,
        duration: DEFAULT_DURATION,
      },
    },
    exit: {
      width: '0px',
      opacity: 0,
    },
  };
};
