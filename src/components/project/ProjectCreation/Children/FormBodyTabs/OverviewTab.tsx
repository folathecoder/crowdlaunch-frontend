import React from 'react';
import { useForm } from 'react-hook-form';
import { RichTextField } from '@/components/global';

const OverviewTab = () => {
  const { register, handleSubmit, control } = useForm();
  const onSubmit = () => {};

  return (
    <div>
      {/* <input
        type="file"
        accept="image/*"
        {...register('image', { required: true })}
      /> */}

      <div>
        <h2>Form Title</h2>
        <RichTextField key="1" />
      </div>
      <div>
        <h2>Form Title</h2>
        <RichTextField key="2" />
      </div>
      <div>
        <h2>Form Title</h2>
        <RichTextField key="3" />
      </div>
    </div>
  );
};

export default OverviewTab;
