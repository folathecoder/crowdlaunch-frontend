import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RichTextEditor, Button } from '@/components/global';
import {
  InputContainer,
  InputDivider,
  FormButtonContainer,
} from './FormStyles';
import { projectCategories } from '@/data/project/projectCategories';
import useGetCategories from '@/hooks/RequestHooks/GET/useGetCategories';

const OverviewTab = () => {
  const { register, handleSubmit, control } = useForm();
  const onSubmit = () => {};

  const [selectedOption, setSelectedOption] = useState({
    selectedOption: '',
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption({
      selectedOption: event.target.value,
    });
  };

  const { categories } = useGetCategories();

  return (
    <div>
      <InputDivider>
        <InputContainer>
          <div>
            <label htmlFor="projectName">Project Name</label>
          </div>
          <div>
            <input
              type="text"
              name="projectName"
              placeholder="Innotech AI"
              value=""
              onChange={() => {}}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <div>
            <label htmlFor="projectCategory">Project Category</label>
          </div>
          <div>
            <select
              value={selectedOption.selectedOption}
              onChange={handleOptionChange}
              name="projectCategory"
            >
              <option value="">Select a project category</option>
              {categories?.map((category) => (
                <option
                  key={category.categoryId}
                  value={`option-${category.categoryId}`}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        </InputContainer>
      </InputDivider>

      <InputContainer>
        <div>
          <label htmlFor="projectImage">Project Banner Image</label>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: true })}
            name="projectImage"
          />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Project Summary And Objectives
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What is your project&apos;s problem statement?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Explain your project&apos;s unique value proposition.
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor />
        </div>
      </InputContainer>
      <FormButtonContainer>
        <Button
          buttonTitle="Save & Continue"
          buttonType="action"
          buttonFunction={() => {}}
        />
      </FormButtonContainer>
    </div>
  );
};

export default OverviewTab;
