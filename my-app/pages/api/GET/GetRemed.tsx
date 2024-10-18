import axios from 'axios';
import Cookies from 'js-cookie'; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetRemed = async (thai_id: any) => {
  try {
    const token = Cookies.get('token'); 

    if (!token) {
      throw new Error('No authentication token found'); 
    }

    const res = await axios.get(`${API_URL}/clinic/remed?thai_id=${thai_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return res.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      throw new Error(`Failed to fetch remed data: ${error.response?.status} - ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to fetch remed data: ${error.message}`);
    } else {
      throw new Error('Failed to fetch remed data due to an unknown error');
    }
  }
}

export default GetRemed;
