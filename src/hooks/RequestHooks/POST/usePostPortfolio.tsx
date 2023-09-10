import { useState } from 'react';
import usePostAuth from './usePostAuth';
import { FetchingStatus } from '@/types/fetchingTypes';
import { PortfolioType } from '@/types/projectTypes';

interface ReturnType {
  addProjectToPortfolio: (
    projectId: string,
    amountInvested: number
  ) => Promise<void>;
}

const usePostPortfolio = (): ReturnType => {
  const { userData } = usePostAuth();
  const { token } = userData || {};

  const [portfolioData, setPortfolioData] = useState<PortfolioType | null>(
    null
  );
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  const addProjectToPortfolio = async (
    projectId: string,
    amountInvested: number
  ) => {
    setFetchStatus(FetchingStatus.Loading);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/portfolios/Portfolio`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        projectId: projectId,
        status: 0,
        amountInvested: amountInvested,
        investmentDate: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPortfolioData(data);
        setFetchStatus(FetchingStatus.Fetched);
      })
      .catch((err) => {
        setFetchError(err.message);
        setFetchStatus(FetchingStatus.Error);
      });
  };

  return { addProjectToPortfolio };
};

export default usePostPortfolio;
