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
            throw new Error(`Login failed: ${error.response?.status} - ${error.message}`);
        } else if (error instanceof Error) {
            throw new Error(`Login failed: ${error.message}`);
        } else {
            throw new Error('Login failed with an unknown error');
        }
    }
};
