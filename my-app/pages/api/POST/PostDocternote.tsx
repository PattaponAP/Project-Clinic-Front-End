import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type DoctornoteProps = {
    name: string | undefined;
    diagnose : string; 
    comment: string;   
}

export const PostDocternote = async ({ name, diagnose , comment }: DoctornoteProps) => {
    try {
        const response = await axios.post(`${API_URL}/cert/doctornote`, null, {
            params: {
                name,
                diagnose,
                comment,
            }
        });

        console.log('Response data:', response.data);
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
