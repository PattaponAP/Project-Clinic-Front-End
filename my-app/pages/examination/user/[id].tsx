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
        <div className="flex flex-col justify-between gap-8 h-full">
            <div className=" relative border border-black">
                <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">ผู้ป่วย</div>
                <div className="p-8">
                    <InfoPersonal />
                </div>
            </div>

            <div className=" relative border border-black">
                <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">ข้อมูลร่างกาย</div>
                <div className="p-8">
                    <InfoBodyPersonal buttonCheck={false} />
                </div>
            </div>

            <div>
                <ProcedurePN />
            </div>

            <div>
                <PaymentPN />
            </div>

            <div className="flex justify-center space-x-8 items-center ">
                    <button className="p-2 px-8 border border-black bg-[#042446] text-white rounded-xl shadow-xl hover:bg-white hover:text-black transition-colors"> บันทึกข้อมูล </button>
                    <button className="p-2 px-8 border border-black bg-[#042446] text-white rounded-xl shadow-xl hover:bg-white hover:text-black transition-colors"> พิมพ์ใบรับรองแพทย์ </button> 
            </div>
        </div>
    );
}
