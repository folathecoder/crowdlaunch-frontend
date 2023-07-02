import React, { useState, useRef, useEffect } from 'react';
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
import UserMenu from './children/userMenu/userMenu';
import { Button, CartButton } from '@/components/global';
import { useBreakPointUp } from '@/hooks/useBreakPoint';
import { MdMenu } from 'react-icons/md';
import MobileMenu from './children/mobileMenu/mobileMenu';
import { useWeb3Modal } from '@web3modal/react';
import useWallet from '@/wallet/useWallet';
import Lottie from 'react-lottie';
import { ProfileLottie } from 'public/images';

const Header = () => {
  const { wallet } = useWallet();

  const { open } = useWeb3Modal();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { breakPoint: removeMenuOnTablet } = useBreakPointUp({
    breakMark: 1117,
  });
  const { breakPoint: removeSearchOnTablet } = useBreakPointUp({
    breakMark: 864,
  });
  const { breakPoint: removeOnMobile } = useBreakPointUp({
    breakMark: 539,
  });

  const openWalletConnectionModal = async () => {
    await open();
  };

  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef?.current) animationRef.current.play();
  }, []);

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
            {wallet.walletStatus.isConnected ? (
              <button
                className="profile-icon"
                onClick={() => setShowUserMenu(true)}
              >
                <Lottie
                  ref={animationRef}
                  options={{
                    loop: true,
                    autoplay: false,
                    animationData: ProfileLottie,
                  }}
                  width={35}
                  height={35}
                />
              </button>
            ) : (
              <Button
                buttonTitle={removeOnMobile ? 'connect wallet' : 'connect'}
                buttonType="action"
                buttonFunction={openWalletConnectionModal}
              />
            )}
          </div>
          <div>
            <CartButton cartItemCount={93} />
          </div>
          {!removeMenuOnTablet && (
            <div>
              <button
                className="mobile-nav_btn"
                onClick={() => setShowMobileMenu(true)}
              >
                <MdMenu />
              </button>
            </div>
          )}
        </HeaderLeft>
      </HeaderInner>
      {!removeMenuOnTablet && (
        <MobileMenu
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
      )}
      <UserMenu showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
    </HeaderContainer>
  );
};

export default Header;
