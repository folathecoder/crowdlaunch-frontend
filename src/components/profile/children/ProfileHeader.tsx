import React from 'react';
import Image from 'next/image';
import {
  ProfileHeader,
  ProfileImage,
} from '@/components/profile/ProfileStyles';
import ProfileWallpaper from 'public/images/profile/wallpaper.png';
import image from 'public/images/nft';

const ProfileHeaderSection = () => {
  return (
    <ProfileHeader imgURL={ProfileWallpaper}>
      <Image
        src={ProfileWallpaper}
        alt=""
        layout="fill"
        objectFit="cover"
        quality={100}
        // width={`200%`}
      />
      <div className="main_section">
        <ProfileImage>
          <Image src={image.creator8} alt="" layout="fill" objectFit="cover" />
        </ProfileImage>
      </div>
    </ProfileHeader>
  );
};

export default ProfileHeaderSection;
