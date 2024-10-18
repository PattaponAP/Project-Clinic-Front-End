import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type PatientData = {
    pdid: number;
    diagnose: string;
    earclean: boolean;
    myringo: boolean;
    tapping: boolean;
    price: number;
    appointment: string;
    annotate: string;
    inject_id: number;
};

export const PostProcedure = async (formData: PatientData) => {
  try {
    const token = Cookies.get('token');

    const requestBody = [
      {
        injection_id: formData.inject_id,
      }
    ];

    const response = await axios.post(`${API_URL}/clinic/procedure`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pdid: formData.pdid,
        diagnose: formData.diagnose,
        earclean: formData.earclean,
        myringo: formData.myringo,
        tapping: formData.tapping,
        price: formData.price,
        appointment: formData.appointment,
        annotate: formData.annotate,
      },
    });

    return response.data;

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

export default PostProcedure;
