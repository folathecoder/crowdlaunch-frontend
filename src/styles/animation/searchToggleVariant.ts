import { DEFAULT_DURATION, TRANSITION_TYPE } from './constants';

export const searchToggleVariant = (height: string) => {
  return {
    initial: {
      height: '0px',
      opacity: 0,
    },
    hidden: {
      height: '0px',
      opacity: 0,
      transition: {
        type: TRANSITION_TYPE,
        duration: DEFAULT_DURATION,
      },
    },
    show: {
      height: height,
      opacity: 1,
      transition: {
        type: TRANSITION_TYPE,
        duration: DEFAULT_DURATION,
      },
    },
    exit: {
      height: '0px',
      opacity: 0,
    },
  };
};
