import React from 'react';
import Link from 'next/link';
import { MenuList, MenuItem } from './headerMenuStyles';
import { headerMenu } from '@/data/menuData';
import { useRouter } from 'next/router';

interface HeaderMenuTypes {
  setShowMobileMenu?: React.Dispatch<boolean>;
}

const HeaderMenu = ({ setShowMobileMenu }: HeaderMenuTypes) => {
  const router = useRouter();
  const activeRoute = router.pathname;

  const handleCloseMenu = () => {
    if (setShowMobileMenu) setShowMobileMenu(false);
  };

  return (
    <MenuList>
      {headerMenu.map((nav) => (
        <MenuItem
          key={nav.id}
          active={activeRoute === nav.pageLink}
          onClick={handleCloseMenu}
        >
          <Link href={nav.pageLink}>{nav.pageName}</Link>
        </MenuItem>
      ))}
    </MenuList>
  );
};

export default HeaderMenu;
