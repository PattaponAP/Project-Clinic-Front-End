import DropdownFrequen from "../DropDown/Drop-Down-Frequency"
import DropdownTime from "../DropDown/Drop-Down-Time"

type DrungProps = {
    medicien_name : string
    frequency: number
    time: number
    amount: number
}

export const Drung = ({ medicien_name , frequency, time, amount} : DrungProps) => {
    return(
        <div className="w-full flex justify-between items-center p-3 px-6 border mb-4 rounded-xl bg-gray-200 min-w-[750px]">
            <div className="w-1/6">
                {medicien_name}
            </div>

            <div className="flex gap-4">
                <DropdownFrequen valueF={frequency}/>
                <DropdownTime valueT={time}/>
                <div className=" relative">
                    <input type="text" value={amount} placeholder="จำนวน" className="w-3/6 px-6 p-2 bg-gray-200 border border-black rounded-xl"/>
                    <div className=" absolute top-[-10px] bg-gray-200 px-2 text-[15px] left-[10px]">จำนวน</div>
                </div>
            </div>

            <div>
                ลบ
            </div>
        </div>
    )
}

export default Drung