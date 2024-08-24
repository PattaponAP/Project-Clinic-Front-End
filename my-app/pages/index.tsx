import Image from "next/image";
import { Inter } from "next/font/google";
import { Login } from "./component/Login";


export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-full animation-homepage">
      <div className="text-[28px]">
         ยินดีต้อนรับเข้าสู่ระบบ คุณ <span className="text-gray-500"> " พัทธพล " </span>
      </div>
    </div>
  );
}
