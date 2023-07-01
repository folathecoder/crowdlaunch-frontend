import React from 'react';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import {
  NavContainer,
  NavHeader,
  NavSearchContainer,
  NavMenu,
} from './mobileMenuStyles';
import HeaderSearchBar from '@/components/global/header/children/headerSearch/headerSearch';
import HeaderMenu from '@/components/global/header/children/headerMenu/headerMenu';
import { ClickAwayListener } from '@mui/material';

interface MobileMenuTypes {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<boolean>;
}

const MobileMenu = ({ showMobileMenu, setShowMobileMenu }: MobileMenuTypes) => {
  return (
    <ClickAwayListener onClickAway={() => setShowMobileMenu(false)}>
      <NavContainer>
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
        <NavMenu>
          <HeaderMenu />
        </NavMenu>
      </NavContainer>
    </ClickAwayListener>
  );
};

export default MobileMenu;
