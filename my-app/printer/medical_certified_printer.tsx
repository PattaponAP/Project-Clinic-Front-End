import {jsPDF} from 'jspdf';
import { callAddFont} from "../fonts/THSarabunNew-normal.js";
import { callAddBoldFont } from '../fonts/THSarabunNew-bold.js';
import { callAddItalicFont } from '../fonts/THSarabunNew-italic.js';
import converter from './dateconverter';

export default function  doctor_notedriving_printer(
    sheet_no: string,
    no: string,
    prefix: string,
    fullname: string,
    address: string,
    address2: string ,
    thai_id: string,
    congenital: string,
    surgery: string,
    hospital: string,
    epilepsy: string,
    other: string,
    date: string,
    weight: string,
    height: string,
    blood_pressure: string,
    heart_rate: string,
    diagnose: string,
    diagnose_etc: string,
    comment: string
): void {

    jsPDF.API.events.push(["addFonts", callAddFont]);
    jsPDF.API.events.push(["addFonts", callAddBoldFont]);
    jsPDF.API.events.push(["addFonts", callAddItalicFont]);

    const newdate = converter(date);
    const format_thai_id = thai_id.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5');

    const doc = new jsPDF(
        {
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        }
    );

    doc.setProperties({
        title: 'ใบรับรองแพทย์ เลขที่' + no,
    });

    doc.setFont("THSarabunNew", "bold");
    doc.setFontSize(26);
    doc.text('ใบรับรองแพทย์ (สำหรับใบอนุญาตขับรถ)', 105, 15, { align: 'center' });
    doc.setFont("THSarabunNew", "normal");
    doc.setFontSize(14);
    doc.text(`เล่มที่ ${sheet_no}`, 20, 22, { align: 'left' });
    doc.text(`เลขที่ ${no}`, 187, 22, { align: 'right' });

    doc.setFont("THSarabunNew", "bold");
    doc.setFillColor(0, 0, 0);
    doc.roundedRect(20, 25, 20, 10, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('ส่วนที่ 1', 30, 31.5, { align: 'center' }); 
    doc.setTextColor(0, 0, 0);
    doc.text('ของผู้รับรองใบรับรองสุขภาพ', 67, 31.5, { align: 'center' }); 

    doc.setFont("THSarabunNew", "normal");
    doc.setFontSize(16);
    doc.text(`ข้าพเจ้า  ${prefix}${fullname}`, 20, 43);
    doc.text(`สถานที่อยู่ (ที่มาสามารถติดต่อได้)  ${address}`, 20, 50);
    doc.text(`${address2}`, 20, 57);
    doc.text(`หมายเลขบัตรประจำตัวประชาชน  ${format_thai_id}`, 20, 64);
    doc.text(`ข้าพเจ้าขอใบรับรองสุขภาพ โดยมีประวัติสุขภาพดังนี้`, 20, 71);
    doc.text(`1. โรคประจำตัว`, 20, 78);
    doc.text(`2. อุบัติเหตุ และ ผ่าตัด`, 20, 85);
    doc.text(`3. เคยเข้ารับการรักษาในโรงพยาบาล`, 20, 92);
    doc.text(`4. โรคลมชัก *`, 20, 99);
    doc.text(`5. ประวัติอื่นที่สำคัญ`, 20, 106);
    doc.setFontSize(14);
    doc.setFont("THSarabunNew", "italic");
    doc.text(`* ในกรณีมีโรคลมชัก ให้แนบประวัติการรักาาจากแพทย์ผู้รักาาว่าท่านปลอดจากอาการชักมากกว่า ๑ ปี เพื่ออนุญาตให้รับรถได้`, 20, 112);
    doc.setFont("THSarabunNew", "normal");

    // Add checkboxes
    const checkBox = (x: number, y: number, checked: boolean = false) => {
        doc.setLineWidth(0.1); // Thinner box
        doc.rect(x - 3, y - 1.5, 3, 3); // Move box -3x and make it smaller
        if (checked) {
            doc.line(x - 3, y - 1.5, x, y + 1.5);
            doc.line(x, y - 1.5, x - 3, y + 1.5);
        }
    };

    doc.setFontSize(16);
    if (congenital === 'none') {
        checkBox(90, 76, true); // Checkbox for โรคประจำตัว
        doc.text('ไม่มี', 93, 77.5); // Add ไม่มี text
    }
    else{   
        checkBox(90, 76, true); // Checkbox for โรคประจำตัว
        doc.text(`มี  ${congenital}`, 93, 77.5); // Add มี text
    }

    if (surgery === 'none') {
        checkBox(90, 83, true); // Checkbox for อุบัติเหตุ และ ผ่าตัด
        doc.text('ไม่มี', 93, 84.5); // Add ไม่มี text
    }
    else {
        checkBox(90, 83, true); // Checkbox for อุบัติเหตุ และ ผ่าตัด
        doc.text(`มี  ${surgery}`, 93, 84.5); // Add มี text
    }

    if (hospital === 'none') {
        checkBox(90, 90, true); // Checkbox for เคยเข้ารับการรักษาในโรงพยาบาล
        doc.text('ไม่มี', 93, 91.5); // Add ไม่มี text
    }
    else {
        checkBox(90, 90, true); // Checkbox for เคยเข้ารับการรักษาในโรงพยาบาล
        doc.text(`มี  ${hospital}`, 93, 91.5); // Add มี text
    }

    if (epilepsy === 'none') {
        checkBox(90, 97, true); // Checkbox for โรคลมชัก
        doc.text('ไม่มี', 93, 98.5); // Add ไม่มี text
    }
    else {
        checkBox(90, 97, true); // Checkbox for โรคลมชัก
        doc.text(`มี  ${epilepsy}`, 93, 98.5); // Add มี text
    }

    if (other === 'none') {
        checkBox(90, 104, true); // Checkbox for ประวัติอื่นที่สำคัญ
        doc.text('ไม่มี', 93, 105.5); // Add ไม่มี text
    }
    else {
        checkBox(90, 104, true); // Checkbox for ประวัติอื่นที่สำคัญ
        doc.text(`มี  ${other}`, 93, 105.5); // Add มี text
    }

    doc.text('ลงชื่อ', 80, 123); // Moved up by 2 units
    doc.text(`${newdate[0]}`, 187, 123, { align: 'right' }); // Moved up by 2 units

    doc.setFont("THSarabunNew", "bold");
    doc.setFillColor(0, 0, 0);
    doc.roundedRect(20, 126.5, 20, 10, 3, 3, 'F'); // Moved up by 3 units
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('ส่วนที่ 2', 30, 133, { align: 'center' }); // Moved up by 3 units
    doc.setTextColor(0, 0, 0);
    doc.text('ของแพทย์', 51, 133, { align: 'center' }); // Moved up by 3 units

    doc.setFont("THSarabunNew", "normal");
    doc.setFontSize(16);
    doc.text('สถานที่ตรวจ คลินิกแพทย์หญิงภนุชพร', 20, 142);
    doc.text(`${newdate[0]}`, 187, 142, { align: 'right' });
    doc.text('(1)', 13, 149);
    doc.text('ข้าพเจ้า แพทย์หญิงภนุชพร พฤกษา', 20, 149);
    doc.text('ใบอนุญาตประกอบวิชาชีพเวชกรรมเลขที่ ว.30377 สถานพยาบาลชื่อ คลินิกแพทย์หญิงภนุชพร', 20, 156);
    doc.text('ที่อยู่ 175/12 ถนนศรีจันทร์ ตำบลในเมือง อำเภอเมือง จังหวัดขอนแก่น', 20, 163);
    doc.text(`ได้ตรวจร่างกาย  ${prefix}${fullname}`, 20, 170);
    doc.text(`แล้วเมื่อ${newdate[0]} มีรายละเอียดดังนี้`, 20, 177);
    doc.text(`น้ำหนักตัว ${weight} กก. ความสูง ${height} เซนติเมตร ความดันโลหิต ${blood_pressure} มม.ปรอท ชีพจร ${heart_rate} ครั้ง/นาที`, 20, 184);
    doc.text('สภาพร่างกายทั่วไปอยู่ในเกณฑ์', 20, 192);

    if (diagnose === 'normal') {
        checkBox(72, 190.5, true); // Checkbox for สภาพร่างกายทั่วไปอยู่ในเกณฑ์
        doc.text('ปกติ', 75, 192); // Add ปกติ text
    }
    else{
        checkBox(72, 190.5, true); // Checkbox for สภาพร่างกายทั่วไปอยู่ในเกณฑ์
        doc.text(`ผิดปกติ  ${diagnose}`, 75, 192); // Add ไม่ปกติ text
    }
    
    doc.text('ขอรับรองว่า บุคคลดังกล่าว ไม่เป็นผู้มีร่างกายทุพพลภาพจรไม่สามารถปฏิบัติหน้าที่ได้ ไม่ปรากฏอาการของโรคจิด', 25, 199);
    doc.text('หรือจิตฟั่นเฟือน หรือปัญญาอ่อน ไม่ปรากฏอาการของการติดยาเสพติดให้โทษ และอาการของโรคพิษสุราเรื้อรัง และ', 20, 206);
    doc.text('ไม่ปรากฏอาการและอาการแสดงของโรคต่อไปนี้', 20, 213);
    doc.text('1. โรคเรื้อนในระยะติดต่อ หรือในระยะที่ปรากฏอาการเป็นที่รังเกียจแก่สังคม', 25, 220);
    doc.text('2. วัณโรคในระยะอันตราย', 25, 227);
    doc.text('3. โรคเท้าช้างในระยะที่ปรากฏอาการเป็นที่รังเกียจแก่สังคม', 25, 234);
    if (diagnose_etc !== 'none') {
        doc.text(`4. อื่นๆ (ถ้ามี)  ${diagnose_etc}`, 25, 241);
    }
    
    doc.text('(2)', 13, 248);
    doc.text(`สรุปความเห็นและข้อแนะนำของแพทย์  ${comment}`, 20, 248);
    doc.text(`ลงชื่อ                                   แพทย์ผู้ตรวจร่างกาย`, 187, 260, { align: 'right' });

    doc.setFontSize(14);
    doc.text(`หมายเหตุ`, 20, 270);

    doc.setFont("THSarabunNew", "italic");
    doc.text(`(1) ต้องเป็นแพทย์ซึ่งได้ขึ้นทะเบียนรับใบอนุญาตประกอบวิชาชีพเวชกรรม`, 35, 270);
    doc.text(`(2) ให้แสดงว่าเป็นผู้มีร่างกายสมบูรณืเพียงใด ใบรับรองแพทย์ฉบับนี้ใช้ได้ 1 เดือนนับแต่วันที่ตรวจร่างกาย`, 35, 275);
    doc.text(`(3) คำรับรองนี้เป็นการวินิจฉัยเบื้องต้น และใบรับรองแพทย์นี้ ใช้สำหรับใบอนุญาตขับรถและปฏิบัติหน้าที่เป็นผู้ประจำรถ`, 35, 280);
    doc.text(`แบบฟอร์มนี้ได้รับการรับรองจากมติคณะกรรมการแพทยสภาในการประชุมครั้งที่ 2/2564 วันที่ 4 กุมภาพันธ์ 2564`, 33, 285);
 
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
  



