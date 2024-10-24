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
        const message = error.response?.data || 'Unknown error';
        throw new Error(`Failed to fetch dispense data: ${message} - ${error.message}`);
    } else if (error instanceof Error) {
        throw new Error(`Failed to fetch dispense data: ${error.message}`);
    } else {
        throw new Error('Failed to fetch dispense data due to an unknown error');
    }
  }
}

export default PostProcedure;
