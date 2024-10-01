import AllQueuePerson from "./component/All-Queue-Person";

import { LuRefreshCw } from "react-icons/lu";

const mockQueueData = [
  { id: 1, name: "พัทธพล อภิชาติโชติกุล" },
  { id: 2, name: "สมชาย ใจดี" },
  { id: 3, name: "สมหญิง สุขใจ" },
  { id: 4, name: "สุเทพ ธรรมดา" },
  { id: 5, name: "สุนารี ชัยพิชัย" },
  { id: 6, name: "นพดล ดีเยี่ยม" },
  { id: 7, name: "นันทนา ดีใจ" },
];

export default function ListQueue() {
  return (
    <div className="relative border border-black h-full">
      <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">
        คิวทั้งหมด{" "}
        <span className="text-[32px] text-red-500">{mockQueueData.length}</span>{" "}
        คิว
      </div>
      <div className="p-8 mb-8 space-y-4 w-full h-[calc(100vh-100px)] overflow-y-auto">
        <div className="flex justify-end m-4">
          <button className="p-2">
            <div className="flex items-center space-x-3">
                <span>รีเฟรช</span>
                <LuRefreshCw size={30} className="refresh-spin"/>
            </div>
          </button>
        </div>
        {mockQueueData.map((queue) => (
          <AllQueuePerson key={`${queue.id}-${Math.random()}`} queue={queue} />
        ))}
      </div>
    </div>
  );
}
