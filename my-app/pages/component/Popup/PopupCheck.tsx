import { TbXboxXFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";


type CheckProps = {
    check: boolean
}


export const PopupCheck = ({check} : CheckProps) => {

    return (
        <div className="fixed inset-0 h-screen w-full flex justify-center items-center z-20">
            <div 
            className="h-2/6 w-3/12  bg-slate-200 rounded-xl p-8 flex flex-col items-center justify-center shadow-xl animation-popup">

            {/*Content*/}
                <div className="flex flex-col items-center">
                    <div>   
                        {check ? 
                        (<FaCheckCircle size={70} color="green"/>) 
                        : 
                        (<TbXboxXFilled size={70} color="red"/>)}
                    </div>

                    <div>
                    {check ? 
                        (<div className="text-[28px] text-green-600 mt-8">อัพเดทสำเร็จ</div>) 
                        : 
                        (<div className="text-[28px] text-red-600 mt-8">อัพเดทไม่สำเร็จ</div>)
                    }
                    </div>
                </div>

            </div>
        </div>
    )
}


export default PopupCheck