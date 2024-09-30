interface CheckProps {
    title: string
    check: boolean
}


export const PopupCheck = ({title, check} : CheckProps) => {

    return (
        <div className="fixed inset-0 h-screen w-full flex justify-center items-center z-20">
            <div 
            className="h-2/6 w-4/12  bg-slate-100 rounded-xl p-8 flex flex-col items-center justify-center shadow-xl animation-popup">

            {/*Content*/}
                <div className="flex flex-col items-center ">
                    <div>   
                        Picture 
                    </div>

                    <div className="text-[28px]">
                        {title}
                    </div>
                </div>

            </div>
        </div>
    )
}


export default PopupCheck