import React from 'react';
import withAuth from '@/components/profile/auth/withAuth';
import { ProfileLayout } from '@/components/profile';

const Profile = () => {
  return (
    <main>
      <ProfileLayout />
    </main>
  );
};

export default withAuth(Profile);