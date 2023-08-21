import React, { useState, useContext, useEffect } from 'react';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '@/components/project/ProjectCreation/ProjectCreationContext';
import { useForm } from 'react-hook-form';
import { RichTextEditor, Button } from '@/components/global';
import {
  InputContainer,
  InputDivider,
  FormButtonContainer,
} from './FormStyles';
import useGetCategories from '@/hooks/RequestHooks/GET/useGetCategories';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Notification } from '@/components/global';
import { isProjectFormComplete } from '@/helpers/inputChecks';

const OverviewTab = () => {
  const { categories } = useGetCategories();
  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const [projectSummary, setProjectSummary] = useState('');
  const [projectProblem, setProjectProblem] = useState('');
  const [projectProposition, setProjectProposition] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const [projectBannerImage, setProjectBannerImage] = useState<
    string | undefined
  >(undefined);
  const [projectBannerSrc, setProjectBannerSrc] = useState('');

  const { register, handleSubmit, control } = useForm();

  const [selectedOption, setSelectedOption] = useState({
    selectedOption: '',
  });

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        projectName: event.target.value,
      },
    }));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        categoryId: event.target.value,
      },
    }));
  };

  useEffect(() => {
    setProjectFormData((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        overview: `${projectSummary}**${projectProblem}**${projectProposition}`,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectProblem, projectProposition, projectSummary]);

  useEffect(() => {
    if (projectFormData.detail.overview !== '') {
      const overview = projectFormData.detail.overview.split('**');

      setProjectSummary(overview[0]);
      setProjectProblem(overview[1]);
      setProjectProposition(overview[2]);
    }

    if (projectFormData.main.categoryId! === '') {
      setSelectedOption({
        selectedOption: projectFormData.main.categoryId,
      });
    }
  }, []);

  function handleImageOnChange(
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = changeEvent.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (onLoadEvent) {
        setProjectBannerSrc(onLoadEvent.target?.result as string);
        setProjectBannerImage(undefined);
      };

      reader.readAsDataURL(file);

      handleOnSubmit();
    }
  }

  async function handleOnSubmit() {
    const fileInput =
      document.querySelector<HTMLInputElement>('.project_image');

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files[i];
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        bannerImageUrl: data.secure_url,
      },
    }));

    setProjectBannerSrc(data.secure_url);
    setProjectBannerImage(data);
  }

  const saveAndContinue = () => {
    if (projectFormData?.detail?.overview)
      if (
        !!projectFormData.main.projectName &&
        !!projectFormData.main.categoryId &&
        !!projectFormData.main.bannerImageUrl &&
        !!projectFormData.detail.overview &&
        projectFormData.detail.overview !== '****' &&
        isProjectFormComplete(projectFormData.detail.overview || '')
      ) {
        setActiveTab(1);
      } else {
        setShowNotifications(true);
      }
  };

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
              value={projectFormData.main.projectName}
              onChange={handleProjectNameChange}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <div>
            <label htmlFor="projectCategory">Project Category</label>
          </div>
          <div>
            <select
              value={projectFormData.main.categoryId}
              onChange={handleOptionChange}
              name="categoryId"
            >
              <option value="">Select a project category</option>
              {categories?.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
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
            onChange={handleImageOnChange}
            className="project_image"
          />
          {projectFormData.main.bannerImageUrl !== '' && (
            <div className="file_upload">
              <a href={projectFormData.main.bannerImageUrl} target="_blank">
                View uploaded project banner image{' '}
                <span>
                  <FaExternalLinkAlt />
                </span>
              </a>
            </div>
          )}
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Project Summary And Objectives
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={projectSummary} setState={setProjectSummary} />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            What is your project&apos;s problem statement?
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor state={projectProblem} setState={setProjectProblem} />
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <label htmlFor="projectImage" className="custom-label">
            Explain your project&apos;s unique value proposition.
          </label>
        </div>
        <div className="editor_container">
          <RichTextEditor
            state={projectProposition}
            setState={setProjectProposition}
          />
        </div>
      </InputContainer>
      <FormButtonContainer>
        <Button
          buttonTitle="Save & Continue"
          buttonType="action"
          buttonFunction={saveAndContinue}
        />
      </FormButtonContainer>
      <Notification
        message="Please complete all fields"
        setState={setShowNotifications}
        state={showNotifications}
      />
    </div>
  );
};

export default OverviewTab;
