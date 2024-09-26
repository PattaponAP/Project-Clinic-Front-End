export const QueuePersonal = () => {
    const MockupInfo = [
        { id: 1, name: 'พัทธพล อภิชาติโชติกุล', time: '08:00', symptom: 'ปวดหัว' },
        { id: 2, name: 'สมชาย ใจดี', time: '08:30', symptom: 'ปวดท้อง' },
        { id: 3, name: 'สมหญิง สุขใจ', time: '09:00', symptom: 'มีไข้' },
        
    ];

    return (
        <div className="text-nowrap">
            <div className="min-h-[280px] max-h-[280px]  scrollbar-hidden">
                <table className="w-full mt-2 overflow-x-auto">
                    <thead className="sticky top-0 bg-gray-200 ">
                        <tr>
                            <th className="p-2 border border-black w-1/12">ลำดับการคิว</th>
                            <th className="p-2 border border-black w-3/12">ชื่อ - นามสกุล</th>
                            <th className="p-2 border border-black w-2/12">เวลาเข้า</th>
                            <th className="p-2 border border-black w-3/12">อาการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MockupInfo.map((info) => (
                            <tr key={info.id} className="hover:bg-black hover:bg-opacity-10">
                                <td className="p-2 border border-black text-center">{info.id}</td>
                                <td className="p-2 border border-black text-center">{info.name}</td>
                                <td className="p-2 border border-black text-center">{info.time}</td>
                                <td className="p-2 border border-black text-center">{info.symptom}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QueuePersonal;
