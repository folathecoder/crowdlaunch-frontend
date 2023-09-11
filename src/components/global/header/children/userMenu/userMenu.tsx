import React, { useEffect, useRef, useContext } from 'react';
import { AppContext, AppContextReturnTypes } from '@/contexts/AppContext';
import Backdrop from '@mui/material/Backdrop';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import { NavContainer, NavHeader, MenuList, MenuItem } from './userMenuStyles';
import { ClickAwayListener } from '@mui/material';
import useEscapeKeyToggle from '@/hooks/useEscapeKeyToggle';
import { mobileNavVariant } from '@/styles/animation/mobileNavVariant';
import { AnimatePresence } from 'framer-motion';
import { useBreakPointUp } from '@/hooks/useBreakPoint';
import Lottie from 'react-lottie';
import { ProfileLottie } from 'public/images';
import useWallet from '@/wallet/useWallet';
import { shortenWalletAddress } from '@/helpers/formatters';
import { profileMenu } from '@/data/menuData';
import { useRouter } from 'next/router';
import { FaPowerOff } from 'react-icons/fa';
import { CroppedImage } from '@/components/global';

interface UserMenuTypes {
  showUserMenu: boolean;
  setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu = ({ showUserMenu, setShowUserMenu }: UserMenuTypes) => {
  const { wallet, handleClearWallet, disconnectWallet } = useWallet();
  const { user } = useContext(AppContext) as AppContextReturnTypes;

  useEscapeKeyToggle({
    state: showUserMenu,
    setState: setShowUserMenu,
  });

  const { breakPoint: switchNavWidth } = useBreakPointUp({
    breakMark: 576,
  });

  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const router = useRouter();
  const activeRoute = router.pathname;

  const handleDisconnectWallet = () => {
    disconnectWallet();
    handleClearWallet();
    setShowUserMenu(false);
  };

  return (
    <>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: '100vh',
        }}
        open={showUserMenu}
        onClick={() => setShowUserMenu(false)}
      />
      <ClickAwayListener onClickAway={() => setShowUserMenu(false)}>
        <AnimatePresence>
          <NavContainer
            variants={mobileNavVariant(switchNavWidth ? '400px' : '100vw')}
            initial="hidden"
            animate={showUserMenu ? 'show' : 'hidden'}
            exit="exit"
          >
            <NavHeader>
              <div>
                <div className="profile-icon">
                  {user?.user.userProfileImage && user?.user.userName ? (
                    <>
                      <CroppedImage
                        src={user.user.userProfileImage}
                        alt={user.user.userName}
                        width={35}
                        height={35}
                      />
                    </>
                  ) : (
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
                  )}
                </div>
                <div>
                  {wallet.walletAddress && (
                    <p>{shortenWalletAddress(wallet.walletAddress)}</p>
                  )}
                </div>
                <div>
                  <button
                    className="disconnect-button"
                    onClick={handleDisconnectWallet}
                    title="disconnect wallet"
                  >
                    <FaPowerOff />
                  </button>
                </div>
              </div>

              <div>
                <button onClick={() => setShowUserMenu(false)}>
                  <MdClose />
                </button>
              </div>
            </NavHeader>
            <MenuList>
              {profileMenu.map((nav) => (
                <MenuItem
                  key={nav.id}
                  active={activeRoute === nav.pageLink}
                  menuItemIndex={nav.id}
                  onClick={() => setShowUserMenu(false)}
                >
                  <Link href={nav.pageLink}>
                    <div>{nav.pageName}</div>
                    {nav.icon && (
                      <div className="icon">
                        <nav.icon />
                      </div>
                    )}
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
          </NavContainer>
        </AnimatePresence>
      </ClickAwayListener>
    </>
  );
};

export default UserMenu;
