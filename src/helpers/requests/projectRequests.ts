import axios from 'axios';
import { ProjectType } from '@/types/projectTypes';

/**
 * Fetches all projects from the backend.
 * @returns {Promise<ProjectType[] | null>}
 */

export const fetchAllProjects = async (): Promise<ProjectType[] | null> => {
  try {
    const response = await axios.get<ProjectType[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/Project`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
