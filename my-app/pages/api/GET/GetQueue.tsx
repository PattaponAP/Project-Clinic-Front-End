import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetQueue = async() => {
  try {
    const res = await axios.get(`${API_URL}/clinic/que`);
    return res.data;
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
}

export default GetQueue;
