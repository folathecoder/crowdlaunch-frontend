import React from 'react';
import { ProfileContainer } from '@/components/profile/ProfileStyles';
import {
  ProfileHeaderSection,
  ProfileInfo,
  ProfileTabSection,
  ProfileMetrics,
  ProfileSettings,
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
        <ProfileSettings />
      </ProfileContainer>
    </ProfileProvider>
  );
};

export default Profile;
