import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { CategoryType } from '@/types/projectTypes';

interface CategoryReturnType {
  categories: CategoryType[] | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
  getCatgoryById: (categoryId: string) => CategoryType | undefined;
}

const useGetCategories = (): CategoryReturnType => {
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  // Effect hook to make the API call when the component using this hook mounts
  useEffect(() => {
    setFetchingStatus(FetchingStatus.Loading);

    axios
      .get<CategoryType[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/Category`
      )
      .then((response) => {
        setCategories(response.data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error.message);
        setFetchingStatus(FetchingStatus.Error);
      });
  }, []);

  const getCatgoryById = (categoryId: string): CategoryType | undefined => {
    return categories?.find((category) => category.categoryId === categoryId);
  };

  return { categories, fetchingStatus, error, getCatgoryById };
};

export default useGetCategories;
