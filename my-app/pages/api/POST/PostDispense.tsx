import axios from "axios";
import Cookies from 'js-cookie'; // นำเข้า js-cookie เพื่อนำเข้า token

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Dispense {
    medicine_id: number;
    medicine_usage_frequency_id: number;
    medicine_usage_time_id: number;
    amount: number;
}

interface PostDispenseParams {
    pdid: number; 
    formData: Dispense[];
}

export const PostDispense = async ({ formData, pdid }: PostDispenseParams) => {
    try {
        const token = Cookies.get('token'); 

        if (!token) {
            throw new Error('No authentication token found'); 
        }

        const response = await axios.post(`${API_URL}/clinic/dispense?pdid=${pdid}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`, 
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

export default PostDispense;
