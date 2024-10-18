import axios from 'axios';
import Cookies from 'js-cookie'; // นำเข้า js-cookie เพื่อนำเข้า token

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetPatienByThai_Id = async (id: any) => {
  try {
    const token = Cookies.get('token'); // ดึง token จากคุกกี้

    if (!token) {
      throw new Error('No authentication token found'); // ถ้าไม่มี token ให้โยน error
    }

    const res = await axios.get(`${API_URL}/mgmt/patient?GetBy=id&GetDoc=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ส่ง token ผ่าน Authorization header
      },
    });

    return res.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      throw new Error(`Failed to fetch patient data: ${error.response?.status} - ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to fetch patient data: ${error.message}`);
    } else {
      throw new Error('Failed to fetch patient data due to an unknown error');
    }
  }
}

export default GetPatienByThai_Id;
