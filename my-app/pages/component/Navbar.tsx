import Link from "next/link";
import { useState } from "react";
import Cookies from 'js-cookie';
import Image from "next/image";


import logoClinicW from "@/styles/Images/clinic_white.png"

import { FaClinicMedical } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { FaInfoCircle } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";

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
        <div className="bg-[#042446] flex flex-col justify-between text-white">
            <div className=" m-4 h-1/5 rounded-xl">
            <Link href={"/"}    >
                <div className="flex justify-center mt-8">
                    <Image src={logoClinicW} alt="clinic-icon" width={300} height={150}/>
                    </div>
                    </Link>
            </div>

            <div className="space-y-4  h-4/5 mt-14">
                <div className="mt-14">
                    <button onClick={() => toggleDropDown("clinic")} className="w-full transition-transform">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <div><FaClinicMedical size={30}/></div>
                            <div className="text-[20px]">จัดการคลินิค</div>
                        </div>
                    </button>
                    <div
                        className={`pl-16 overflow-hidden transition-[max-height] duration-300 ease-in-out ${openDropdown === "clinic" ? "max-h-screen" : "max-h-0"
                            }`}
                    >
                        <Link href={"/take-queue"}><div className="py-4 hover:bg-gray-600 p-2">รับผู้ป่วยเข้าคิว</div></Link>
                        <Link href={"/list-queue"}><div className="py-4 hover:bg-gray-600 p-2">ดูการคิวทั้งหมด</div></Link>
                        <Link href={"/list-payment"}><div className="py-4 hover:bg-gray-600 p-2">รับยาชำระเงิน</div></Link>
                    </div>
                </div>

                <div>
                    <Link href="/info-patient">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <div><GrContactInfo size={30}/></div>
                            <div className="text-[20px]">ข้อมูลผู้ป่วย</div>
                        </div>
                    </Link>
                </div>
                <div>
                    <button onClick={() => toggleDropDown("Info-drug")} className="w-full transition-transform">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <div><HiOutlineViewGridAdd size={30}/></div>
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
                            <div><FaInfoCircle size={30}/></div>
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
                <button onClick={handleLogout} className="w-full border border-white p-2 rounded-lg hover:bg-red-500 hover:border-[#042446] transition-colors">
                    Sign Out
                </button>
            </div>
        </div>
    );
};
