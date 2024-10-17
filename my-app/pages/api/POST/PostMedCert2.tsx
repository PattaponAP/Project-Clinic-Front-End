import axios from "axios";

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

export const PostMedCert2 = async (formData: FormData) => {
  try {
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

    console.log(queryParams)
    const response = await axios.post(`${API_URL}/cert/medcert2`, null, {
      params: queryParams
    });

    console.log("Response data:", response.data);

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      throw new Error(`Request failed: ${error.response?.status} - ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Request failed: ${error.message}`);
    } else {
      throw new Error("Request failed with an unknown error");
    }
  }
};

export default PostMedCert2;
