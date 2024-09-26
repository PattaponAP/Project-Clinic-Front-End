import AllPaymentPerson from "./component/All-Payment-Person";

const mockQueueData = [
    { id: 1, name: 'พัทธพล อภิชาติโชติกุล' },
    { id: 2, name: 'สมชาย ใจดี' },
    { id: 3, name: 'สมหญิง สุขใจ' },
    { id: 4, name: 'สุเทพ ธรรมดา' },
    { id: 5, name: 'สุนารี ชัยพิชัย' },
    { id: 6, name: 'นพดล ดีเยี่ยม' },
    { id: 7, name: 'นันทนา ดีใจ' },
];

export default function ListPayment() {
    return (
        <div className="relative border border-black h-full">
            <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">
            ลำดับการจ่ายเงิน ทั้งหมด <span className="text-[32px] text-red-500">{mockQueueData.length} </span> คน
            </div>
            <div className="p-8 mb-8 space-y-4 w-full h-[calc(100vh-100px)] overflow-y-auto">
                {mockQueueData.map((queue) => (
                    <AllPaymentPerson key={queue.id} queue={queue} />
                ))}
            </div>
        </div>
    );
}
