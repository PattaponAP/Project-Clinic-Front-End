interface HomePageProps {
  name: string;
}

export default function HomePage({ name }: HomePageProps) {
  return (
    <div className="flex justify-center items-center h-full animation-homepage">
      <div className="text-[28px]">
         ยินดีต้อนรับเข้าสู่ระบบ คุณ <span className="text-gray-500">"{name}"</span>
      </div>
    </div>
  );
}
