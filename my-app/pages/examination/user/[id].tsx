import GetPatienById from '@/pages/api/GET/GetPatienById';
import InfoBodyPersonal from '@/pages/component/Info-Body-Personal';
import InfoPersonal from '@/pages/component/Info-Personal';
import { Loading } from '@/pages/component/Loading/Loading';
import { PaymentPN } from '@/pages/component/Payment-Personal';
import ProcedurePN from '@/pages/component/Procedure-Personal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type UserInfo = {
    thai_id: string;
    full_name: string;
    tel: string;
    address: string;
    ucs: boolean;
    gender: string;
    date_of_birth: string
};


type UserInfoBody = {
    weight: number;
    height: number ;
    heart_rate: number ;
    temperature: number ;
    symptom: boolean; 
    blood_pressure: string; 
    allergy: string;
};



export default function ExaminationDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userInfoBody, setUserInfoBody] = useState<UserInfoBody | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showBill, setShowBill] = useState(false)


    useEffect(() => {
        
        const fetchData = async () => {
            if (!id) return;

            try {
                const res = await GetPatienById(id);                
                if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                    setUserInfo(res.data[0]); 
                    setUserInfoBody(res.data[0])
                } else {
                    setError('No valid data found');
                }
            } catch (err) {
                setError('Error fetching patient data');
            } finally {
                setLoading(false);
            }
            
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Loading size={150}/>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col justify-between gap-4 h-full">
            <div className="relative border border-black">
                <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">ผู้ป่วย</div>
                <div className="p-8">
                    {userInfo ? <InfoPersonal userInfo={userInfo} /> : <div>No data available</div>}
                </div>
            </div>

            <div className="relative border border-black">
                <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">ข้อมูลร่างกาย</div>
                <div className="p-8">
                    {userInfoBody ? <InfoBodyPersonal userInfo={userInfoBody} /> :<div>No data available</div>}
                </div>
            </div>

            <div>
                <PaymentPN userId={id} thaiId={userInfo?.thai_id} />
            </div>

        </div>
    );
}
