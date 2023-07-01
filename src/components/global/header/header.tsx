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
import { Button, CartButton } from '@/components/global';
import { useBreakPointUp } from '@/hooks/useBreakPoint';
import { MdMenu } from 'react-icons/md';

const Header = () => {
  const { breakPoint: removeMenuOnTablet } = useBreakPointUp({
    breakMark: 1073,
  });
  const { breakPoint: removeSearchOnTablet } = useBreakPointUp({
    breakMark: 864,
  });
  const { breakPoint: removeOnMobile } = useBreakPointUp({
    breakMark: 539,
  });

  return (
    <HeaderContainer>
      <HeaderInner>
        <HeaderRight>
          <HeaderLogo>
            <Link href="/">
              <Image src={AppLogo} alt={APP_NAME} width={35} height={35} />
            </Link>
          </HeaderLogo>
          {removeSearchOnTablet && (
            <HeaderSearch>
              <HeaderSearchBar />
            </HeaderSearch>
          )}
          {removeMenuOnTablet && (
            <HeaderNav>
              <HeaderMenu />
            </HeaderNav>
          )}
        </HeaderRight>
        <HeaderLeft>
          {removeOnMobile && (
            <div className="gradient-link">
              <Link href="/marketplace" className="gradient-link">
                Marketplace
              </Link>
            </div>
          )}
          <div>
            <Button
              buttonTitle={removeOnMobile ? 'connect wallet' : 'connect'}
              buttonType="action"
              buttonFunction={() => {}}
            />
          </div>
          <div>
            <CartButton cartItemCount={93} />
          </div>
          <div>
            <button className="mobile-nav_btn">
              <MdMenu />
            </button>
          </div>
        </HeaderLeft>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
