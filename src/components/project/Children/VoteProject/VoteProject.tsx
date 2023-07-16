import React from 'react';
import { ProgressContainer } from '@/components/project/Children/FundProject/FundProjectStyles';
import {
  VotingContainer,
  VotingHeader,
  TimerContainer,
  FormContainer,
  RadioContainer,
} from './VoteProjectStyles';

//Voting data 1
export const votingData = {
  mainTitle: 'Shareholder Meeting Month',
  description:
    'Vote on our next shareholder meeting month. There are 3 months to choose from, please select your favourite.',
  timer: '12d | 2hrs | 10min | 2secs',
  options: [
    {
      name: 'oct',
      label: 'October 2023',
      persons: 11223,
      percentage: 75,
    },
    {
      name: 'nov',
      label: 'November 2023',
      persons: 5320,
      percentage: 23,
    },
    {
      name: 'dec',
      label: 'December 2023',
      persons: 320,
      percentage: 2,
    },
  ],
};

export const votingData2 = {
  mainTitle: 'New Company Name',
  description:
    'Vote on our new company name. We are planning to rebrand and one of the major changes is the abduction of a new company name.',
  timer: '12d | 2hrs | 10min | 2secs',
  options: [
    {
      name: 'robo',
      label: 'RoboCop AI',
      persons: 11223,
      percentage: 75,
    },
    {
      name: 'jojo',
      label: 'JojoRobotics',
      persons: 5320,
      percentage: 23,
    },
    {
      name: 'pro',
      label: 'Protocol AI',
      persons: 320,
      percentage: 2,
    },
  ],
};

interface VoteProjectTypes {
  mainTitle: string;
  description: string;

  timer: string;
  options: Option[];
}

interface Option {
  label: string;
  name: string;
  persons: number;
  percentage: number;
}

const VoteProject = ({
  mainTitle,
  description,
  timer,
  options,
}: VoteProjectTypes) => {
  return (
    <VotingContainer>
      <VotingHeader>
        <h4>
          Vote: <span className="gradient-link">{mainTitle}</span>
        </h4>
        <p>{description}</p>
      </VotingHeader>
      <div>
        <TimerContainer>
          <p>Select only one option.</p>

          <span>Time left:{timer}</span>
        </TimerContainer>
        <FormContainer>
          {options.map((option, index) => {
            return (
              <RadioContainer key={index}>
                <label htmlFor={`option-${index}`}>
                  <input
                    type="radio"
                    name="votingOption"
                    value={option.label}
                    id={`option-${index}`}
                  />
                  {option.label}
                </label>
                <div>
                  <span>{`${option.persons.toLocaleString()} (${
                    option.percentage
                  }%)`}</span>
                  <ProgressContainer>
                    <div></div>
                  </ProgressContainer>
                </div>
              </RadioContainer>
            );
          })}
        </FormContainer>
      </div>
      <p>
        Note: Only investors of this project (holders of dividend NFTs) can
        vote.
      </p>
    </VotingContainer>
  );
};

export default VoteProject;
