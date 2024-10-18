import axios from 'axios';
import Cookies from 'js-cookie'; // import cookiejs
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetAllPatient = async() => {
  try {
    const token = Cookies.get('token'); 

    console.log(token)
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const res = await axios.get(`${API_URL}/mgmt/patient?GetBy=all`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      throw new Error(`Failed to fetch patient data: ${error.response?.status} - ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to fetch patient data: ${error.message}`);
    } else {
      throw new Error('Failed to fetch patient data due to an unknown error');
    }
  }
};

export default GetAllPatient;
