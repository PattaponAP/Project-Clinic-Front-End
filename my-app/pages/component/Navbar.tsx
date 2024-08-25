import Link from "next/link";
import { useState } from "react";
import Cookies from 'js-cookie';
import router from "next/router";


export const NavBar = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleLogout= () => {
        Cookies.remove('token')
        window.location.reload()
    }

    const toggleDropDown = (dropdownName: string) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    return (
        <div className="bg-[#042446] h-screen flex flex-col text-white">
            <div className="border m-4 h-1/5">
                <div className="flex justify-center items-center h-[150px] text-[32px] font-semibold">Logo</div>
            </div>

            <div className="space-y-4 border-t border-white h-4/5 mt-12">
                <div>
                    <button onClick={() => toggleDropDown("clinic")} className="w-full transition-transform">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <div className="p-1 border">Icon</div>
                            <div className="text-[20px]">จัดการคลินิค</div>
                        </div>
                    </button>
                    <div
                        className={`pl-16 overflow-hidden transition-[max-height] duration-300 ease-in-out ${openDropdown === "clinic" ? "max-h-screen" : "max-h-0"
                            }`}
                    >
                        <Link href={"/take-the-queue"}><div className="py-4 hover:bg-gray-600 p-2">รับผู้ป่วยเข้าคิว</div></Link>
                        <Link href={"/list-queue"}><div className="py-4 hover:bg-gray-600 p-2">ดูการคิวทั้งหมด</div></Link>
                        <Link href={"/list-payment"}><div className="py-4 hover:bg-gray-600 p-2">รับยาชำระเงิน</div></Link>
                    </div>
                </div>

                <div>
                    <Link href="/info-patient">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <div className="p-1 border">Icon</div>
                            <div className="text-[20px]">ข้อมูลผู้ป่วย</div>
                        </div>
                    </Link>
                </div>
                <div>
                    <button onClick={() => toggleDropDown("Info-drug")} className="w-full transition-transform">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <div className="p-1 border">Icon</div>
                            <div className="text-[20px]">ข้อมูลยา / เพิ่ม</div>
                        </div>
                    </button>
                    <div
                        className={` pl-16  overflow-hidden transition-[max-height]  duration-100 ease-in-out ${openDropdown === "Info-drug" ? "max-h-screen" : "max-h-0"
                            }`}
                    >
                        <Link href={"/info-drug"}><div className="py-4 hover:bg-gray-600 p-2">ดูข้อมูลยาทั้งหมด</div></Link>
                        <Link href={"/add-info-drug"}><div className="py-4 hover:bg-gray-600 p-2">เพิ่มข้อมูลยา</div></Link>
                    </div>
                </div>
              

                <div>
                    <button onClick={() => toggleDropDown("more")} className="w-full transition-transform">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <div className="p-1 border">Icon</div>
                            <div className="text-[20px]">รายการเพิ่มเติม</div>
                        </div>
                    </button>
                    <div
                        className={` pl-16  overflow-hidden transition-[max-height]  duration-100 ease-in-out ${openDropdown === "more" ? "max-h-screen" : "max-h-0"
                            }`}
                    >
                        <Link href={"/job-application"}><div className="py-4 hover:bg-gray-600 p-2">ใบรับรองแพทย์สมัครงาน</div></Link>
                        <Link href={"/driving-license"}><div className="py-4 hover:bg-gray-600 p-2">ใบรับรองแพทย์ ใบขับขี่</div></Link>
                    </div>
                </div>
            </div>

            <div className="p-4 mt-auto">
                <button onClick={handleLogout} className="w-full border border-white p-2 rounded-lg hover:bg-red-500 transition-colors">
                    Sign Out
                </button>
            </div>
        </div>
    );
};
