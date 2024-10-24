import axios from 'axios';
import Cookies from 'js-cookie'; // นำเข้า js-cookie เพื่อนำเข้า token

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetDispense = async (id: any) => {
  try {
    const token = Cookies.get('token'); // ดึง token จากคุกกี้

    if (!token) {
      throw new Error('No authentication token found'); // ถ้าไม่มี token ให้โยน error
    }

    const res = await axios.get(`${API_URL}/clinic/dispense?pdid=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ส่ง token ผ่าน Authorization header
      },
    });

    return res.data;

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

export default GetDispense;
