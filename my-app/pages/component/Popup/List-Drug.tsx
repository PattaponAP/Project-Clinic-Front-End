interface ListDrugProps {
    drugs: { id: number; name: string }[];
}

export const ListDrug = ({ drugs }: ListDrugProps) => {
    return (
        <>
            {drugs.map(drug => (
                <div key={drug.id} className="p-4 bg-white shadow-xl border-y border-gray-400 w-full rounded-3xl flex flex-col sm:flex-row justify-between items-center">
                    <div className="sm:ml-8 text-center sm:text-left">
                        {drug.name}
                    </div>

                    <div className="flex justify-evenly space-x-4 mt-2 sm:mt-0 sm:space-x-8 sm:mr-8 text-white">
                        <button className="p-2 px-4 bg-[#042446] rounded-2xl">
                            แก้ไขยา
                        </button>

                        <button className="p-2 px-4 bg-[#042446] rounded-2xl">
                            จ่ายยา
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ListDrug;
