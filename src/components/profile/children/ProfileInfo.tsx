import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProfileInfoContainer } from '@/components/profile/ProfileStyles';
import { ProfileContext } from '@/components/profile/context/ProfileContext';

import { BsGlobe, BsTwitter, BsDiscord, BsTelegram } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

const ProfileInfo = () => {
  const { toggleSettings, setToggleSettings } = useContext(ProfileContext);

  return (
    <ProfileInfoContainer>
      <div>
        <div>
          <h1>
            Ghost Rider
            <span>
              <i className="fa-solid fa-badge-check"></i>
            </span>
          </h1>
        </div>
        <div className="info_address">
          <p>
            <span className="info_address-image">
              {/* <Image
                src={MaticIcon}
                alt={'matic token'}
                layout="intrinsic"
                height={14}
                width={14}
              /> */}
            </span>
            0xFC92a..d8
          </p>
          <p>Joined March 2021</p>
        </div>
        <div>
          <p className="info_description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            eveniet fuga culpa tenetur soluta aperiam architecto sit assumenda
            dolores quos
          </p>
        </div>
      </div>
      <div>
        <ul>
          <li>
            <Link href={'/'} target="_blank" title="website">
              <BsGlobe />
            </Link>
          </li>
          <li>
            <Link href={'/'} target="_blank" title="twitter">
              <BsTwitter />
            </Link>
          </li>
          <li>
            <Link href={'/'} target="_blank" title="discord">
              <BsDiscord />
            </Link>
          </li>
          <li>
            <Link href={'/'} target="_blank" title="telegram">
              <BsTelegram />
            </Link>
          </li>
          <li onClick={() => setToggleSettings(true)}>
            <FiSettings />
          </li>
        </ul>
      </div>
    </ProfileInfoContainer>
  );
};

export default ProfileInfo;
