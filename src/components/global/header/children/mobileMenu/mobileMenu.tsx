import React from 'react';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import {
  NavContainer,
  NavHeader,
  NavSearchContainer,
} from './mobileMenuStyles';
import HeaderSearchBar from '@/components/global/header/children/headerSearch/headerSearch';
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
    <ClickAwayListener onClickAway={() => setShowMobileMenu(false)}>
      <AnimatePresence>
        <NavContainer
          variants={mobileNavVariant(switchNavWidth ? '500px' : '100vw')}
          initial={showMobileMenu ? 'hidden' : 'normal'}
          animate={showMobileMenu ? 'show' : 'hidden'}
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
          <NavSearchContainer>
            <HeaderSearchBar fullWidth />
          </NavSearchContainer>
          <div>
            <HeaderMenu />
          </div>
        </NavContainer>
      </AnimatePresence>
    </ClickAwayListener>
  );
};

export default MobileMenu;
