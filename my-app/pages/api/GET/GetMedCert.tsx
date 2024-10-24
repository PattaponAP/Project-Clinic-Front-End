import axios from 'axios';
import Cookies from 'js-cookie'; // นำเข้า js-cookie เพื่อนำเข้า token

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetMedCert = async (thai_id: any) => {
  try {
    const token = Cookies.get('token'); 

    if (!token) {
      throw new Error('No authentication token found'); 
    }

    const res = await axios.get(`${API_URL}/cert/medcert?GetBy=thai_id&GetDoc=${thai_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return res.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        const message = error.response?.data || 'Unknown error';
        throw new Error(`Failed to fetch dispense data: ${message} - ${error.message}`);
    } else if (error instanceof Error) {
        throw new Error(`Failed to fetch dispense data: ${error.message}`);
    } else {
        throw new Error('Failed to fetch dispense data due to an unknown error');
    }
}
}

export default GetMedCert;
