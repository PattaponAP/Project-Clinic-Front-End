import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type DoctornoteProps = {
    name: string | undefined;
    diagnose: string; 
    comment: string;   
}

export const PostDocternote = async ({ name, diagnose, comment }: DoctornoteProps) => {
    try {
        const token = Cookies.get('token');

        const response = await axios.post(`${API_URL}/cert/doctornote`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                name,
                diagnose,
                comment,
            }
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

export default PostDocternote;
