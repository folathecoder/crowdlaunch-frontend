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
  HeaderNav,
} from './headerStyles';
import { AppLogo } from 'public/images';
import { APP_NAME } from '@/data/appInfo';
import HeaderSearchBar from './children/headerSearch/headerSearch';
import HeaderMenu from './children/headerMenu/headerMenu';

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
          <HeaderNav>
            <HeaderMenu />
          </HeaderNav>
        </HeaderRight>
        <HeaderLeft>b</HeaderLeft>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
