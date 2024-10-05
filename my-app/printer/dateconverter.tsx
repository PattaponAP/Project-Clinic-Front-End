export default function converter(date: string) {
  // ตรวจสอบว่า date มีค่าและมี 'T' หรือไม่
  if (!date || !date.includes('T')) {
      return ['Invalid date', 'Invalid time']; 
  }

  const months = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const onlyDate = date.split('T')[0]; 
  const [year, month, day] = onlyDate.split('-'); 

  // ตรวจสอบว่า year, month, day มีค่าหรือไม่
  if (!year || !month || !day) {
      return ['Invalid date', 'Invalid time']; 
  }

  const newDate = `วันที่ ${parseInt(day)} เดือน ${months[parseInt(month) - 1]} พ.ศ. ${parseInt(year) + 543}`;

  const time = date.split('T')[1]?.split('.')[0]; 
  if (!time) {
      return [newDate, 'Invalid time'];
  }

  const [hour, minute] = time.split(':'); 
  const newTime = `เวลา ${hour}.${minute} น.`; 

  return [newDate, newTime];
}
