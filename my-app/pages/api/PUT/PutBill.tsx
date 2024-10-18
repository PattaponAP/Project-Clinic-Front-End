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
      throw new Error(`Request failed: ${error.response?.status} - ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Request failed: ${error.message}`);
    } else {
      throw new Error('Request failed with an unknown error');
    }
  }
};

export default PutBill;
