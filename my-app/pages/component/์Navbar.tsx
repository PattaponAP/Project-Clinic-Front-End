import Link from "next/link"

export const NavBar = () => {
    return (
        <div className="bg-[#042446] h-screen flex flex-col justify-between text-white">
            <div className="border m-4">
                <div className="flex justify-center items-center text-[32px] font-semibold">Logo</div>
            </div>

            <div className="space-y-4">
                <div>
                    <Link href="./">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <div className="p-1 border">Icon</div>
                            <div className="text-[20px]">จัดการคลีนิก</div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link href="./">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <div className="p-1 border">Icon</div>
                            <div className="text-[20px]">ข้อมูลผู้ป่วย</div>
                        </div>
                    </Link>
                </div>

                <div>
                <Link href="./">
                    <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                        <div className="p-1 border">Icon</div>
                        <div className="text-[20px]">ข้อมูลยา</div>
                    </div>
                </Link>
                </div>

                <div>
                <Link href="./">
                    <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                        <div className="p-1 border">Icon</div>
                        <div className="text-[20px]">รายการเพิ่มเติม</div>
                    </div>
                </Link>
                </div>

            </div>

            <div className="p-4">
                <button className="w-full border border-white p-2 rounded-lg hover:bg-red-500 transition-colors">
                    Sign Out
                </button>
            </div>
        </div>
    )
}
