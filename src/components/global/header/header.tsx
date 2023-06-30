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
import { BsHandbag } from 'react-icons/bs';
import { Button } from '@/components/global';

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
        <HeaderLeft>
          <div>
            <Link href="/">Marketplace</Link>
          </div>
          <div>
            <Button
              buttonTitle="connect wallet"
              buttonType="action"
              buttonFunction={() => {}}
            />
          </div>
          <div>
            <button type="button">
              <BsHandbag />
            </button>
          </div>
        </HeaderLeft>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
