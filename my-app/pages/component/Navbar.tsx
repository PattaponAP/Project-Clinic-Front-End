import Link from "next/link";
import { useState } from "react";
import Cookies from 'js-cookie';
import Image from "next/image";

import logoClinicW from "@/styles/Images/clinic_white.png";

import { FaClinicMedical } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { FaInfoCircle } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";

export const NavBar = ({ name }: { name: string | undefined }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    };

    const toggleDropDown = (dropdownName: string) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    return (
        <div className="bg-[#042446] flex flex-col justify-between text-white">
            <div className="rounded-xl my-8 mb-16">
                <Link href={"/"}>
                    <div className="flex justify-center m-4">
                        <Image src={logoClinicW} alt="clinic-icon" width={300} height={150} />
                    </div>
                </Link>
            </div>

            <div className="space-y-4">
                {/* Clinic Management Dropdown */}
                <div>
                    <button onClick={() => toggleDropDown("clinic")} className="w-full transition-transform">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <FaClinicMedical size={30} />
                            <div className="text-[20px]">จัดการคลินิก</div>
                        </div>
                    </button>
                    <div className={`pl-16 overflow-hidden transition-[max-height] duration-300 ease-in-out ${openDropdown === "clinic" ? "max-h-screen" : "max-h-0"}`}>
                        <Link href={"/take-queue"}>
                            <div className="py-4 hover:bg-gray-600 p-2">รับผู้ป่วยเข้าคิว</div>
                        </Link>
                        <Link href={"/list-queue"}>
                            <div className="py-4 hover:bg-gray-600 p-2">ดูคิวทั้งหมด</div>
                        </Link>
                    </div>
                </div>

                {/* Payment Section */}
                <div>
                    <Link href="/payment">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <GrContactInfo size={30} />
                            <div className="text-[20px]">ผู้ป่วย / รับยาชำระเงิน</div>
                        </div>
                    </Link>
                </div>

                {/* Info Drug Dropdown */}
                <div>
                    <button onClick={() => toggleDropDown("Info-drug")} className="w-full transition-transform">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <HiOutlineViewGridAdd size={30} />
                            <div className="text-[20px]">ข้อมูลยา / ข้อมูลผู้ป่วย</div>
                        </div>
                    </button>
                    <div className={`pl-16 overflow-hidden transition-[max-height] duration-100 ease-in-out ${openDropdown === "Info-drug" ? "max-h-screen" : "max-h-0"}`}>
                        <Link href={"/info-drug"}>
                            <div className="py-4 hover:bg-gray-600 p-2">ดูข้อมูลยาทั้งหมด</div>
                        </Link>
                        <Link href={"/infopatient"}>
                            <div className="py-4 hover:bg-gray-600 p-2">ดูข้อมูลผู้ป่วย</div>
                        </Link>
                    </div>
                </div>

                {/* More Dropdown */}
                <div>
                    <button onClick={() => toggleDropDown("more")} className="w-full transition-transform">
                        <div className="flex items-center p-4 space-x-4 hover:bg-slate-600 transition-colors">
                            <FaInfoCircle size={30} />
                            <div className="text-[20px]">รายการเพิ่มเติม</div>
                        </div>
                    </button>
                    <div className={`pl-16 overflow-hidden transition-[max-height] duration-100 ease-in-out ${openDropdown === "more" ? "max-h-screen" : "max-h-0"}`}>
                        <Link href={"/job-application"}>
                            <div className="py-4 hover:bg-gray-600 p-2">ใบรับรองแพทย์สมัครงาน</div>
                        </Link>
                        <Link href={"/driving-license"}>
                            <div className="py-4 hover:bg-gray-600 p-2">ใบรับรองแพทย์ ใบขับขี่</div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Logout Section */}
            <div className="p-4 mt-auto space-y-4">
                <div className="flex w-full justify-end text-gray-400">
                    เข้าสู่ระบบโดย {name}
                </div>
                <button onClick={handleLogout} className="w-full border border-white p-2 rounded-lg hover:bg-red-500 hover:border-[#042446] transition-colors">
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default NavBar;
