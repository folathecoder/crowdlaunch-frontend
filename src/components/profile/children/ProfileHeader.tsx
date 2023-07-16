import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ProfileHeader,
  ProfileImage,
} from '@/components/profile/ProfileStyles';
import ProfileWallpaper from 'public/images/profile/wallpaper.png';
import Lottie from 'react-lottie';
import { ProfileLottie } from 'public/images';

const ProfileHeaderSection = () => {
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <ProfileHeader imgURL={ProfileWallpaper}>
      <Image
        src={ProfileWallpaper}
        alt=""
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="main_section">
        <ProfileImage>
          <Lottie
            ref={animationRef}
            options={{
              loop: true,
              autoplay: false,
              animationData: ProfileLottie,
            }}
            width={150}
            height={150}
          />
        </ProfileImage>
      </div>
    </ProfileHeader>
  );
};

export default ProfileHeaderSection;
