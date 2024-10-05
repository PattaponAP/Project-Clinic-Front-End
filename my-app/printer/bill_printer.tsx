import {jsPDF} from 'jspdf';
import { callAddFont } from "../fonts/THSarabunNew-normal.js";
import converter from './dateconverter';
import { callAddBoldFont } from '@/fonts/THSarabunNew-bold.js';

export default function bill_printer(
    id: string,
    date: string,
    thai_id: string,
    full_name: string,
    appointment_date_time: string,
    items: { description: string, quantity: number }[],
    total: number
): void {

    jsPDF.API.events.push(["addFonts", callAddFont]);
    jsPDF.API.events.push(["addFonts", callAddBoldFont]);

    const newdate = converter(date);
    const newappointment_date = converter(appointment_date_time);

    const doc = new jsPDF(
        {
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        }
    );

    doc.setProperties({
        title: "ใบเสร็จรับเงิน"
    });

    doc.setFont("THSarabunNew", "bold");
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.text("ใบเสร็จรับเงิน", 105, 20, { align: "center" });
    doc.setFont("THSarabunNew", "normal");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('คลินิกแพทย์หญิงภนุชพร', 105, 30, { align: 'center'});

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("175/12 หมู่ที่ 7 ถนนศรีจันทร์ อำเภอเมือง จังหวัดขอนแก่น 40000", 105, 35, { align: 'center'});
    doc.text("โทร 08 4787 9128", 105, 40, { align: 'center'});

    doc.setDrawColor(0, 0, 0);
    doc.rect(15, 50, 180, 26); // x, y, width, height

    doc.text(`เลขที่ใบเสร็จ: ${id}`, 190, 58, { align: "right" });
    doc.text(`${newdate[0]}`, 190, 65, { align: "right" });
    doc.text(`เวลา ${newdate[1]}`, 190, 72, { align: "right" });
    
    doc.setFontSize(16);
    doc.text(`เลขประจำตัวประชาชน: ${thai_id}`, 20,58);
    doc.text(`ชื่อผู้ป่วย: ${full_name}`, 20, 65);
    doc.text(`การนัดหมาย: ${newappointment_date[0]} `, 20, 72);

    let startY = 90;
    doc.setFontSize(14);
    // Add table header
    doc.text("รายการ", 20, startY);
    doc.text("จำนวน", 180, startY, { align: "right" });

    // Add line below header
    doc.setDrawColor(0, 0, 0);
    doc.line(15, startY + 2, 195, startY + 2); // x1, y1, x2, y2

    startY += 10; // Move startY down for the items

    items.forEach((item, index) => {
        const itemY = startY + (index * 7);
        doc.text(item.description, 20, itemY);
        doc.text(item.quantity.toString(), 180, itemY, { align: "right" });
    });

    doc.setDrawColor(0, 0, 0);
    doc.line(15, startY + (items.length * 7), 195, startY + (items.length * 7)); // x1, y1, x2, y2
    doc.setFontSize(16);
    doc.text(`รวมทั้งสิ้น: ${total.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`, 180, startY + (items.length * 7) + 10, { align: "right" });

    doc.setFontSize(14);
    doc.text("ลงชื่อ...........................................ผู้รับเงิน", 190, startY + (items.length * 7) + 40, { align: "right" });
    doc.text("ลงชื่อ...........................................ผู้จ่ายเงิน", 190, startY + (items.length * 7) + 70, { align: "right" });

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
  



