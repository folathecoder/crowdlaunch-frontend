import axios from 'axios';
import { ProjectType } from '@/types/projectTypes';

/**
 * Fetches all projects from the specified backend endpoint.
 *
 * @function
 * @async
 * @returns {Promise<ProjectType[] | null>} Returns a list of projects of type ProjectType on success, or null on failure.
 * @throws {Error} If there's a problem fetching the data, it logs the error and returns null.
 */

export const fetchAllProjects = async (): Promise<ProjectType[] | null> => {
  try {
    const response = await axios.get<ProjectType[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/Project/get-with-filters`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
