import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ProjectCreactionContext,
  ProjectCreactionContextReturnTypes,
} from '@/components/project/ProjectCreation/ProjectCreationContext';
import { Button } from '@/components/global';
import {
  ProjectCreatorContainer,
  ProjectCreatorForm,
  FormButtonContainer,
  ProjectInfo,
} from './FormStyles';
import usePostProject from '@/hooks/RequestHooks/POST/usePostProject';
import { Notification } from '@/components/global';
import { initialProjectFormData } from '@/components/project/ProjectCreation/ProjectCreationContext';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import useRegisterUser from '@/hooks/ContractHooks/useRegisterUser';
import Tooltip from '@mui/material/Tooltip';
import useCreateCampaign from '@/hooks/ContractHooks/useCreateCampaign';
import { CAMPAIGN_FEE } from '@/data/appInfo';

const ProjectCreatorTab = () => {
  const router = useRouter();
  const { width, height } = useWindowSize();

  const [requestCompletionCount, setRequestCompletionCount] = useState(0);
  const [startProjectCreation, setStartProjectCreation] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [showFundButton, setShowFundButton] = useState(false);

  const { projectFormData, setProjectFormData, setActiveTab } = useContext(
    ProjectCreactionContext
  ) as ProjectCreactionContextReturnTypes;

  const { main } = projectFormData;

  const {
    createProject,
    projectCreationStatus,
    projectDetailCreationStatus,
    projectData,
  } = usePostProject({ data: projectFormData });

  const {
    handleRegisterUser,
    isRegisterSuccess,
    isRegisterLoading,
    isRegisterError,
    isUserRegistered,
  } = useRegisterUser();

  const {
    createCampaign,
    isCreationSuccess,
    isCreationLoading,
    isCreationError,
  } = useCreateCampaign({
    targetAmount: main.targetAmount,
    minInvestment: main.minInvestment,
    endDate: main.noOfDaysLeft,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProjectFormData((prevState) => ({
      ...prevState,
      main: {
        ...prevState.main,
        [name]: name === 'noOfDaysLeft' ? value : Number(value),
      },
    }));
  };

  // Get current date in format YYYY-MM-DD
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isUserRegistered) {
      setShowFundButton(isUserRegistered);
    }
  }, [isUserRegistered]);

  useEffect(() => {
    if (isRegisterSuccess) {
      setShowFundButton(isRegisterSuccess);
      setShowNotification(true);
      setNotificationMessage(
        'Congratulations! You have successfully registered an account on the blockchain. You can now create a campaign.'
      );
    }
  }, [isRegisterSuccess]);

  useEffect(() => {
    if (isRegisterError) {
      setShowNotification(true);
      setNotificationMessage(
        'An error has occurred while registering your account. Check that you have enough gas to complete the transaction.'
      );
    }
  }, [isRegisterError]);

  useEffect(() => {
    if (projectCreationStatus === 2) {
      setRequestCompletionCount(1);
    }
  }, [projectCreationStatus]);

  useEffect(() => {
    if (projectDetailCreationStatus === 2) {
      setRequestCompletionCount(2);
      setNotificationMessage(
        'Congratulations, Your project had been created successfully'
      );
      setStartProjectCreation(false);
      setProjectCreated(true);
    }

    if (projectDetailCreationStatus === 3) {
      setNotificationMessage('Project creation was not successful');
      setStartProjectCreation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData?.projectId, projectDetailCreationStatus, router]);

  const handleProjectCreation = () => {
    const { targetAmount, minInvestment, noOfDaysLeft } = projectFormData.main;

    const isValidTargetAmount =
      targetAmount !== 0 && targetAmount > minInvestment;
    const isValidDays = noOfDaysLeft !== 0;

    if (isValidTargetAmount && isValidDays) {
      setStartProjectCreation(true);
      createProject();
    } else {
      setShowNotification(true);
      setNotificationMessage(getErrorMessage());
    }
  };

  const getErrorMessage = () => {
    const { targetAmount, minInvestment, noOfDaysLeft } = projectFormData.main;

    if (targetAmount === 0 || targetAmount < minInvestment) {
      return 'Project creation was not successful: Ensure that the target amount is not set to zero and it must be greater than the minimum investment amount.';
    }

    if (noOfDaysLeft === 0) {
      return 'Project creation was not successful: Ensure that the number of days left is not set to zero.';
    }

    return 'Project creation was not successful: Ensure you complete all fields and try again';
  };

  const handleProjectLinkBtn = () => {
    router.push(`/project/${projectData?.projectId}`);
    setProjectFormData(initialProjectFormData);
  };

  // Clear the project form data and change to the first tab
  const handleRestartRegisteration = () => {
    setProjectFormData(initialProjectFormData);
    setActiveTab(0);
  };

  useEffect(() => {
    if (isCreationSuccess) {
      handleProjectCreation();
      setShowNotification(true);
      setNotificationMessage(
        'Congratulations, your campaign has been created on the blockchain. We are preparing your campaign for funding.'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreationSuccess]);

  useEffect(() => {
    if (isCreationError) {
      setNotificationMessage(
        'Project creation was not successful: Ensure you have enough funds for a campaign fee and gas.'
      );
    }
  }, [isCreationError]);

  return (
    <ProjectCreatorContainer>
      <ProjectCreatorForm>
        {!projectCreated ? (
          <>
            <div>
              <h2>Kickstart Your Vision: Set Your Funding Goals</h2>
            </div>
            <div>
              <p className="project_subtitle">
                {`For every project initiation on our platform, a nominal service
                fee of ${CAMPAIGN_FEE} ETH, or its equivalent, will be applied.`}
              </p>
            </div>
            <div>
              <label htmlFor="targetAmount">Target Investment (ETH)</label>
              <input
                type="number"
                step="1"
                min="0"
                pattern="^\d*(\.\d{0,9})?$"
                name="targetAmount"
                value={projectFormData.main.targetAmount}
                onChange={handleInputChange}
                placeholder="Target Investment Amount (USD)"
              />
            </div>
            <div>
              <label htmlFor="minInvestment">Minimum Investment (ETH)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                pattern="^\d*(\.\d{0,9})?$"
                name="minInvestment"
                value={projectFormData.main.minInvestment}
                onChange={handleInputChange}
                placeholder="($) Minimum Investment Amount"
              />
            </div>
            <div>
              <label htmlFor="dateInput">Funding Completion Date</label>
              <input
                type="date"
                name="noOfDaysLeft"
                id="dateInput"
                min={currentDate}
                value={projectFormData.main.noOfDaysLeft}
                onChange={handleInputChange}
              />
            </div>
            <FormButtonContainer>
              <Button
                buttonTitle="Previous"
                buttonType="action"
                buttonFunction={() => setActiveTab(7)}
              />
              {showFundButton ? (
                <Button
                  buttonTitle={
                    startProjectCreation
                      ? `Get Funded (${requestCompletionCount}/2)`
                      : `Get Funded`
                  }
                  buttonType="action"
                  buttonFunction={createCampaign}
                  showLoader={isCreationLoading}
                />
              ) : (
                <Tooltip
                  title="To initiate a campaign, you must also possess a blockchain account for verification purposes"
                  placement="top"
                  arrow
                >
                  <Button
                    buttonTitle="Create Account"
                    buttonType="action"
                    buttonFunction={handleRegisterUser}
                    showLoader={isRegisterLoading}
                  />
                </Tooltip>
              )}
            </FormButtonContainer>
            <ProjectInfo>
              <p>
                Please note that, to initiate a campaign, you must also possess
                a blockchain account for verification purposes.
              </p>
              <p>
                Edits to this project will be locked after creation and during
                the funding round to ensure transparency.
              </p>
              <p>
                Not ready to create a project? Your project will be saved as a
                draft as long as you don&apos;t clear your browser&apos;s data.
                Made a mistake?{' '}
                <span onClick={handleRestartRegisteration} role="button">
                  Start Over.
                </span>
              </p>
            </ProjectInfo>
          </>
        ) : (
          <div className="project_completion">
            <Confetti width={width} height={height} numberOfPieces={350} />
            <h2>{`🚀 "Hooray! ${
              projectData?.projectId ? projectData?.projectName : 'Your project'
            } is now LIVE and ready to get funded!" 🎉`}</h2>
            <Button
              buttonTitle="View Project"
              buttonType="action"
              buttonFunction={handleProjectLinkBtn}
            />
          </div>
        )}
        <Notification
          message={notificationMessage}
          state={showNotification}
          setState={setShowNotification}
        />
      </ProjectCreatorForm>
    </ProjectCreatorContainer>
  );
};

export default ProjectCreatorTab;
