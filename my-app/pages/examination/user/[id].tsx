import InfoBodyPersonal from '@/pages/component/Info-Body-Personal';
import InfoPersonal from '@/pages/component/Info-Personal';
import PaymentPN from '@/pages/component/Payment-Personal';
import ProcedurePN from '@/pages/component/Procedure-Personal';
import { useRouter } from 'next/router';



export default function ExaminationDetail() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div className=" relative border border-black">
                <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">ผู้ป่วย</div>
                <div className="p-8">
                    <InfoPersonal />
                </div>
            </div>

            <div className=" relative border border-black">
                <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">ข้อมูลร่างกาย</div>
                <div className="p-8">
                    <InfoBodyPersonal buttonCheck={true} />
                </div>
            </div>

            <div>
                <ProcedurePN />
            </div>

            <div>
                <PaymentPN />
            </div>
        </div>
    );
}
