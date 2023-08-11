import React, { useContext } from 'react';
import moment from 'moment';
import { ProfileInfoContainer } from '@/components/profile/ProfileStyles';
import {
  ProfileContext,
  ProfileReturnTypes,
} from '@/components/profile/context/ProfileContext';
import { shortenWalletAddress } from '@/helpers/formatters';
import { BsGlobe, BsTwitter, BsDiscord, BsTelegram } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

type SocialIcons = {
  websiteUrl: typeof BsGlobe;
  twitterUrl: typeof BsTwitter;
  discordUrl: typeof BsDiscord;
  telegramUrl: typeof BsTelegram;
};

const ProfileInfo = () => {
  const { setToggleSettings, user } = useContext(
    ProfileContext
  ) as ProfileReturnTypes;
  const { userName, walletAddress, createdAt, socials } = user?.user || {};

  const socialIcons: SocialIcons = {
    websiteUrl: BsGlobe,
    twitterUrl: BsTwitter,
    discordUrl: BsDiscord,
    telegramUrl: BsTelegram,
  };

  return (
    <ProfileInfoContainer>
      <div>
        <div>
          <h1>
            {userName}
            <span>
              <i className="fa-solid fa-badge-check"></i>
            </span>
          </h1>
        </div>
        <div className="info_address">
          {walletAddress && <p>{shortenWalletAddress(walletAddress)}</p>}
          {createdAt && (
            <p>Joined {moment(createdAt).format('DD MMM, YYYY')}</p>
          )}
        </div>
      </div>
      <div>
        <ul>
          {socials &&
            Object.keys(socialIcons).map((key) => {
              const SocialIcon = socialIcons[key as keyof SocialIcons];
              return (
                socials[key as keyof typeof socials] && (
                  <li key={key}>
                    <a
                      href={socials[key as keyof typeof socials]}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={key}
                    >
                      <SocialIcon />
                    </a>
                  </li>
                )
              );
            })}
          <li onClick={() => setToggleSettings(true)}>
            <FiSettings />
          </li>
        </ul>
      </div>
    </ProfileInfoContainer>
  );
};

export default ProfileInfo;
