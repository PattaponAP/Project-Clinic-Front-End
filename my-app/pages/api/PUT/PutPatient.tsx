import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type PatientData = {
    thai_id: string;
    full_name: string;
    ucs: boolean;  
    address: string;
    gender: string;
    date_of_birth: string;
    tel: string
    height: number | null;  
    weight: number | null;  
    blood_pressure: string | null;  
    heart_rate: number | null;  
    temperature: number | null;  
    allergy: string | null;  
    symptom: string | null;  
  };

export const PutPatient = async (formData: PatientData) => {
  try {
    const res = await axios.put(`${API_URL}/clinic/patient`, null, {
        params: {
          thai_id: formData.thai_id,
          full_name: formData.full_name,
          tel: formData.tel,
          address: formData.address,
          gender: formData.gender,
          date_of_birth: formData.date_of_birth,
          ucs: formData.ucs,
          height: formData.height,
          weight: formData.weight,
          blood_pressure: formData.blood_pressure,
          heart_rate: formData.heart_rate,
          temperature: formData.temperature,
          allergy: formData.allergy,
          symptom: formData.symptom,
        },
      }); 
      
      return res.status;
    
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

export default PutPatient;
