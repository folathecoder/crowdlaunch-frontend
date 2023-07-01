import { useEffect } from 'react';

interface PropTypes {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const useEscapeKeyToggle = ({ state, setState }: PropTypes) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setState((prevState) => !prevState);
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [setState]);
};

export default useEscapeKeyToggle;
