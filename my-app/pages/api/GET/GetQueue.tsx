import axios from 'axios';
import Cookies from 'js-cookie'; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetQueue = async () => {
  try {
    const token = Cookies.get('token'); 

    if (!token) {
      throw new Error('No authentication token found');
    }

    const res = await axios.get(`${API_URL}/clinic/que`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      throw new Error(`Failed to fetch queue data: ${error.response?.status} - ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to fetch queue data: ${error.message}`);
    } else {
      throw new Error('Failed to fetch queue data due to an unknown error');
    }
  }
};

export default GetQueue;
