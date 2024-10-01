// InputField.tsx
import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string; // เพิ่ม className ที่เป็น optional
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  value,
  onChange,
  label,
  className, // ดึง className มาจาก props
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`border border-black rounded-xl p-3 w-full ${className}`} // ใช้ className ที่ส่งเข้ามา
      />
      <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
        {label}
      </div>
    </div>
  );
};

export default InputField;
