import React from 'react';
import { ProfileContainer } from '@/components/profile/ProfileStyles';
import {
  ProfileHeaderSection,
  ProfileInfo,
  ProfileTabSection,
} from '@/components/profile';
import { ProfileProvider } from '@/components/profile/context/ProfileContext';

const Profile = () => {
  return (
    <ProfileProvider>
      <ProfileContainer>
        <ProfileHeaderSection />
        <ProfileInfo />
        <ProfileTabSection />
      </ProfileContainer>
    </ProfileProvider>
  );
};

export default Profile;
