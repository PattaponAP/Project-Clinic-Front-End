import axios from 'axios';

interface UserProps {
    username: string;
    password: string;
}

export const loginAuth = async ({ username, password } : UserProps) => {
    try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
            username,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Login failed: ${error.response?.status} - ${error.message}`);
        } else if (error instanceof Error) {
            throw new Error(`Login failed: ${error.message}`);
        } else {
            throw new Error('Login failed with an unknown error');
        }
    }
};
