import { DEFAULT_DURATION, TRANSITION_TYPE } from './constants';

export const filterToggleVariant = (switchToggleMode: boolean) => {
  if (switchToggleMode) {
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
        height: 'auto',
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
  } else {
    return {
      initial: {
        height: 'auto',
        opacity: 1,
      },
      hidden: {
        height: 'auto',
        opacity: 1,
        transition: {
          type: TRANSITION_TYPE,
          duration: DEFAULT_DURATION,
        },
      },
      show: {
        height: 'auto',
        opacity: 1,
        transition: {
          type: TRANSITION_TYPE,
          duration: DEFAULT_DURATION,
        },
      },
      exit: {
        height: 'auto',
        opacity: 1,
      },
    };
  }
};
