import React from 'react';
import withAuth from '@/auth/withAuth';
import { ProfileLayout } from '@/components/profile';
import MetaData from '@/seo/metaData';

const Profile = () => {
  return (
    <>
      <MetaData
        title="Profile"
        description="Unlock a global network of investors and empower your startup to soar."
      />
      <main>
        <ProfileLayout />
      </main>
    </>
  );
};

export default withAuth(Profile);
