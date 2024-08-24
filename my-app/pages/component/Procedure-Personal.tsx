export const ProcedurePN = () => {
    return (
        <div className="relative border border-black p-4 text-nowrap">
        <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">หัตถการ</div>
        <div className="m-8 space-y-4">
            
            <div className="grid grid-cols-[40%_auto] w-full gap-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="relative">
                        <input type="text" className="border border-black rounded-xl p-3 w-full" />
                        <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">Ear Wash </div>

                    </div>

                    <div className="relative">
                        <input type="text" className="border border-black rounded-xl p-3 w-full" />
                        <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">Myringo</div>
                    </div>

                    <div className="relative">
                        <input type="text" className="border border-black rounded-xl p-3 w-full" />
                        <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">Tapping</div>
                    </div>
                </div>

                <div className="col-span-1 relative">
                    <input type="text" className="grid col-span-1 border border-black rounded-xl p-3 w-full" />
                    <div className="absolute translate-x-[12px] translate-y-[-62px] px-4  bg-white">ฉีดยา</div>
                </div>
            </div>


        </div>
    </div>
    )
}

export default ProcedurePN;