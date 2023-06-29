import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HeaderContainer,
  HeaderInner,
  HeaderRight,
  HeaderLeft,
  HeaderLogo,
  HeaderSearch,
  HeaderMenu,
} from './headerStyles';
import { AppLogo } from 'public/images';
import { APP_NAME } from '@/data/appInfo';
import HeaderSearchBar from './children/headerSearch/headerSearch';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        <HeaderRight>
          <HeaderLogo>
            <Link href="/">
              <Image src={AppLogo} alt={APP_NAME} width={35} height={35} />
            </Link>
          </HeaderLogo>
          <HeaderSearch>
            <HeaderSearchBar />
          </HeaderSearch>
          <HeaderMenu></HeaderMenu>
        </HeaderRight>
        <HeaderLeft>b</HeaderLeft>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
