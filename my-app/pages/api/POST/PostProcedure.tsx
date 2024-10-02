import axios from "axios";

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
    inject_id: number; // แก้ไขเพื่อให้ตรงกับข้อมูลที่ส่ง
};

export const PostProcedure = async (formData: PatientData) => {
  try {
    const requestBody = [
      {
        injection_id: formData.inject_id,
      }
    ];

    const response = await axios.post(`${API_URL}/clinic/procedure`, requestBody, {
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

    console.log('Response data:', response.data);
    return response;

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
