import { useEffect, useState } from "react";
import QueuePersonal from "./component/Queue-Person";
import PopupCheck from "./component/Popup/PopupCheck";
import { ManagementInfo } from "./component/ManagementInfo";

export default function TakeQueue() {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (check) {
      setCheck(true);
      const timer = setTimeout(() => {
        setCheck(false);
      }, 2000); 

      return () => clearTimeout(timer);
    }
    
  }, [check]);
  
  return (
    <div>
        <ManagementInfo setCheck={setCheck}/>

        {check && (<PopupCheck check={check}/>)}
   
      <div className=" relative border border-black">
        <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">
          ลำดับการเข้ารักษา
        </div>
        <div className="p-4">
          <QueuePersonal />
        </div>
      </div>
    </div>
  );
}
