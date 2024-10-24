import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PatientData {
    thai_id: string;
    full_name: string;
    ucs: boolean;  
    address: string;
    gender: string;
    date_of_birth: string;
    tel: string;
  };
  

export const PutPatientEdit = async (formData: PatientData) => {
    try {
        const token = Cookies.get('token');

        const res = await axios.put(`${API_URL}/clinic/patient`, null, {
            params: {
                thai_id: formData.thai_id,
                full_name: formData.full_name,
                tel: formData.tel,
                address: formData.address,
                gender: formData.gender,
                date_of_birth: formData.date_of_birth,
                ucs: formData.ucs,

            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); 
      
        return res.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Response data:", error.response?.data);
        } 
    }
}

export default PutPatientEdit;
