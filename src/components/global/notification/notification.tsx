import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IoIosNotifications } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { ClickAwayListener } from '@mui/material';

const Container = styled(motion.div)`
  background: rgb(9, 6, 6);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  position: fixed;
  top: 6rem;
  left: 1rem;
  z-index: 9000;
  border: 1px solid var(--color-border-100);

  & > * {
    height: 100%;
    display: flex;
    align-items: center;
  }

  p {
    color: var(--color-font-100);
  }

  .icon {
    color: var(--color-accent-100);
    font-size: 1.5rem;
  }
`;

const variants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: '50px',
  },
};

interface PropType {
  message: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Notification = ({ message, state, setState }: PropType) => {
  useEffect(() => {
    if (state) {
      const timer = setTimeout(() => {
        setState(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [state, setState]);

  return (
    <AnimatePresence>
      {state && (
        <ClickAwayListener onClickAway={() => setState(false)}>
          <Container
            role="alert"
            aria-label="info notification"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <div className="icon">
              <IoIosNotifications />
            </div>
            <div>
              <p>{message}</p>
            </div>
          </Container>
        </ClickAwayListener>
      )}
    </AnimatePresence>
  );
};

export default Notification;
