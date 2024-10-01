import InfoBodyPersonal from "./component/Info-Body-Personal";
import { InfoPersonal } from "./component/Info-Personal";
import QueuePersonal from "./component/Queue-Person";

export default function TakeQueue() {
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

            <div className=" relative border border-black">
                <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">ลำดับการเข้ารักษา</div>
                <div className="p-8">
                    <QueuePersonal />

                </div>
            </div>
        </div>
    );
}
