import React from 'react';

type DropdownProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

const Dropdown = ({ label, value, onChange }: DropdownProps) => {
    return (
        <div className="relative ">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border border-black p-2 rounded-lg bg-gray-200 h-[50px]"
            >
                <option value="" disabled>เลือกตัวเลือก</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <div className="bg-gray-200 absolute top-[-10px] px-2 left-2">
                {label}
            </div>
        </div>
    );
};

export default Dropdown;
