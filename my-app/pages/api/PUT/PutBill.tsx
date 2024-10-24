import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PutBill = async (qid: any) => {
  try {
    const token = Cookies.get('token');
    console.log("Token:", token); 
    const res = await axios.put(`${API_URL}/clinic/bill?bill_id=${qid}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return res; 

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

export default PutBill;
