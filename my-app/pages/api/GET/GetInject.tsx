import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetInject = async() => {
  try {
    
    const res = await axios.get(`${API_URL}/mgmt/inject?GetBy=all`);
    return res;

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

export default GetInject;
