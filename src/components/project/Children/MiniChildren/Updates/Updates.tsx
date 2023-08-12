import React, { useContext, useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import moment from 'moment';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { MdDeleteOutline } from 'react-icons/md';
import {
  UpdateSection,
  UpdateFormContainer,
  UpdateFeedContainer,
  FeedContainer,
} from './UpdatesStyles';
import usePostProjectUpdate from '@/hooks/RequestHooks/POST/usePostProjectUpdate';
import { ProjectUpdateType } from '@/types/projectTypes';
import useGetProjectById from '@/hooks/RequestHooks/GET/useGetProjectById';
import { Notification } from '@/components/global';

const Updates = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Handle and abstract project update logic
  const {
    submitProjectUpdate,
    fetchingStatus: updateStatus,
    deleteProjectUpdate,
    deleteStatus,
  } = usePostProjectUpdate();

  const { projectId, isProjectCreator, setUpdateCount } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const {
    project: data,
    fetchingStatus,
    refetch,
  } = useGetProjectById({
    projectId: projectId,
  });

  const [projectUpdate, setProjectUpdate] = useState<ProjectUpdateType>({
    projectId: projectId,
    updateTitle: '',
    updateMessage: '',
  });

  const handleUpdateTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectUpdate((prevUpdate) => ({
      ...prevUpdate,
      projectId: projectId,
      updateTitle: e.target.value,
    }));
  };

  const handleUpdateMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProjectUpdate((prevUpdate) => ({
      ...prevUpdate,
      projectId: projectId,
      updateMessage: e.target.value,
    }));
  };

  // Clear the update form field after submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { projectId, updateTitle, updateMessage } = projectUpdate;

    // Check for empty fields
    if (!projectId || !updateTitle.trim() || !updateMessage.trim()) {
      setNotificationMessage('All fields are required');
      setShowNotification(true);
      return;
    }

    submitProjectUpdate(projectUpdate);

    // Reset the title and message after successful submission
    setProjectUpdate((prevUpdate) => ({
      ...prevUpdate,
      updateTitle: '',
      updateMessage: '',
    }));
  };

  // Update the updates list with the newly added or deleted update
  useEffect(() => {
    if (updateStatus === 2) {
      refetch();
      setShowNotification(true);
      setNotificationMessage('Update has been added');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateStatus]);

  // Update the updates list when an update is deleted
  useEffect(() => {
    if (deleteStatus === 2) {
      refetch();
      setShowNotification(true);
      setNotificationMessage('Update has been deleted');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteStatus]);

  useEffect(() => {
    if (data?.projectUpdates) {
      setUpdateCount(data.projectUpdates.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.projectUpdates]);

  return (
    <UpdateSection>
      {isProjectCreator && (
        <UpdateFormContainer>
          <h2>Share Latest Update</h2>
          <form onSubmit={onSubmit}>
            <div>
              <input
                id="title"
                value={projectUpdate.updateTitle}
                onChange={handleUpdateTitleChange}
                placeholder="Update Title"
              />
              <textarea
                id="message"
                value={projectUpdate.updateMessage}
                onChange={handleUpdateMessageChange}
                className="custom-textarea"
                placeholder="Update Message"
              />
            </div>
            <button type="submit" className="update-button">
              Share Update
            </button>
          </form>
        </UpdateFormContainer>
      )}
      <UpdateFeedContainer>
        {fetchingStatus === 1 && (
          <React.Fragment>
            {new Array(3).fill(null).map((item, index) => (
              <FeedContainer key={index}>
                <div>
                  <Skeleton
                    variant="rounded"
                    height={30}
                    width="100%"
                    animation="wave"
                    sx={{
                      background: 'rgb(211 194 194 / 10%)',
                    }}
                  />
                  <Skeleton
                    variant="rounded"
                    height={100}
                    width="100%"
                    animation="wave"
                    sx={{
                      background: 'rgb(211 194 194 / 10%)',
                      marginTop: '1rem',
                    }}
                  />
                </div>
              </FeedContainer>
            ))}
          </React.Fragment>
        )}
        {fetchingStatus === 2 && data?.projectUpdates.length === 0 && (
          <FeedContainer>
            <p>Updates are not available!</p>
          </FeedContainer>
        )}
        {fetchingStatus === 2 &&
          data?.projectUpdates.map((update) => (
            <FeedContainer key={update.projectUpdateId}>
              <h3>
                {update.updateTitle}
                {isProjectCreator && (
                  <span>
                    <button
                      onClick={() =>
                        deleteProjectUpdate(update.projectUpdateId)
                      }
                    >
                      <MdDeleteOutline />
                    </button>
                  </span>
                )}
              </h3>
              <p>{update.updateMessage}</p>
              <p className="update-date">
                {moment(update.createdAt).format('DD MMM, YYYY')}
              </p>
            </FeedContainer>
          ))}
      </UpdateFeedContainer>
      <Notification
        message={notificationMessage}
        setState={setShowNotification}
        state={showNotification}
      />
    </UpdateSection>
  );
};

export default Updates;
