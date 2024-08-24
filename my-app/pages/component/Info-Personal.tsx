export const InfoPersonal = () => {

    return (
        <div className="text-nowrap">
            <div className="space-y-4">
                <div className="grid grid-cols-4 w-full gap-4">

                    <div className="col-span-1 relative">
                        <input type="text" className=" border border-black rounded-xl p-3 w-full" />
                        <div className=" absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">ลำดับการคิว</div>
                    </div>

                    <div className="col-span-2 relative">
                        <input type="text" className=" border border-black rounded-xl p-3 w-full" />
                        <div className=" absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">ชื่อ - นามสกุล</div>
                    </div>

                    <div className="col-span-1 relative">
                        <input type="text" className="grid col-span-1 border border-black rounded-xl p-3 w-full" />
                        <div className=" absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">เบอร์โทรศัพท์</div>
                    </div>

                </div>

                <div className="grid grid-cols-9 w-full gap-4">

                    <div className=" relative col-span-3">
                        <input type="text" className="border border-black rounded-xl p-3 w-full" />
                        <div className=" absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">สิทธิการรักษา</div>
                    </div>

                    <div className=" relative col-span-1">
                        <input type="text" className="border border-black rounded-xl p-3 w-full" />
                        <div className=" absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">เพศ</div>
                    </div>

                    <div className=" relative col-span-1">
                        <input type="text" className="border border-black rounded-xl p-3 w-full" />
                        <div className=" absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">อายุ</div>
                    </div>

                    <div className=" relative col-span-4">
                        <input type="text" className="border border-black rounded-xl p-3 w-full" />
                        <div className=" absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">แพ้ยา</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InfoPersonal;