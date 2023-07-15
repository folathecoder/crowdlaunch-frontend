import React from 'react';
import { ProfileContainer } from '@/components/profile/ProfileStyles';
import {
  ProfileHeaderSection,
  ProfileInfo,
  ProfileTabSection,
  ProfileMetrics,
} from '@/components/profile';
import { ProfileProvider } from '@/components/profile/context/ProfileContext';

const Profile = () => {
  return (
    <ProfileProvider>
      <ProfileContainer>
        <ProfileHeaderSection />
        <ProfileInfo />
        <ProfileMetrics />
        <ProfileTabSection />
      </ProfileContainer>
    </ProfileProvider>
  );
};

export default Profile;
