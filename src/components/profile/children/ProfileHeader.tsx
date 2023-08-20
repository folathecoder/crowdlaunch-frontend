import React, { useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import {
  ProfileHeader,
  ProfileImage,
} from '@/components/profile/ProfileStyles';
import {
  ProfileContext,
  ProfileReturnTypes,
} from '@/components/profile/context/ProfileContext';
import ProfileWallpaper from 'public/images/profile/wallpaper.png';
import Lottie from 'react-lottie';
import { ProfileLottie } from 'public/images';
import { CroppedImage } from '@/components/global';

const ProfileHeaderSection = () => {
  const { user } = useContext(ProfileContext) as ProfileReturnTypes;
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
          {user?.user.userProfileImage && user?.user.userName ? (
            <CroppedImage
              src={user.user.userProfileImage}
              alt={user.user.userName}
              width={150}
              height={150}
            />
          ) : (
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
          )}
        </ProfileImage>
      </div>
    </ProfileHeader>
  );
};

export default ProfileHeaderSection;
