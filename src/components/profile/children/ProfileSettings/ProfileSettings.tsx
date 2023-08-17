import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
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
import useGetUserByAddress from '@/hooks/RequestHooks/GET/useGetUserByAddress';
import usePostAuth from '@/hooks/RequestHooks/POST/usePostAuth';
import usePatchUser from '@/hooks/RequestHooks/PATCH/usePatchUser';
import { Notification, Loader, Button } from '@/components/global';
import { UserUpdateType } from '@/types/projectTypes';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ProfileSettings = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [projectBannerImage, setProjectBannerImage] = useState<
    string | undefined
  >(undefined);
  const [projectBannerSrc, setProjectBannerSrc] = useState('');

  const router = useRouter();
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

  const { register } = useForm();

  // Get the current profile data and render it as the initial state of the form
  const { userData } = usePostAuth();
  const { user, fetchingStatus: userFetched } = useGetUserByAddress({
    jwtToken: userData?.token,
  });

  // Update the user profile with the new form data
  const { updateUserData, fetchingStatus: userUpdated } = usePatchUser({
    jwtToken: userData?.token,
  });

  const [formData, setFormData] = useState<UserUpdateType>({
    userName: '',
    socials: {
      websiteUrl: '',
      twitterUrl: '',
      telegramUrl: '',
      discordUrl: '',
    },
    userProfileImage: '',
    updatedAt: new Date().toISOString(),
  });

  // Update formData state when the current profile data is fetched successfully
  useEffect(() => {
    if (userFetched === 2 && user) {
      setFormData({
        userName: user?.user.userName,
        socials: {
          websiteUrl: user?.user.socials.websiteUrl,
          twitterUrl: user?.user.socials.twitterUrl,
          telegramUrl: user?.user.socials.telegramUrl,
          discordUrl: user?.user.socials.discordUrl,
        },
        userProfileImage: user?.user.userProfileImage,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [userFetched, user]);

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

  // Show notification after profile has been updated successfully
  useEffect(() => {
    if (userUpdated === 2) {
      setShowNotification(true);

      if (router.pathname === '/profile') {
        setNotificationMessage(
          'Your profile has been updated successfully and your profile page will reload in 5 seconds!'
        );
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        setNotificationMessage('Your profile has been updated successfully!');
      }
    }
  }, [router.pathname, userUpdated]);

  // Get uploaded image
  async function handleImageOnChange(
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = changeEvent.target.files?.[0];
    if (!file) return;

    const dataUrl = await readFileAsDataURL(file);
    setProjectBannerSrc(dataUrl);
    setProjectBannerImage(undefined);

    await handleOnSubmit(file);
  }

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Error reading file'));

      reader.readAsDataURL(file);
    });
  }

  // Upload image to cloudinary
  async function handleOnSubmit(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload to Cloudinary');
      }

      const data = await response.json();

      setFormData((prevState) => ({
        ...prevState,
        userProfileImage: data.secure_url,
      }));
    } catch (error) {
      console.error('Upload Error:', error);
    }
  }

  const handleDeleteProfileImage = () => {
    setFormData({
      ...formData,
      userProfileImage: '',
    });
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
                  {...register('image', { required: true })}
                  name="profileImage"
                  onChange={handleImageOnChange}
                  className="profile_image"
                />
                {formData.userProfileImage !== '' && (
                  <div className="file_upload">
                    <a href={formData.userProfileImage} target="_blank">
                      View profile image{' '}
                      <span>
                        <FaExternalLinkAlt />
                      </span>
                    </a>
                    <button onClick={handleDeleteProfileImage}>
                      <span>
                        <RiDeleteBin5Line />
                      </span>
                      Remove Image
                    </button>
                  </div>
                )}
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
              <div>{userUpdated === 1 && <Loader />}</div>
              <div>
                <Button
                  buttonTitle="Update Profile"
                  buttonType="action"
                  buttonFunction={() => updateUserData(formData)}
                />
              </div>
            </ButtonContainer>
            <Notification
              message={notificationMessage}
              setState={setShowNotification}
              state={showNotification}
            />
          </SettingContainer>
        </AnimatePresence>
      </ClickAwayListener>
    </>
  );
};

export default ProfileSettings;
