import axios from 'axios';

interface UserProps {
    username: string;
    password: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginAuth = async ({ username, password }: UserProps) => {
    try {
        const formData = new FormData();
        formData.append("username", username)
        formData.append("password", password)

        const response = await axios.post(`${API_URL}/auth/login`, null, {
            params: {
                username,
                password,
            }
        })
            

        return response

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
