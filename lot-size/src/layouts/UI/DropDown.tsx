'use client';

interface DropDownProp {
    value: string;
    arrayOfData: string[];
    logic: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedValue?: string;
    name: string;
}

const DropDown: React.FC<DropDownProp> = ({ 
    value, 
    arrayOfData, 
    logic, 
    selectedValue,
    name 
}) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">{value}</label>
            <select
                name={name}
                value={selectedValue}
                onChange={logic}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
            >
                <option value="">Select {value}</option>
                {arrayOfData.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default DropDown;