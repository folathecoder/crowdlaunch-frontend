import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import { NavContainer, NavHeader } from './mobileMenuStyles';
import HeaderMenu from '@/components/global/header/children/headerMenu/headerMenu';
import { ClickAwayListener } from '@mui/material';
import useEscapeKeyToggle from '@/hooks/useEscapeKeyToggle';
import { mobileNavVariant } from '@/styles/animation/mobileNavVariant';
import { AnimatePresence } from 'framer-motion';
import { useBreakPointUp } from '@/hooks/useBreakPoint';

interface MobileMenuTypes {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ showMobileMenu, setShowMobileMenu }: MobileMenuTypes) => {
  useEscapeKeyToggle({
    state: showMobileMenu,
    setState: setShowMobileMenu,
  });

  const { breakPoint: switchNavWidth } = useBreakPointUp({
    breakMark: 576,
  });

  return (
    <>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: '100vh',
        }}
        open={showMobileMenu}
        onClick={() => setShowMobileMenu(false)}
      />
      <ClickAwayListener onClickAway={() => setShowMobileMenu(false)}>
        <AnimatePresence>
          <NavContainer
            variants={mobileNavVariant(switchNavWidth ? '400px' : '100vw')}
            initial="hidden"
            animate={showMobileMenu ? 'show' : 'hidden'}
            exit="exit"
          >
            <NavHeader>
              <div className="gradient-link">
                <Link href="/marketplace" className="gradient-link">
                  Marketplace
                </Link>
              </div>
              <div>
                <button onClick={() => setShowMobileMenu(false)}>
                  <MdClose />
                </button>
              </div>
            </NavHeader>
            <div>
              <HeaderMenu setShowMobileMenu={setShowMobileMenu} />
            </div>
          </NavContainer>
        </AnimatePresence>
      </ClickAwayListener>
    </>
  );
};

export default MobileMenu;
