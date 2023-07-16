import React from 'react';
import { useForm } from 'react-hook-form';
import {
  UpdateSection,
  UpdateFormContainer,
  UpdateFeedContainer,
  FeedContainer,
} from './UpdatesStyles';
import { Button } from '@/components/global';

type Props = {};

const Updates = (props: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {};

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
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((item) => (
          <FeedContainer key={item}>
            <h3>Launched 0.{item} Release</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              rem sint ut voluptas iste, magni reprehenderit quis adipisci ad
              dicta aliquam eum dolorem a minima optio assumenda ipsa eos atque.
            </p>
            <p className="update-date">
              <i>{item} July, 2023</i>
            </p>
          </FeedContainer>
        ))}
      </UpdateFeedContainer>
    </UpdateSection>
  );
};

export default Updates;
