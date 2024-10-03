import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface Dispense {
    medicine_id: number;
    medicine_usage_frequency_id: number;
    medicine_usage_time_id: number;
    amount: number;
}

interface PostDispenseParams {
    formData: Dispense[];  // เปลี่ยนให้รับ Dispense[]
    pdid: number | string;
}

export const PostDispense = async ({ formData, pdid }: PostDispenseParams) => {
    try {
        // const response = await axios.post(`${API_URL}/clinic/dispense?pdid=${pdid}`, formData);
        console.log('Response data:', formData);
        // return response
        console.log(pdid)
        return formData

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
