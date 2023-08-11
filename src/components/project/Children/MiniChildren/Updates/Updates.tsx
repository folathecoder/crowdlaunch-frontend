import React, { useContext } from 'react';
import moment from 'moment';
import {
  ProjectDetailContext,
  ProjectDetailContextReturnTypes,
} from '@/contexts/ProjectDetailContext';
import { useForm } from 'react-hook-form';
import {
  UpdateSection,
  UpdateFormContainer,
  UpdateFeedContainer,
  FeedContainer,
} from './UpdatesStyles';

const Updates = () => {
  const { project: data, fetchingStatus } = useContext(
    ProjectDetailContext
  ) as ProjectDetailContextReturnTypes;

  const { register, handleSubmit } = useForm();

  return (
    <UpdateSection>
      <UpdateFormContainer>
        <h2>Share Latest Update</h2>
        <form onSubmit={() => {}}>
          <div>
            <input
              id="title"
              {...register('message')}
              placeholder="Update Title"
            />
            <textarea
              id="message"
              {...register('message')}
              className="custom-textarea"
              placeholder="Update Message"
            />
          </div>
          <button type="submit" className="update-button">
            Share Update
          </button>
        </form>
      </UpdateFormContainer>
      <UpdateFeedContainer>
        {fetchingStatus === 2 && data?.projectUpdates.length === 0 && (
          <FeedContainer>
            <p>Updates are not available!</p>
          </FeedContainer>
        )}
        {fetchingStatus === 2 &&
          data?.projectUpdates.reverse().map((update) => (
            <FeedContainer key={update.projectUpdateId}>
              <h3>{update.updateTitle}</h3>
              <p>{update.updateMessage}</p>
              <p className="update-date">
                {moment(update.createdAt).format('DD MMM, YYYY')}
              </p>
            </FeedContainer>
          ))}
      </UpdateFeedContainer>
    </UpdateSection>
  );
};

export default Updates;
