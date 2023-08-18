import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { CategoryType } from '@/types/projectTypes';

interface CategoryReturnType {
  category: CategoryType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

interface PropsType {
  categoryId: string;
}

const useGetCategoryById = ({ categoryId }: PropsType): CategoryReturnType => {
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  useEffect(() => {
    setFetchingStatus(FetchingStatus.Loading);

    axios
      .get<CategoryType>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/Category/${categoryId}`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      )
      .then((response) => {
        setCategory(response.data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error.message);
        setFetchingStatus(FetchingStatus.Error);
      });
  }, [categoryId]);

  return { category, fetchingStatus, error };
};

export default useGetCategoryById;
