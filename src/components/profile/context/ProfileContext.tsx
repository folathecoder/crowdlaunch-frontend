import React, { useState } from 'react';

type Props = {
  children: JSX.Element;
};

interface ProviderPropTypes {
  toggleSettings: boolean;
  setToggleSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileContext = React.createContext<ProviderPropTypes | any>(
  null
);

export const ProfileProvider = ({ children }: Props) => {
  const [toggleSettings, setToggleSettings] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        toggleSettings,
        setToggleSettings,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
