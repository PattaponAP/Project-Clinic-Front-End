import InfoBodyPersonal from '@/pages/component/Info-Body-Personal';
import InfoPersonal from '@/pages/component/Info-Personal';
import PaymentPN from '@/pages/component/Payment-Personal';
import ProcedurePN from '@/pages/component/Procedure-Personal';
import { useRouter } from 'next/router';



export default function ExaminationDetail() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="space-y-12">
                <div >
                    <InfoPersonal />
                </div>

                <div>
                    <InfoBodyPersonal buttonCheck={false} />
                </div>

                <div>
                    <ProcedurePN/>
                </div>

                <div>
                    <PaymentPN/>
                </div>

                
            </div>
        </div>
    );
}
