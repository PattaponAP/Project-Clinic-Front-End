import { jsPDF } from 'jspdf';
import { callAddFont } from "../fonts/THSarabunNew-normal.js";
import converter from './dateconverter';

export default function doctor_note_printer(
    ID: string,
    date: string,
    name: string,
    diagnose: string,
    comment: string

): void {

    jsPDF.API.events.push(["addFonts", callAddFont]);

    const newdate = converter(date);


    const doc = new jsPDF(
        {
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        }
    );

    doc.setProperties({
        title: ID
    });

    doc.setFont("THSarabunNew", "normal");
    
    doc.setFontSize(28);
    doc.text('ใบรับรองการเจ็บป่วย', 105, 30, { align: 'center' });
    doc.setFontSize(18);
    doc.text('สถานที่ตรวจ คลินิกแพทย์หญิงภนุชพร ตำบลในเมือง อำเภอเมือง จังหวัดขอนแก่น', 20, 55, { align: 'left' });
    doc.text(`${newdate[0]}`, 20, 62, { align: 'left' });
    doc.text('ข้าพเจ้า แพทย์หญิงภนุชพร พฤกษา', 20, 69, { align: 'left' });
    doc.text('ใบอนุญาตประกอบวิชาชีพเวชกรรมเลขที่ ว.30377', 20, 76, { align: 'left' });
    doc.text(`ได้ทำการตรวจรักษา นาย ${name}`, 20, 90, { align: 'left' });
    doc.text(`เมื่อ${newdate[0]}`, 20, 97, { align: 'left' });
    doc.text('ให้การวินิจฉัยว่าเป็นโรค', 20, 110, { align: 'left' });
    doc.text(`${diagnose}`, 30, 117, { align: 'left' });
    doc.text('ความเห็นแพทย์', 20, 140, { align: 'left' });
    doc.text(`${comment}`, 30, 147, { align: 'left' });

    doc.text('จึงรับรองเพื่อมาเป็นหลักฐาน', 155, 240, { align: 'center' });
    doc.text('(แพทย์หญิงภนุชพร พฤกษา)', 155, 265, { align: 'center' });

    const pdfDataUri = doc.output('datauristring');
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100% - 40px)';
    iframe.src = pdfDataUri;

    const miniWindow = document.createElement('div');
    miniWindow.style.position = 'fixed';
    miniWindow.style.top = '10%';
    miniWindow.style.left = '10%';
    miniWindow.style.width = '80%';
    miniWindow.style.height = '80%';
    miniWindow.style.backgroundColor = 'white';
    miniWindow.style.border = '1px solid black';
    miniWindow.style.zIndex = '1000';
    miniWindow.style.overflow = 'hidden';

    const topTab = document.createElement('div');
    topTab.style.width = '100%';
    topTab.style.height = '40px';
    topTab.style.backgroundColor = '#f1f1f1';
    topTab.style.borderBottom = '1px solid black';
    topTab.style.display = 'flex';
    topTab.style.alignItems = 'center';
    topTab.style.justifyContent = 'space-between';
    topTab.style.padding = '0 10px';

    const title = document.createElement('span');
    title.innerText = 'PDF Preview';
    topTab.appendChild(title);

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.onclick = () => {
        document.body.removeChild(miniWindow);
    };
    topTab.appendChild(closeButton);

    miniWindow.appendChild(topTab);
    miniWindow.appendChild(iframe);
    document.body.appendChild(miniWindow);
}
  



