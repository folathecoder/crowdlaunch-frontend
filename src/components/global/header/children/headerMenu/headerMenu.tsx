import React, { useState } from 'react';
import Link from 'next/link';
import { MenuList, MenuItem } from './headerMenuStyles';
import { headerMenu } from '@/data/menuData';
import { useRouter } from 'next/router';

const HeaderMenu = () => {
  const router = useRouter();
  const activeRoute = router.pathname;

  return (
    <MenuList>
      {headerMenu.map((nav) => (
        <MenuItem key={nav.id} active={activeRoute === nav.pageLink}>
          <Link href={nav.pageLink}>{nav.pageName}</Link>
        </MenuItem>
      ))}
    </MenuList>
  );
};

export default HeaderMenu;
