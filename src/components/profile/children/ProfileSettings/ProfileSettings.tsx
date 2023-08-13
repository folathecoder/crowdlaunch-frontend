import React, { useEffect, useRef, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import {
  SettingContainer,
  Form,
  FormSection,
  ButtonContainer,
} from './ProfileSettingsStyles';
import { ClickAwayListener } from '@mui/material';
import { mobileNavVariant } from '@/styles/animation/mobileNavVariant';
import { AnimatePresence } from 'framer-motion';
import { useBreakPointUp } from '@/hooks/useBreakPoint';
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setToggleSettings } from '@/redux/slices/profileSettingSlice';
import { Button } from '@/components/global';

interface UserUpdateType {
  userName: string;
  socials: {
    websiteUrl: string;
    twitterUrl: string;
    telegramUrl: string;
    discordUrl: string;
  };
  updatedAt: string;
}

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const profileSettings = useSelector(
    (state: RootState) => state.profileSettings.toggleSettings
  );

  const { breakPoint: switchNavWidth } = useBreakPointUp({
    breakMark: 576,
  });

  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const [formData, setFormData] = useState<UserUpdateType>({
    userName: '',
    socials: {
      websiteUrl: '',
      twitterUrl: '',
      telegramUrl: '',
      discordUrl: '',
    },
    updatedAt: new Date().toISOString(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.socials) {
      setFormData({
        ...formData,
        socials: {
          ...formData.socials,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdateProfile = () => {
    // Do something with the updated formData
    console.log(formData);
  };

  return (
    <>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: '100vh',
        }}
        open={profileSettings}
        onClick={() => dispatch(setToggleSettings(false))}
      />
      <ClickAwayListener onClickAway={() => dispatch(setToggleSettings(false))}>
        <AnimatePresence>
          <SettingContainer
            variants={mobileNavVariant(switchNavWidth ? '400px' : '100vw')}
            initial="hidden"
            animate={profileSettings ? 'show' : 'hidden'}
            exit="exit"
          >
            <button
              className="close_btn"
              onClick={() => dispatch(setToggleSettings(false))}
            >
              CLOSE
            </button>
            <Form action="">
              <FormSection>
                <div>
                  <h2>
                    <span>
                      <FiEdit />
                    </span>
                    Update Profile
                  </h2>
                </div>
                <label htmlFor="userName">User Name:</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Anonymous"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
                <label htmlFor="projectImage">Project Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="projectImage"
                  id="projectImage"
                />
                <label htmlFor="websiteUrl">Website URL:</label>
                <input
                  type="text"
                  name="websiteUrl"
                  id="websiteUrl"
                  placeholder="https://website.com"
                  value={formData.socials.websiteUrl}
                  onChange={handleInputChange}
                />
                <label htmlFor="twitterUrl">Twitter URL:</label>
                <input
                  type="text"
                  name="twitterUrl"
                  id="twitterUrl"
                  placeholder="https://twitter.com/me"
                  value={formData.socials.twitterUrl}
                  onChange={handleInputChange}
                />
                <label htmlFor="telegramUrl">Telegram URL:</label>
                <input
                  type="text"
                  name="telegramUrl"
                  id="telegramUrl"
                  placeholder="https://telegram.com/me"
                  value={formData.socials.telegramUrl}
                  onChange={handleInputChange}
                />
                <label htmlFor="discordUrl">Discord URL:</label>
                <input
                  type="text"
                  name="discordUrl"
                  id="discordUrl"
                  placeholder="https://discord.com/me"
                  value={formData.socials.discordUrl}
                  onChange={handleInputChange}
                />
              </FormSection>
            </Form>
            <ButtonContainer>
              <Button
                buttonTitle="Update Profile"
                buttonType="action"
                buttonFunction={handleUpdateProfile}
              />
            </ButtonContainer>
          </SettingContainer>
        </AnimatePresence>
      </ClickAwayListener>
    </>
  );
};

export default ProfileSettings;
