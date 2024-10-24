import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FormData {
  sheet_no: number;
  prefix: string;
  fullname: string;
  address: string;
  thai_id: string;
  congenital?: string;
  surgery?: string;
  hospitalize?: string;
  epilepsy?: string;
  etc?: string;
  weight: number;
  height: number;
  blood_pressure: string;
  heart_rate: number;
  diagnose: string;
  diagnose_etc?: string;
  comment: string;
}

export const PostMedCert = async (formData: FormData) => {
  try {
    const token = Cookies.get('token');

    const queryParams = new URLSearchParams({
      sheet_no: formData.sheet_no.toString(),
      prefix: formData.prefix,
      full_name: formData.fullname,
      address: formData.address,
      thai_id: formData.thai_id,
      congenital: formData.congenital || "",
      surgery: formData.surgery || "",
      hospitalize: formData.hospitalize || "",
      epilepsy: formData.epilepsy || "",
      etc: formData.etc || "",
      weight: formData.weight.toString(),
      height: formData.height.toString(),
      blood_pressure: formData.blood_pressure,
      heart_rate: formData.heart_rate.toString(),
      diagnose: formData.diagnose,
      diagnose_etc: formData.diagnose_etc || "",
      comment: formData.comment,
    });

    const response = await axios.post(`${API_URL}/cert/medcert`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams
    });

    return response.data;

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

export default PostMedCert;
