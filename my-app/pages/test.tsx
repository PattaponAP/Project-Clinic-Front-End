import { useState } from "react";
import { InjectInfo } from "./component/DropDown/Inject-Info";
import { PopupCheck } from "./component/Popup/PopupCheck";

export default function Test () {
    const [check, setChek] = useState(false)
    return (
        <div>
            <PopupCheck check={check}/>
        </div>
    )
}