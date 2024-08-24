import InfoBodyPersonal from "./component/Info-Body-Personal";
import { InfoPersonal } from "./component/Info-Personal";
import QueuePersonal from "./component/Queue-Person";

export default function TakeQueue() {
    return (
        <div className="space-y-12">
            <div >
                <InfoPersonal />
            </div>

            <div>
                <InfoBodyPersonal buttonCheck={true} />
            </div>

            <div>
                <QueuePersonal />
            </div>
        </div>
    );
}
