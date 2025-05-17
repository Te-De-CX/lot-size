'use client'


interface DropDownProp {
    value: string,
    arrayOfData : string[],
    logic: () => void ,
}

type DropDowmType = React.FC<DropDownProp>

const DropDowm: DropDowmType = ({ value ,arrayOfData, logic }) => {
    
    let selectedvalue;

    return (
        <>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">{value}</label>
            <select
              name="value"
              value={selectedvalue}
              onChange={logic}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            >
              <option value="">Select {value}</option>
              {arrayOfData.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </>
    )
}

export default DropDowm;