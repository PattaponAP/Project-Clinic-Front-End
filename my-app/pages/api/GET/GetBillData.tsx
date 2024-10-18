import axios from 'axios';
import Cookies from 'js-cookie'; // นำเข้า js-cookie เพื่อนำเข้า token

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetBillById = async (id: any) => {
  try {
    const token = Cookies.get('token'); 

    if (!token) {
      throw new Error('No authentication token found'); 
    }

    const res = await axios.get(`${API_URL}/cert/billData?id=${id}&by=bid`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return res.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      throw new Error(`Failed to fetch bill data: ${error.response?.status} - ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to fetch bill data: ${error.message}`);
    } else {
      throw new Error('Failed to fetch bill data due to an unknown error');
    }
  }
}

export default GetBillById;
